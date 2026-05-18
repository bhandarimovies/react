import express from 'express'
import mongoose from 'mongoose'
import Project from '../models/Project.js'

const router = express.Router()

// POST /api/projects/:id/vote
// body: { value: 'like' | 'dislike' }
router.post('/:id/vote', async (req, res) => {
  try {
    const { value } = req.body
    const { id } = req.params

    if (!['like', 'dislike'].includes(value)) {
      return res.status(400).json({ message: 'Invalid vote value' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project id' })
    }

    // Best-effort per-client identifier
    const clientId = req.headers['x-client-id'] || req.ip || 'anonymous'

    const project = await Project.findById(id)
    if (!project) return res.status(404).json({ message: 'Project not found' })

    const prevVote = project.votes?.get(String(clientId))

    // If the user votes the same way again, just return current counts
    if (prevVote === value) {
      return res.json({
        projectId: project._id,
        likesCount: project.likesCount,
        dislikesCount: project.dislikesCount,
      })
    }

    // If user changed vote, adjust counts accordingly
    if (prevVote === 'like') project.likesCount = Math.max(0, project.likesCount - 1)
    if (prevVote === 'dislike') project.dislikesCount = Math.max(0, project.dislikesCount - 1)

    if (value === 'like') project.likesCount += 1
    if (value === 'dislike') project.dislikesCount += 1

    // store the vote
    project.votes = project.votes || new Map()
    project.votes.set(String(clientId), value)

    await project.save()

    // real-time: emit to socket room
    const io = req.app?.locals?.io
    if (io) {
      io.to(`project:${project._id}`).emit('projectVoted', {
        projectId: project._id,
        likesCount: project.likesCount,
        dislikesCount: project.dislikesCount,
      })
    }

    return res.json({
      projectId: project._id,
      likesCount: project.likesCount,
      dislikesCount: project.dislikesCount,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

export default router


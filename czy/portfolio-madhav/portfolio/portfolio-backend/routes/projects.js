import express from 'express'
import Project from '../models/Project.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 })
  res.json(projects)
})

router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted ✅' })
})

export default router
import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  techStack:   [String],
  liveUrl:     String,
  githubUrl:   String,
  image:       String,
  featured:    { type: Boolean, default: false },

  // Social voting (real-time)
  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },

  // Track vote per client (best-effort, not secure)
  // clientId -> "like" | "dislike"
  votes: {
    type: Map,
    of: { type: String, enum: ['like', 'dislike'] },
    default: {},
  },
}, { timestamps: true })


export default mongoose.model('Project', projectSchema)
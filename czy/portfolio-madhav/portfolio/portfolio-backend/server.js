import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoute from './routes/contact.js'
import projectsRoute from './routes/projects.js'

dotenv.config()

const app = express()

if (!process.env.MONGO_URI) {
  console.error('Missing MONGO_URI in .env')
  process.exit(1)
}

// CORS configuration - allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: false
}))
app.use(express.json())

// Routes
app.use('/api/contact', contactRoute)
app.use('/api/projects', projectsRoute)

app.get('/', (req, res) => res.json({ message: 'Portfolio API running ✅' }))

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected ✅')
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`Server running on port ${PORT}`)
    )
  })
  .catch(err => console.error('DB Error:', err))
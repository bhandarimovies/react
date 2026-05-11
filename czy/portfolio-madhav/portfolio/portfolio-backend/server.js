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

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

// Routes
app.use('/api/contact', contactRoute)
app.use('/api/projects', projectsRoute)

app.get('/', (req, res) => res.json({ message: 'Portfolio API running ✅' }))

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected ✅')
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    )
  })
  .catch(err => console.error('DB Error:', err))
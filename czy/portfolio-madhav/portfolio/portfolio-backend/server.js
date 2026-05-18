import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

// Load env FIRST before importing routes
dotenv.config()

import contactRoute from './routes/contact.js'
import projectsRoute from './routes/projects.js'
import { attachSocket } from './socket.js'

const app = express()

// Used by vote route for socket emission
app.locals.io = null

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


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected ✅')

    const httpServer = app.listen(PORT, '0.0.0.0', () =>
      console.log(`Server running on port ${PORT}`)
    )

    // Attach Socket.IO for real-time project voting
    const io = attachSocket(httpServer)

    // Make io available to routes via app locals
    app.locals.io = io
  })
  .catch(err => console.error('DB Error:', err))

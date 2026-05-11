import express from 'express'
import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'

const router = express.Router()

const hasEmailConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS
const transporter = hasEmailConfig
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Save to MongoDB
    const contact = new Contact({ name, email, message })
    await contact.save()

    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `📨 New message from ${name}`,
          html: `
            <h3>New Portfolio Contact</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Message:</b> ${message}</p>
          `,
        })
      } catch (emailErr) {
        console.error('Email send failed:', emailErr)
      }
    } else {
      console.warn('EMAIL_USER or EMAIL_PASS not configured. Email notification skipped.')
    }

    res.status(201).json({ message: 'Message received! ✅' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json(contacts)
})

export default router
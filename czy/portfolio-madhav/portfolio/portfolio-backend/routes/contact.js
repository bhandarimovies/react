import express from 'express'
import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    // Initialize email transporter when route is called (after .env is loaded)
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

    console.log('📨 Contact request received from:', req.ip)
    const { name, email, message } = req.body

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Save to MongoDB
    const contact = new Contact({ name, email, message })
    await contact.save()
    console.log('✅ Saved to MongoDB:', { name, email })

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
        console.log('📧 Email sent successfully')
      } catch (emailErr) {
        console.error('❌ Email send failed:', emailErr.message)
      }
    } else {
      console.warn('⚠️ EMAIL_USER or EMAIL_PASS not configured. Email notification skipped.')
    }

    res.status(201).json({ message: 'Message received! ✅' })
  } catch (err) {
    console.error('❌ Error in contact route:', err.message)
    res.status(500).json({ message: err.message })
  }
})

router.get('/', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json(contacts)
})

export default router
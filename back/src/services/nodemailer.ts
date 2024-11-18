import nodemailer from 'nodemailer'
import { env } from '../env'

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: parseInt(env.EMAIL_PORT),
  auth: {
    user: env.EMAIL_USERNAME,
    pass: env.EMAIL_PASSWORD
  }
})

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject,
      html
    })
    console.log('Message sent: %s', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

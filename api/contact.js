export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { firstName, lastName, business, email, phone, service, message } = req.body

  if (!firstName || !lastName || !business || !email || !service) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const timestamp = new Date().toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#080C12;color:#B8C5D6;padding:32px;border:1px solid rgba(255,255,255,0.07);">

  <div style="border-bottom:2px solid #00C8FF;padding-bottom:20px;margin-bottom:28px;">
    <h1 style="font-size:22px;color:#F0F4F8;margin:0 0 6px;letter-spacing:1px;">New Contact Form Submission</h1>
    <p style="color:#6B7A8D;margin:0;font-size:13px;">Atlantic AI Automation &nbsp;·&nbsp; ${timestamp}</p>
  </div>

  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#6B7A8D;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:130px;vertical-align:top;">Name</td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#F0F4F8;">${firstName} ${lastName}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#6B7A8D;font-size:11px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Email</td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);"><a href="mailto:${email}" style="color:#00C8FF;text-decoration:none;">${email}</a></td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#6B7A8D;font-size:11px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Phone</td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#F0F4F8;">${phone || '<em style="color:#6B7A8D;">Not provided</em>'}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#6B7A8D;font-size:11px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Business</td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#F0F4F8;">${business}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#6B7A8D;font-size:11px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Service</td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#F0F4F8;">${service}</td>
    </tr>
  </table>

  ${message ? `
  <div style="margin-top:24px;">
    <p style="color:#6B7A8D;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">Message</p>
    <div style="background:#111827;border:1px solid rgba(255,255,255,0.07);border-left:3px solid #00C8FF;padding:16px;color:#B8C5D6;line-height:1.7;font-size:14px;">${message.replace(/\n/g, '<br>')}</div>
  </div>
  ` : ''}

  <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.07);display:flex;gap:12px;">
    <a href="mailto:${email}" style="display:inline-block;background:#00C8FF;color:#080C12;font-weight:bold;padding:12px 24px;text-decoration:none;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">Reply to ${firstName}</a>
    <a href="https://wa.me/27676381778" style="display:inline-block;background:transparent;color:#00C8FF;font-weight:bold;padding:12px 24px;text-decoration:none;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;border:1px solid #00C8FF;">Open WhatsApp</a>
  </div>

  <p style="margin-top:24px;color:#6B7A8D;font-size:11px;">This email was sent automatically from the Atlantic AI website contact form.</p>
</div>
`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Update 'from' to a verified sender once your domain is added in Resend.
        // Until then, use: onboarding@resend.dev
        from: 'Atlantic AI Website <onboarding@resend.dev>',
        to: ['reece@atlanticaiautomation.com'],
        reply_to: email,
        subject: 'New Contact Form Submission - Atlantic AI',
        html,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact handler error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

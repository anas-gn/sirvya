import { Resend } from 'resend';

const SENDER_EMAIL = 'Sirvya <support@devunivers.com>';
const CONTACT_RECEIVER_EMAIL = 'support@devunivers.com';

function buildContactEmailHtml({ name, email, subject, message }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0a0a0a; margin: 0; padding: 40px 20px; color: #ffffff; }
        .card { max-width: 560px; margin: 0 auto; background-color: #111111; border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
        h1 { font-size: 20px; font-weight: 800; color: #ffffff; margin-bottom: 4px; }
        .eyebrow { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #C6F135; font-family: monospace; margin-bottom: 16px; }
        .row { margin-bottom: 18px; }
        .label { font-size: 11px; color: #8a8a8a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .value { font-size: 14px; color: #ffffff; }
        .message-box { background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; font-size: 14px; line-height: 1.6; color: #dddddd; white-space: pre-wrap; }
        .footer { font-size: 11px; color: #5a5a5a; margin-top: 28px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <p class="eyebrow">New Contact Message</p>
        <h1>${subject}</h1>
        <div class="row" style="margin-top: 24px;">
          <div class="label">From</div>
          <div class="value">${name} &lt;${email}&gt;</div>
        </div>
        <div class="row">
          <div class="label">Message</div>
          <div class="message-box">${message}</div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} DevUnivers &mdash; Sent from the contact form
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY manquante dans les variables d\'environnement');
      return Response.json(
        { error: "Configuration serveur manquante." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { name, email, subject, message } = body || {};

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'Tous les champs sont requis (name, email, subject, message).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Adresse email invalide." }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [CONTACT_RECEIVER_EMAIL],
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: buildContactEmailHtml({ name, email, subject, message }),
    });

    console.log(`✉️ Contact email sent from ${email}:`, data);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('❌ Failed to send contact email:', error?.message || error);
    return Response.json(
      { error: "Échec de l'envoi du message. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
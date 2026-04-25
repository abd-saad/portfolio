export interface ContactEmailProps {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export function EmailTemplate({ name, email, company, message }: ContactEmailProps): string {
  const companyRow = company
    ? `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:110px">Company</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#111827;font-size:15px">${company}</td>
      </tr>`
    : '';

  const safeMessage = message.replace(/\n/g, '<br/>');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

    <div style="background:linear-gradient(135deg,#2563eb 0%,#0d9488 100%);padding:32px 40px">
      <p style="margin:0;color:rgba(255,255,255,0.85);font-size:13px;letter-spacing:1px;text-transform:uppercase">Portfolio Contact</p>
      <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700">New message from ${name}</h1>
    </div>

    <div style="padding:36px 40px">
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:110px">Name</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#111827;font-size:15px">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">
            <a href="mailto:${email}" style="color:#2563eb;text-decoration:none;font-size:15px">${email}</a>
          </td>
        </tr>
        ${companyRow}
      </table>

      <p style="margin:0 0 10px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Message</p>
      <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px 24px">
        <p style="margin:0;color:#374151;font-size:15px;line-height:1.7">${safeMessage}</p>
      </div>

      <div style="margin-top:28px;text-align:center">
        <a href="mailto:${email}?subject=Re: Your message" style="display:inline-block;background:linear-gradient(135deg,#2563eb 0%,#0d9488 100%);color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:600;font-size:15px">
          Reply to ${name}
        </a>
      </div>
    </div>

    <div style="background-color:#f8fafc;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center">
      <p style="margin:0;color:#9ca3af;font-size:12px">Sent via your portfolio contact form</p>
    </div>
  </div>
</body>
</html>`;
}

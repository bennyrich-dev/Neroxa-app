export function getWelcomeEmailHTML(username: string, email: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Neroxa</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #06070d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #0b2240; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              
              <tr>
                <td style="padding: 40px 40px 20px 40px;">
                  <div style="font-size: 24px; font-weight: 900; tracking: -0.05em; color: #ffffff;">
                    <span style="color: #f59e0b;">NERO</span>XA
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 40px 30px 40px; color: #ffffff;">
                  <h1 style="font-size: 26px; font-weight: 800; margin: 0 0 16px 0; border-bottom: 3px solid #00b4d8; padding-bottom: 8px; display: inline-block;">
                    Hi ${username}!
                  </h1>
                  <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1; margin: 20px 0 30px 0;">
                    Thanks for signing up to Neroxa Streaming. Your private dashboard account is now verified and active. Your family profile settings have been locked in successfully.
                  </p>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="left">
                        <a href="http://localhost:3000" target="_blank" style="background-color: #00b4d8; color: #ffffff; font-size: 14px; font-weight: 900; text-decoration: none; padding: 14px 28px; border-radius: 50px; display: inline-block; text-transform: uppercase; letter-spacing: 0.05em;">
                          Launch Platform 🚀
                        </a>
                      </td>
                    </tr>
                  </table>

                  <hr style="border: 0; border-top: 1px solid #1e293b; margin: 35px 0 25px 0;">

                  <p style="font-size: 13px; color: #94a3b8; margin: 0 0 10px 0; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
                    Your Registered Details:
                  </p>
                  <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #cbd5e1; line-height: 1.8;">
                    <li><strong>Username:</strong> ${username}</li>
                    <li><strong>Email Address:</strong> ${email}</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td style="padding: 20px 40px 40px 40px; background-color: #07172e; font-size: 12px; line-height: 1.5; color: #64748b;">
                  <p style="margin: 0 0 8px 0;">You are receiving this communication because you created an authorized stream profile on Neroxa.</p>
                  <p style="margin: 0;">&copy; 2026 Neroxa Systems. All rights reserved.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

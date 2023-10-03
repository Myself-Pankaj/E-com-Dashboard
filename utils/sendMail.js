import { createTransport } from "nodemailer";

export const sendMail = async (email, subject, htmlContent, text) => {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject,
    text,
    html:htmlContent,
  });
};


export const sendReport = async (toEmail, subject, htmlContent, attachmentName, attachmentBuffer) => {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const attachmentOptions = {
    filename: attachmentName,
    content: attachmentBuffer,
  };

  if (typeof attachmentOptions.contentType === 'string') {
    attachmentOptions.contentType = attachmentOptions.contentType.toLowerCase();
  }

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to: toEmail,
    subject,
    html: htmlContent,
    attachments: [attachmentOptions],
  });
};

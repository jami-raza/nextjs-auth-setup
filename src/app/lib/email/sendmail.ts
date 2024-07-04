import nodemailer from "nodemailer";

const email = process.env.NEXT_PUBLIC_MAIL_EMAIL;
const host = process.env.NEXT_PUBLIC_MAIL_HOST ;
const port = process.env.NEXT_PUBLIC_MAIL_PORT;
const password = process.env.NEXT_PUBLIC_MAIL_PASSWORD;
// const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
//  psfA@123
// admin@growthella.com

const transporter = nodemailer.createTransport({
  host: host,
  port: 465,
  // tls: {
  //     ciphers: "SSLv3",
  //     rejectUnauthorized: false,
  // },

  auth: {
    user: email,
    pass: password,
  },
});

export async function sendEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  
  transporter.sendMail({
    from: email,
    to: email,
    replyTo: email,
    subject: `Website activity from ${email}`,
    html: `
        <p>Name: ${name} </p>
        <p>Email: ${email} </p>
        <p>Message: ${message} </p>
        `,
  });

}

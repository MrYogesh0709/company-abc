import nodemailer from "nodemailer";
import nodeMailerConfig from "./nodeMailerConfig.js";

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodeMailerConfig);

  return transporter.sendMail({
    from: "'companyABC'  <yogeshvanzara98@gmail.com>",
    to,
    subject,
    html,
  });
};

export default sendEmail;

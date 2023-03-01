import sendEmail from "./sendEmail.js";

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const restURL = `${origin}/user/reset-password?token=${token}&email=${email}`;

  const message = `<p>Please reset password by clicking on the following link : 
  <a href="${restURL}">Reset Password</a> </p>`;
  return sendEmail({
    to: email,
    subject: "Reset  Password",
    html: `<h4> Hello, ${name}</h4>
    ${message}
    `,
  });
};
export default sendResetPasswordEmail;

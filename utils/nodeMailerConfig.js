const transporter = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASSWORD,
  },
};

export default transporter;

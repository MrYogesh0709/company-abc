import dotenv from "dotenv";
dotenv.config();

const transporterMail = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASSWORD,
  },
};

export default transporterMail;

const nodemailer = require("nodemailer");

const errors = {
  530: "Precisa se autenticar",
  600: "Precisa de senha",
  EENVELOPE: "Email do destinatário é invalido",
};

const getError = (e) => {
  const error = errors[e.responseCode || e.code];
  if (error) {
    console.log("Message error --> ", error);
    return error;
  } else {
    console.log("Message error --> ", e);
    return "Erro desconhecido";
  }
};

const initTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

const Nodemailer = {
  sendMessage: async (data) => {
    const transporter = initTransporter();

    return transporter
      .sendMail(data)
      .then((result) => {
        console.log("Message sent: %s", result.messageId);
        return result;
      })
      .catch((e) => ({
        error: true,
        errorMessage: getError(e),
      }));
  },
};

module.exports = Nodemailer;

const express = require("express");
const app = express();
const nodemailer = require("./nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());

//https://nodemailer-front-daniel.herokuapp.com/

// var whitelist = ["http://localhost:3000", "http://localhost:3002", undefined];

// var corsOptions = {
//   origin: function (origin, callback) {
//       console.log("quem esta tentando acessar: ",origin)
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors());

app.post("/send-email", async (req, res) => {
  // validations
//   if (validator.isEmail(req.body.to))
//     return res.json({ error: true, messageError: "Email inválido!" });

  // antes disso
  const response = await nodemailer.sendMessage(req.body);
  return res.json(response);
});

app.listen(3001);

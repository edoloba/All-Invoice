const express = require("express");
const session = require("express-session");
require("dotenv").config();
const dbo = require("./db/connection");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3010;
const path = require('path')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.ENCRYPT_PASS,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 500000 },
  })
);
app.use(express.static(path.join(__dirname, 'public')))
app.get('/user', (req, res)=>{
  res.sendFile(path.join(__dirname, `./public/avatars/${req.session.user.logoAvatar}.jpeg`))
})
app.get('/img', (req, res)=>{
  res.sendFile(path.join(__dirname, `./public/avatars/logo.jpeg`))
})
app.use(require("./routes/index"));

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

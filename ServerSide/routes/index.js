const {
  addUser,
  verifyUser,
  loginUser,
  checkSession,
  createInvoice,
  downloadInvoice,
  deleteInvoice,
  logOut,
  newMessage,
  updateUser,
  myInvoices,
  addClient,
  getClients,
  addExpenses,
  getExpenses,
  deleteExpense,
  deleteClient,
} = require("../db/db");
const {uploadImage, upload} = require('../db/upload');
const { body } = require("express-validator");
const express = require("express");

const router = express.Router();

router.post(
  "/register/add",
  body("fName")
    .isLength({ min: 2, max: 50 })
    .withMessage("First Name should be at least two chars long")
    .notEmpty()
    .isAlpha().withMessage("Only alphabets are allowed for first Name"),
  body("lName")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last Name should be at least two chars long")
    .notEmpty()
    .isAlpha().withMessage("Only alphabets are allowed for last Name"),
  body("mail")
    .isLength({ min: 3, max: 50 })
    .withMessage("Email should be at least three chars long")
    .notEmpty()
    .isEmail()
    .withMessage("Invalid Email"),
  body("pass").isLength({ min: 4, max: 50 }).withMessage("Password should be at least four chars long").notEmpty(),
  body("repass").custom((value, { req }) => {
    if (value !== req.body.pass) {
      throw new Error("Password and rePassword do not match");
    }
    return true;
  }),
  addUser
);
router.get("/register/verify", verifyUser);
router.get("/logout", logOut);
router.post("/createinvoice", createInvoice);
router.get("/myinvoices", myInvoices);
router.post("/downloadinvoice", downloadInvoice);
router.post("/deleteinvoice", deleteInvoice);
router.post("/userlogin", checkSession);
router.post("/login", loginUser);
router.post("/newmessage", newMessage);
router.post("/updateuser", updateUser);
router.post("/addclient", addClient);
router.post("/getclients", getClients);
router.post("/deleteclient", deleteClient);
router.post("/addexpenses", addExpenses);
router.post("/getexpenses", getExpenses);
router.post("/deleteexpense", deleteExpense);
router.post("/uploadimage", uploadImage, upload);


module.exports = router;

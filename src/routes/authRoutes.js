// routes/authRoutes.js
const express = require("express");
const { 
    register, 
    login, 
    forgotPassword, 
    resetPassword, 
    getUserData
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/getUserData", getUserData);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


module.exports = router;
const Register = require("../utils/auth/register");
const Login = require('../utils/auth/login');
exports.register = async (req, res) => {
    try {
        const result = await Register.register(req);
        
        if (result.status === "ok") {
            return res.status(201).json({
                status: "ok", 
                data: result.data,
                message: "Signup successful",
            });
        } else {
            return res.status(200).json({
                status: "error", 
                message: result.message,
                data:result.error
            });
        }
    } catch (error) {
        return res.status(200).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await Login.login(req);
        
        if (result.status === "ok") {
            return res.status(200).json(result);
        } else {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(200).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const result = await Login.forgotPassword(req);
        
        if (result.status === "ok") {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const result = await Login.resetPassword(req);
        
        if (result.status === "ok") {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};
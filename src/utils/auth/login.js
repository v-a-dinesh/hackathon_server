// utils/auth/login.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserOperations = require('../../operations/useroperations');
const { generateToken } = require('./register'); // Reuse token generation from register
const {oauth2Client} =require("../../config/googleConfig");
const { google } = require('googleapis');


exports.login = async (req) => {
    const { body } = req;

    try {


        // Check login type
        if (body.type === 'google') {
            return await googleLogin(body);
        } else if (body.type === 'normal') {
            return await normalLogin(body);
        } else {
            return {
                status: "error",
                message: "Invalid login type"
            };
        }
    } catch (err) {
        return {
            status: "error",
            message: "Login failed",
            error: err.message
        };
    }
};

// Normal Login Function
const normalLogin = async (body) => {
    try {

        if (!body.email || !body.password) {
            return {
                status: "error",
                message: "Email and password are required"
            };
        }
        // Find user by email
        const userCheck = await UserOperations.find({ 
            email: body.email 
        });

        // Check if user exists
        if (userCheck.status === "error" || userCheck.data.length === 0) {
            return {
                status: "error",
                message: "User not found"
            };
        }

        const user = userCheck.data[0];

        // Verify password
        const isMatch = bcrypt.compareSync(body.password, user.password);
        if (!isMatch) {
            return {
                status: "error",
                message: "Invalid credentials"
            };
        }

        // Generate token
        const token = generateToken(user);

        // Prepare user response (remove sensitive data)
        //const userData = { ...user };
        //delete userData.password;

        return {
            status: "ok",
            message: "Login successful",
            data: {
                user: user,
                token: token
            }
        };
    } catch (err) {
        return {
            status: "error",
            message: "Login failed",
            error: err.message
        };
    }
};

// Google Login Function
const googleLogin = async (body) => {
    
    
    try {

        // Verify if we have the authorization code
        if (!body.code) {
            return {
                status: "error",
                message: "Invalid details: Authorization code missing"
            };
        }

        // Get tokens using the authorization code
        const { tokens } = await oauth2Client.getToken(body.code);
        oauth2Client.setCredentials(tokens);

        // Get user info from Google
        const userInfo = await google.oauth2("v2").userinfo.get({ auth: oauth2Client });
        const email = userInfo.data.email;

        // Find user by email
        const userCheck = await UserOperations.find({ 
            email: email,
            type: 'google'
        });
        //console.log(userCheck);

        if(userCheck.data.length==1){
            const token = generateToken(userCheck.data[0]);
            return {
                status: "ok",
                message: "Google signup successful",
                data: {
                    user: userCheck.data[0],
                    token:token,
                }
            };
        }
        return {
            status: "error",
            message: "Error in google login.",
        };
        



    } catch (err) {
        return {
            status: "error",
            message: "Google login failed",
            error: err.message
        };
    }
};

// Password Reset Functionality
exports.forgotPassword = async (req) => {
    const { body } = req;

    try {
        // Find user by email
        const userCheck = await UserOperations.find({ 
            email: body.email 
        });

        if (userCheck.status === "error" || userCheck.data.length === 0) {
            return {
                status: "error",
                message: "User not found"
            };
        }

        const user = userCheck.data[0];

        // Generate password reset token
        const resetToken = jwt.sign(
            { 
                id: user._id, 
                email: user.email 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // TODO: Send reset token via email (implement email service)
        // This is a placeholder for email sending logic
        return {
            status: "ok",
            message: "Password reset token generated",
            data: {
                resetToken: resetToken
            }
        };
    } catch (err) {
        return {
            status: "error",
            message: "Password reset failed",
            error: err.message
        };
    }
};

// Reset Password Functionality
exports.resetPassword = async (req) => {
    const { body } = req;

    try {
        // Verify reset token
        const decoded = jwt.verify(body.resetToken, process.env.JWT_SECRET);

        if (!decoded) {
            return {
                status: "error",
                message: "Invalid or expired reset token"
            };
        }

        // Find user by ID from token
        const userCheck = await UserOperations.find({ 
            _id: decoded.id,
            email: decoded.email
        });

        if (userCheck.status === "error" || userCheck.data.length === 0) {
            return {
                status: "error",
                message: "User not found"
            };
        }

        // Hash new password
        const hashedPassword = bcrypt.hashSync(body.newPassword, 10);

        // Update user password
        const updateResult = await UserOperations.updateMany(
            { _id: decoded.id },
            { password: hashedPassword }
        );

        if (updateResult.status === "error") {
            return {
                status: "error",
                message: "Password reset failed",
                error: updateResult.data
            };
        }

        return {
            status: "ok",
            message: "Password reset successful"
        };
    } catch (err) {
        return {
            status: "error",
            message: "Password reset failed",
            error: err.message
        };
    }
};
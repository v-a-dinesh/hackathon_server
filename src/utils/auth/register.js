const bcrypt = require('bcryptjs');
const { google } = require('googleapis');
const UserOperations = require('../../operations/useroperations');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../../config/googleConfig');

// Password Hashing Function
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

// Token Generation Function
const generateToken = (user) => {
    try {
        // Create a payload with essential user information
        const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            type: user.type
        };

        // Sign the token with a secret key and set expiration
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d' // Token expires in 1 day
        });

        return token;
    } catch (error) {
        console.error('Token generation error:', error);
        throw new Error('Failed to generate token');
    }
};

// Token Verification Function
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
};

exports.register = async (req) => {
    const { body } = req;
    
    try {
        // Google OAuth Signup
        if (body?.type === "google") {
            if (body?.code) {
                try {
                    // Get Google tokens
                    let { tokens } = await oauth2Client.getToken(body.code);
                    oauth2Client.setCredentials(tokens);
                    
                    // Fetch user info
                    let userInfo = await google.oauth2("v2").userinfo.get({ auth: oauth2Client });
                    body.email = userInfo.data.email;
                    body.username = userInfo?.data?.name + userInfo.data.id;
                    body.userInfo = userInfo.data;
                } catch (googleError) {
                    return {
                        status: "error",
                        message: "Google authentication failed",
                        error: googleError
                    };
                }
            } else {
                return {
                    status: "error",
                    message: "Invalid Google authentication details"
                };
            }
        }

        // Validate basic requirements
        if (!body.email || !body.username) {
            return { 
                status: "error", 
                message: "Email and username are required" 
            };
        }

        // Check email uniqueness
        const emailCheck = await UserOperations.find({ email: body.email });
        if (emailCheck.status === "error") {
            return {
                status: "error",
                message: "Error checking email"
            };
        }
        
        if (emailCheck.data.length > 0) {
            return {
                status: "error",
                message: "Email already registered"
            };
        }

        // Check username uniqueness
        const usernameCheck = await UserOperations.find({ username: body.username });
        if (usernameCheck.status === "error") {
            return {
                status: "error",
                message: "Error checking username"
            };
        }
        
        if (usernameCheck.data.length > 0) {
            return {
                status: "error",
                message: "Username already exists"
            };
        }

        // Prepare user info
        let userInfo;
        
        // Google Signup
        if (body?.type === "google") {
            userInfo = {
                name: body.userInfo.name,
                email: body.userInfo.email,
                type: "google",
                username: body.username,
                profileImg: body.userInfo.picture,
                role: "user"
            };
        }
        
        // Normal Signup
        else if (body?.type === "normal" && body?.password) {
            userInfo = {
                email: body.email,
                password: hashPassword(body.password),
                username: body.username,
                name: body.fullname || body.username,
                type: "normal",
                role: "user"
            };
        }
        
        // Invalid Signup Type
        else {
            return {
                status: "error",
                message: "Invalid signup type or missing details"
            };
        }

        // Insert User
        const insertResult = await UserOperations.insertMany([userInfo]);
        
        if (insertResult.status === "error") {
            return {
                status: "error",
                message: "Error during signup",
                error: insertResult.data
            };
        }

        // Generate JWT Token
        const token = generateToken(insertResult.data[0]);

        // Prepare response (remove sensitive information)
        // const userData = { ...insertResult.data[0] };
       // delete userData.password; // Remove password from response

        return {
            status: "ok",
            message: "Signup successful",
            data: {
                user:insertResult.data[0],
                token: token
            }
        };

    } catch (err) {
        return {
            status: "error",
            message: "Unexpected error during signup",
            error: err
        };
    }
};

// Export additional utility functions
module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
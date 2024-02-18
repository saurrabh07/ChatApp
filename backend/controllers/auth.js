const jwt = require("jsonwebtoken");
const { hashPassword, compareHashedPassword, generateToken } = require("../helper/auth");
const userModel=require("../models/user");

/**
 * Controller function to handle user registration.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the registration process.
 */
const registerController = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Validate input data
        if (!name || !email || !password) {
            return res.status(400).send("All fields are required");
        } 

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).send("User already registered");
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token =await generateToken(user._id);
        
        // Return response
        if (user) {
            return res.status(200).send({
                user ,
                token 
            });
        } else {
            return res.status(500).send("Failed to create user");
        }
    } catch (error) {
        console.error("Error occurred while registering user:", error);
        return res.status(500).send("Internal server error");
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input data
        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send("User not registered");
        }

        // Compare passwords
        const match = await compareHashedPassword(password, user.password);
        if (!match) {
            return res.status(401).send("Invalid Cradential");
        }

        // Generate JWT token
        const token =await generateToken(user._id);

        // Send response with user data and token
        res.status(200).json({ user, token });
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        res.status(500).send("Internal server error");
    }
};

module.exports = { registerController,loginController };
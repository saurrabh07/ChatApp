const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const SALT_ROUNDS = 10;

/**
 * Hashes the given password using bcrypt.
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch (error) {
        console.error("Error occurred while hashing password:", error);
        throw new Error("Failed to hash password");
    }
};

/**
 * Compares the provided password with the hashed password.
 * @param {string} password - The password to be compared.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} - A boolean indicating whether the password matches the hashed password.
 */
const compareHashedPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error("Error occurred while comparing passwords:", error);
        throw new Error("Failed to compare passwords");
    }
};


const generateToken = async (id) => {
    try {
        const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.error("Error occurred while generating token:", error);
        throw new Error("Failed to generate token");
    }
};

module.exports = { hashPassword, compareHashedPassword , generateToken};

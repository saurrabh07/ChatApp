const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.Password;

/**
 * Middleware to verify JWT token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 * @returns {Promise<Object>} - Decoded JWT payload.
 */
const verifyJwt = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("Authorization header is missing");
        }

        const decodedToken = await jwt.verify(token, SECRET_KEY);
        return decodedToken;
    } catch (error) {
        console.error("Error occurred while verifying JWT:", error);
        next(error);
    }
};

module.exports = verifyJwt;

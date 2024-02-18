const express = require("express");
const { registerController, loginController } = require("../controllers/auth");

const router = express.Router();

router.post("/", registerController);
// Assuming there is a login controller defined somewhere
// Replace 'login' with the appropriate login controller
router.post("/login", loginController);

module.exports = router;
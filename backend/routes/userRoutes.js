const express = require("express");
const { registerUser, authUser, allUsers } = require("../controllers/userController");
const { shield } = require("../middleware/authMiddleware");


const router = express.Router();

router.route("/").post(registerUser).get(shield,allUsers);
router.post("/signin", authUser);


module.exports = router;

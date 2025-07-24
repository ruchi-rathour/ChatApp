const express = require('express');
const { shield} = require("../middleware/authMiddleware");
const { sendMessage, allMessages } = require('../controllers/messageController');

const router = express.Router();

router.route("/:chatId").get(shield, allMessages);
router.route("/").post(shield, sendMessage); 

module.exports = router;

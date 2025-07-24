const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatController");
const { shield } = require("../middleware/authMiddleware");


const router = express.Router();

router.route("/").post(shield, accessChat);
router.route("/").get(shield, fetchChats);
router.route("/group").post(shield, createGroupChat);
router.route("/rename").put(shield, renameGroup);
router.route("/groupremove").put(shield, removeFromGroup);
router.route("/groupadd").put(shield, addToGroup);


module.exports = router;
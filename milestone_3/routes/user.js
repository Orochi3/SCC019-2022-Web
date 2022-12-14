const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js");

router.post("/api/user", userController.cadastrarUser);
router.get("/api/user", userController.getAllUsers);
router.get("/api/user/:id", userController.getUser);
router.get("/api/user/email/:email", userController.getUserByEmail);
router.delete("/api/user/:id", userController.deleteUser);
router.put("/api/user/:id", userController.updateUser);
router.put("/api/user/:id/card", userController.updateCard);

module.exports = router;
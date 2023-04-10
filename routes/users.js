const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users/usersController");

router.get("/", usersController.getAllusers);
//router.post("/", usersController.createProperty);

module.exports = router;



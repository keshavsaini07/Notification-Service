const express = require("express");
const { EmailController } = require("../../controllers");

const router = express.Router();

router.post('/create', EmailController.createTicket)

module.exports = router;

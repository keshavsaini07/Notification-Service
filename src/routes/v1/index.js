const express = require('express');
const { InfoController } = require("../../controllers");

const router = express.Router();

const emailRoutes = require('./email-routes');

router.get("/info", InfoController.info);

router.use('/tickets', emailRoutes)

module.exports = router;

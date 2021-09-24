const express = require('express');
const router = express.Router();
const HomeController = require("../controllers/HomeController");

/* GET home page. */
router.get('/dropdown-list', HomeController.dropDownData);

module.exports = router;

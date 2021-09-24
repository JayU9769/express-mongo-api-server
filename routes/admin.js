const express = require('express');
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const verifyAdminToken = require("../middleware/adminAuth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', AdminController.validate('login'), AdminController.login);

router.post("/register", AdminController.validate('registration'), AdminController.register);


router.post("/welcome", verifyAdminToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;

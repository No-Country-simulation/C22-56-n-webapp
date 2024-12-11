const express = require("express");
const { createMessage } = require("../controllers/contactoController");

const router = express.Router();

router.post("/contacto", createMessage);

module.exports = router;

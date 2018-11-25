// the todo list itself
const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "list works" }));

module.exports = router;

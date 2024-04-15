const express = require("express")
const router = express.Router()
// const { contactUsController } = require("../controllers/")

router.post("/contact", contactUsController)

module.exports = router
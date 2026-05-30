const express = require("express");

const router = express.Router();

const { sendEnquiry } = require("../controller/enquiryController");

router.post("/send-enquiry", sendEnquiry);

module.exports = router;

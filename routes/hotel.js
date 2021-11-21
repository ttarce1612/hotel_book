var express = require("express");
const HotelController = require("../controllers/HotelController");

var router = express.Router();

router.get("/list", HotelController.hotelList);
router.get("/:id", HotelController.hotelDetail);
router.post("/book", HotelController.hotelBook);

module.exports = router;
const Hotel = require("../models/HotelModel");
const apiResponse = require("../helpers/apiResponse");
const _ = require('lodash')
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);




exports.hotelList = [
    function (req, res) {
        try {
            let condition = {};
            if (req.params && req.params.length > 0) {
                condition = _.pick(req.params, 'name', 'room', 'star_rating', 'furniture');
                if (req.params.type) {
                    condition['type'] = {$in: req.params.type.split(',')}
                }
                if (req.params.startPrice) {
                    condition['pricePerMonth'] = {$gte: req.params.startPrice}
                }
                if (req.params.endPrice) {
                    condition['pricePerMonth'] = condition.pricePerMonth ? condition.pricePerMonth : {};
                    condition.pricePerMonth['$lte'] = req.params.endPrice
                }
            }
            Hotel.find(condition).then((hotels) => {
                if (hotels.length > 0) {
                    return apiResponse.successResponseWithData(res, "Operation success", hotels);
                } else {
                    return apiResponse.successResponseWithData(res, "Operation success", []);
                }
            });
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

/**
 * hotel Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.hotelDetail = [
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.successResponseWithData(res, "Operation success", {});
        }
        try {
            Hotel.findOne({_id: req.params.id}).then((hotel) => {
                if (hotel !== null) {
                    return apiResponse.successResponseWithData(res, "Operation success", hotel);
                } else {
                    return apiResponse.successResponseWithData(res, "Operation success", {});
                }
            });
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];


exports.hotelBook = [
   async (req, res) => {
        try {
           
            // Validate request ...
            Hotel.findOneAndUpdate({_id: req.params.id}, {
                startDay: req.body.startDay,
                endDay: req.body.endDay,
                bookedBy: req.body.bookedBy,
                isBook: true
            }, {}, function (err, docs) {
                if (err) {
                    return apiResponse.ErrorResponse(res, err);
                } else {
                    return apiResponse.successResponseWithData(res, "Hotel book Success.",docs);
                }
            });
            
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];


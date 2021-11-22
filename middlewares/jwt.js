const jwt = require("express-jwt");
const secret = 'abcdefghijklmnopqrstuvwxyz1234567890'; // process.env.JWT_SECRET;

const authenticate = jwt({
	secret: secret
});

module.exports = authenticate;
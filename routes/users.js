var express = require('express');
var router = express.Router();

module.exports = function(router) {

	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  res.send('respond with a resource');
	});

};

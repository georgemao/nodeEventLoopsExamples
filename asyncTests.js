'use strict';

var async = require("async");

exports.handler = (event, context, callback) => {

	// Perform these async calls in series
	async.series([
		function(callback){
			console.log('ji');
			callback(null, 'one');
		},
		function(callback){
			console.log('adsf');
			callback(null, 'two');
		}
	],
	function(err, results){
		console.log(results);
		
	});

	// Waterfall the result of each function to the next
	async.waterfall([
		function(callback){
			callback(null, 'one');
		},
		function(arg1, callback){
			console.log(arg1);
			callback(null, 'two');
		}
	], function(err, result){
		console.log(result);
		callback(null, {statusCode: 200})
	});
}

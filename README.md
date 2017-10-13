# nodeEventLoopsExamples


## Introduction
NodeJS utilizes an asynchronous programming model, via the Event Loop. However, sometimes it is necessary to invoke operations synchronously in sequence or parallel. This sample makes use of the [async](https://caolan.github.io/async/) library.

## Example

```node
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
```

## Resources

- **asyncTests.js** - NodeJS Based Lambda function demostrates how to control the Event loop

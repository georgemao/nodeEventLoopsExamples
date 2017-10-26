# nodeEventLoopsExamples


## Introduction
NodeJS utilizes an asynchronous programming model, via the Event Loop. However, sometimes it is necessary to invoke operations synchronously in sequence or parallel. This sample demostrates two approaches to this.

## A Promise Example
First, is by issuing Promises and fullfilling them when the Async calls complete. A fully functional example is shown in **promiseExample.js**.
Instead of issuing callbacks, we create a Promise then call the .then() operator when the promise is ready.

```node
var url = docClient.query(params).promise();
```

```node
url.then();
```

Second, is by using a 3rd party library  [async](https://caolan.github.io/async/). This library allows calls occur in series, parallel, or waterfall mode by issuing Callbacks. A fully functional examle is show in **asyncTests.js**

## A Callback Example

```node
async.series([
	function(callback){
		console.log('ji');
        callback(null, 'one');
	},
    function(callback){
        console.log('adsf');
		callback(null, 'two');
	}],
	function(err, results){
		console.log(results);
	}
);
```

## Resources

- **asyncTests.js** - NodeJS Based Lambda function demostrates how to control the Event loop

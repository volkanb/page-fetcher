const request = require('request');
let myArgs = process.argv.slice(2);

request(myArgs[0], (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

// get cli arguments url and path
// --- print arguments
// establish connection to url
// download resource upon connection
// save the resource to the file with path
// log completion message with resource size


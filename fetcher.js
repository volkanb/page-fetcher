const request = require('request');
const myArgs = process.argv.slice(2);
const fs = require('fs')

// Establish a connection to the url
request(myArgs[0], (error, response, body) => {
  // Write the body to specified file
  fs.writeFile(myArgs[1], body, err => {
    if (err) {
      console.error(err);
      return;
    }
    // Log the success message
    console.log(`Downloaded and saved ${body.length} bytes to ${myArgs[1]}`);
  });
});



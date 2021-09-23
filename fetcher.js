const request = require('request');
const fs = require('fs');
const isValid = require('is-valid-path');
const readline = require('readline');

const myArgs = process.argv.slice(2);

// Check if path is valid
if (!isValid(myArgs[1])) {
  console.log("File path invalid! Terminating...");
  return;
}

// Check if URL is valid
const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};
if (!isValidUrl(myArgs[0])) {
  console.log("URL is not valid! Terminating...");
  return;
}

// Check if file already exists
fs.access(myArgs[1], fs.F_OK, (err) => {
  if (err) {
    console.error(err)
    return
  }

  //file exists, ask to continue
});

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



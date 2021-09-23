const request = require('request');
const fs = require('fs');
const isValid = require('is-valid-path');
const readline = require('readline');

const myArgs = process.argv.slice(2);
const myURL = myArgs[0];
const path = myArgs[1];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if path is valid
if (!isValid(path)) {
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
if (!isValidUrl(myURL)) {
  console.log("URL is not valid! Terminating...");
  return;
}

// The function that creates the request and saves the response body
const saveResponseBody = () => {
  // Establish a connection to the url
  request(myURL, (error, response, body) => {
    // Write the body to specified file
    fs.writeFile(path, body, err => {
      if (err) {
        console.error(err);
        return;
      }
      // Log the success message
      console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
    });
  });
};

// Check if file already exists
fs.access(path, fs.F_OK, (err) => {
  if (err) {
    // File does not exist, just save the response body
    saveResponseBody();
    rl.close();
    return;
  }
  // File exists, ask to overwrite or terminate
  rl.question('Would you like to overwrite the file?(Y/N)', (answer) => {
    if (answer === 'Y') {
      saveResponseBody();
    } else {
      // terminate program
      console.log('Terminating...');
    }
    rl.close();
  });
});

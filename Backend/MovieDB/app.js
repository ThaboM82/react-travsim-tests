//Internal Node modules imported
const http = require("http");
const fs = require("fs");

//Free API key from OMDB
const apikey = "984e2c27";

/*
i	= A valid IMDb ID (e.g. tt0105316)
t	= Movie title to search for (e.g. Around the world in 80 days)
*/
const typeOfSearch = "i";

//Query info to be placed here
let queryString = "tt0105316".toLowerCase();

//Cleanup of search term
queryString = queryString.replace(/\s/g, "+");

//API call options
let options = {
  host: "www.omdbapi.com",
  path: `/?${typeOfSearch}=${queryString}&apikey=${apikey}`,
};

//Function to handle the API returned information
const callback = function (response) {
  //This string will be built up
  let returnedInformation = "";

  response.on("data", function (chunk) {
    //String building using the chunk
    returnedInformation += chunk;

    //Cleanup contents before writing to file
    returnedInformation = returnedInformation.replace(/,/g, "\n");
  });

  //The complete response has been received, save contents to a file
  response.on("end", function () {
    //Writing to file, success or fail messages protocols
    fs.writeFile("OMDBInfo.txt", returnedInformation, (err) => {
      if (err) throw err;
      console.log("Contents saved in file");
    });
  });
};

//End process
http.request(options, callback).end();

const readline = require("readline");
const fs = require("fs");

const SearchFiles = (readStream, filePath, queries) => {
  let lineCount = 0;
  let matches = new Map();
  queries.forEach((query) => matches.set(query, []));

  return new Promise((resolve, reject) => {
    readStream.on("line", (line) => {
      lineCount++;
      for (let query of matches.keys()) {
        if (searchForTerm(line, query))
          matches.set(query, [...matches.get(query), lineCount]);
      }
    });

    readStream.on("close", () =>
      resolve({
        filePath,
        matches,
      })
    );
  });
};
const searchForTerm = (line, query) => line.match(query);

const createLineInterfaces = (filePaths) =>
  filePaths.map((filePath) => {
    const readStream = readline.createInterface({
      input: fs.createReadStream(filePath),
    });
    return {
      filePath,
      readStream,
    };
  });

const filesToSearch = ["test.js", "test2.js"];
//[/\S=|=\S|[^;]$/];
const queriesToSearch = [/\S=|=\S|[^;]$/];
let searchProms = createLineInterfaces(
  filesToSearch
).map(({ readStream, filePath }) => 
  SearchFiles(readStream, filePath, queriesToSearch)
);

Promise.all(searchProms).then((searchResults) =>
  searchResults.forEach((result) => console.log(result))
);

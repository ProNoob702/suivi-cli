#!/usr/bin/env node

var inputPath = "./src/icons/index.tsx";
var targetPath = "./src/iconsList.ts";

const fs = require("fs");
var readline = require("readline");

// read from input
var rd = readline.createInterface({
  input: fs.createReadStream(inputPath),
});

// clear file
fs.writeFile(targetPath, "", function () {
  console.log("clear done");
});

// put Opening Array
putOpeningArray();

// read from input line by line
rd.on("line", function (line) {
  const regex = /(?<=as)(.*)(?=})/g;
  const found = line.match(regex)[0];
  putLineInsideFile(`'${found.trim()}',\n`);
});

// finish reading
rd.on("close", function (line) {
  putClosingArray();
});

function putLineInsideFile(newLine) {
  fs.appendFile(targetPath, newLine, function (err) {
    if (err) return console.log(err);
    console.log("Appended!");
  });
}

function putOpeningArray() {
  const newLine = "export const iconsList: readonly string[] = [\n";
  fs.appendFile(targetPath, newLine, function (err) {
    if (err) return console.log(err);
    console.log("Appended!");
  });
}

function putClosingArray() {
  const newLine = `] as const \n
  export type iconsType = typeof iconsList[number]`;
  fs.appendFile(targetPath, newLine, function (err) {
    if (err) return console.log(err);
    console.log("Appended!");
  });
}

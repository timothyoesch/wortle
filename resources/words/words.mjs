import * as fs from 'fs';

let words = fs.readFileSync("./words.txt", "utf-8").split("\n").filter(function(word){
    return word.length === 5
}).join("\n").toLowerCase()

fs.writeFileSync("./betterWords.txt", words)
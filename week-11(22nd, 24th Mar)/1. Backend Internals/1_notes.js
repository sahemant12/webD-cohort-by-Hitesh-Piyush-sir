// 1. Nodejs is run time environment.
// 2. Nodejs is written on which js engine? => v8(owned by chrome)
// 3. other engine: Spider Monkey(firefox browser), Apple WebKit(Safari browser)

// 4. other run time env: Deno, Bun(fast): Drop in replacement(means having same signature but internal change).

// 5. 
const fs = require('fs');
// koi v module ko require/import karne ke liye require() fn ka use karte hai.
// when you run "const fs = require('fs');" in browser it will show 'require' is undefined becoz require is part of nodejs not browser.

fs.writeFile("./hello.txt", "Hello SUPERMAN", ()=> console.log("File Written")); // non blocking code
fs.writeFileSync("./hello2.txt", "Hello SUPERMAN"); // blocking code

console.log("filename: ", __filename);
console.log("dirname: ", __dirname);


//wrapper fn
// function execute(exports, require, module, __filename, __dirname){
//     // internally call 'require()' fn
// }
// Above, when we use require() fn, it internally call wrapper fn(execute) that have callback fn like require, module etc. and it call the require fn. NOTE: wrapper fn is just to understand its flow. Internally call another fn.

//require fn
// function require(moduleId){ // moduleId = "fs"
//     // ...
//     return // ...
// }
// require fn() tells give it the Id(moduleId) and it will give the functionality of that module.


// 6.
const math = require("./2_math.js");

// console.log(math.sum(10, 8));
// console.log(math.subtract(10, 8));
console.log(math());


//Nodejs is run time environment
//Nodejs is written on which js engine? => v8(owned by chrome)
//other engine: Spider Monkey(firefox), Apple WebKit(Safari)

//other run time env: Deno, Bun(fast): Drop in replacement(means having same signature but internal change).

// const fs = require("fs");
// fs.writeFile("./hello.txt", "Hello Hemant", ()=>{}); //non blocking code

//require is not defined in browser becoz require is part of nodejs.
//Above when we use require() it internally call wrapper fn(execute) that have callback fn like require, module etc. and it call the require fn.
console.log("filename: ", __filename);
console.log("dirname: ", __dirname);



//wrapper fn
function execute(exports, require, module, __filename, __dirname){
}


//require fn
function require(moduleId){
    // ...
    return // ...
}




function sum(a, b){
    return a+b;
}
function sub(a, b){
    return a-b;
}

// exports.sum = sum;
// exports.subtract = sub;

//default export
module.exports = function(){
    return "this is from default export"
}

//Things to understand
//1. export with fn
//2. module.exports
//3. exports.sum = sum;
//4. {}
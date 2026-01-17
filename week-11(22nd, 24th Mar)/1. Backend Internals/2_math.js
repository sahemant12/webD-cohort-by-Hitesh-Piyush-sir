
function sum(a, b){
    return a+b;
}
function sub(a, b){
    return a-b;
}

//default export
module.exports = function(){
    return "this is from default export"
}

// named export
exports.sum = sum;
exports.subtract = sub;

// NOTE: always default export will run. If default export not present then named export will work.


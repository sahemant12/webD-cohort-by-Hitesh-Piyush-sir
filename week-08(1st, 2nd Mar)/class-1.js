


function increment(){
    let count = 0;
    return function(){
        return ++count;
    }
}
const obj = increment();
console.log(obj());
console.log(obj());
console.log(obj());

//

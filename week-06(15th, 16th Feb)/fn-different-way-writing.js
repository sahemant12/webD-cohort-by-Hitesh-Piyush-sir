
//1. Function Declaration:  Hoisted (can be called before declaration).
console.log(myName("Hemant Sah"));

function myName(name){
    return `My Name is ${name}`;
}

//2. Function Expression(Anoymous Fn): Not hoisted (cannot be called before declaration).
const myName2 = function(name){
    return `My Name is ${name}`;
}
console.log(myName2("Hemant Sah"));

//3. Arrow Function: Not hoisted (cannot be called before declaration).
const myName3 = ((name) => `My name is ${name}`);
console.log(myName3("Hemant"));

//4. Immediately Invoked Function Expression (IIFE): A function that runs immediately after definition.
(function runme(){
    console.log("Hello Hemant");
    
})();



const obj = {
    personName: "Hemant",
    greet: function(){
        console.log(`Hello, ${this.personName}`);       
    } 
}
console.log("I'm Start");  //output:1
setTimeout(function(){console.log("I'm Timeout");}, 0); //output:4
Promise.resolve().then(()=>{
    console.log("Promise is resolve-1");
    Promise.resolve().then(()=>{
        console.log("Promise is resolve-2");
        Promise.resolve().then(()=>{
            console.log("Promise is resolve-3");       
        })
    
    })

}); //output:3
setTimeout(obj.greet, 0); //output:5
console.log("I'm End"); //output:2

//Js visualizer: https://www.jsv9000.app/
//why setTimeout is execute at the end?
//setTimeout(clock) run inside the browser.

//1. Whenever we execute the program. All the code goes into the call stack one by one for execution. If there is fn like setTimeout() or promises then browser register it for the execution when the timeout end or promise is resolve.
//2. when the setTimeout() time end then browser send it to the callback Queue. There is a process Event loop that continuously check whether callback queue have something. If call back queue have something then it check the call stack. If call stack is also empty then the Event Loop send this fn to the call stack for execution.
//3. If the promise is resolve() then the browser send the resolve promise fn to the Micro Task Queue. Micro Task Queue have higher priority than callback Queue. So the 1st all the micro task queue fn send to the call stack then callback Queue.

//Starvation? : https://medium.com/@sumedhakoranga/starvation-in-javascript-0a98f0824272
//if Micro Task Queue send the code again and again to the call stack and giving no chance to the callback queue to execute its code. Then, starvaction occur in which callback Queue never get chance to execute its code.


//Interview Ques: Make your own polyfills: event loop, promise.



// console.log(`My age is ${age}`);
// const age = 21; //ReferenceError: Cannot access 'age' before initialization
// let age = 21; //ReferenceError: Cannot access 'age' before initialization
// var age = 21;  //undefined
//why const, let show error and var show undefine?


//whenever we execute the code: 1st its global execution context is create.
//Hoisting: https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
// var is hoisted
//let, const is also hoisted.

//Yes, let and const are hoisted, but unlike var, they are not initialized.
// Explanation:
// In JavaScript, hoisting means that variable and function declarations are moved to the top of their scope during the compilation phase.
// However, while var variables are hoisted and initialized with undefined, let and const are hoisted but remain uninitialized.
// This means they exist in the Temporal Dead Zone (TDZ) from the start of the block until the code execution reaches their declaration.
//Temporal Dead Zone: https://www.freecodecamp.org/news/javascript-temporal-dead-zone-and-hoisting-explained/




// Inside call stack there is 2 phase:
//Memory phase(1st phase): all the variables and functions are stored in the memory phase. 
//But in memory phase var variables are hoisted and initialized with undefined, let and const variables are hoisted and goes into the TDZ whereas fn are hoisted with their full definition (including their body).
//E.g: age = undefined (for var variables) function fn(){}: along with body hoisted.

//Code phase(2nd phase): In code phase, code get executed line by line and variables gets assigned actual value.
//E.g: age = 15;







// My self understanding(****)

//1. When we execute the program then all the tasks in sequence manner pushed to the top of `call stack`, finishes their execution and popped out of the call stack.
//2. But when there is asynchronous blocking tasks like `setTimeout()` or `Promises` then the browser register it for execution when the timeout end or promise is resolve.
//3. When the timeout end then browser send the tasks like `setTimeout()` to the `callback queue` and the tasks like `Promises` to the `microtask queue`. They are waiting for the `call stack` to get empty so that these tasks can get executed.
//4. There is process called `Event Loop` that continuously checking whether the call stack is empty or not. If it is empty then first, it put all the tasks of `microtask queue` to the `call stack` for execution, it don't put tasks of `callback queue` because it has lower priority then `microtask queue`.
//5. When all the tasks of `microtask queue` get executed then `Event Loop` put all the tasks of `callback queue` to the `call stack` for execution. This is how code get executed in JavaScript.
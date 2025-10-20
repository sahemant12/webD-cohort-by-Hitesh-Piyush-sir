//Extra:
//1. what does setTimeout return? : it return a `timeout ID` that is used to cancel timeout using clearTimeout(id) before it executes.
// Example:
// let id = setTimeout(() => {
//   console.log("This will not run");
// }, 3000);
// clearTimeout(id); // Cancels the timer


// ============================================================================================================================

// Debounce
function ptaNahi(fn, delay){
    // console.log(arguments);
    
    let myId;
    return function(...args){
        clearTimeout(myId);
        myId = setTimeout(()=>{
            fn.apply(this, args); // go into the callback queue and its context is lost.
        }, delay);
    }; // only if function is returning then it will also take all the variable with it like myId, myAge
    // whoever have reference of this returning fn they can also access myId, myAge.
    // This is what we can say closure, lexical scoping.
}
function greet(name){
    console.log(`Hello, ${name}`);
};

const sachMaiPtaNahi = ptaNahi( () => greet("Hemant"), 2000);
// sachMaiPtaNahi();
// sachMaiPtaNahi();
// sachMaiPtaNahi();
// sachMaiPtaNahi();


// Throttling
function throttlingCode(fn, delay){
    let timeoutId = null;
    return function(...args){
        if(timeoutId === null){
            fn(...args);
            timeoutId = setTimeout(()=>{
                timeoutId = null;
            }, delay);
        }
    }
}

function ekBaarRun(naam){
    console.log(`Hello my naam is: ${naam}`);   
}

const throttling = throttlingCode(ekBaarRun, 2000);

throttling("hemant"); 
throttling("Zatch");
throttling("Raj");
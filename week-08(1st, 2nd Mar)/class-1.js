//lexical scoping and closures:

let fname = "Hemant";

function sayName(){
    lname = "Sah";
    console.log(fname, lname);   
}
console.log(fname);
sayName();

// When we run above code then:
//1. 1st the GEC will created. It has 2 phase. Memory phase and code phase.
//2. In the Memory Phase, all variables and functions are declared. Variables are initialized with undefined, and functions are stored with their complete body.
//3. In the Code Phase, the code runs line by line. First, it prints fname, then it calls the sayName() function.
//4. Since a function has its own execution context, the Function Execution Context (FEC) is created, which also has a Memory Phase and a Code Phase.
//5. In the Memory Phase of sayName, the variable lname is declared and initialized as "Sah". In the Code Phase, it prints fname and lname. Since fname is not found in the local scope, it looks in the outer (global) scope and finds it there.



function increment(){
    let count = 0;

    // Closure Function: fn binded by its lexical scope.
    return function(){
        return ++count;
    }
}
const incr = increment();
console.log(incr());
console.log(incr());
console.log(incr());

//lexical scoping: ls in Js is a convention that determines how variables are accessible in a block of code.
//closures(best definition): In js, closure is a fn that has access to the variables of its outer fn, even after the outer fn finish its execution.
// becoz we return a fn that still hold its reference.
// Drawback of closure: memory leak.
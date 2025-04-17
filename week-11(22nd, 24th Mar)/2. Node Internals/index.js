
const fs = require("fs");

// setTimeout(()=> console.log("Set Timeout"), 0);
// setImmediate(() => console.log("Set Immediate"));
// console.log("END");
// //Output
// // END
// // Set Timeout
// // Set Immediate


setTimeout(()=> console.log("Set Timeout"), 0);
setImmediate(() => console.log("Set Immediate"));
//Output
// Set Immediate  ::::: Here, why set immediate come 1st before set timeout?
// Set Timeout

//WHY? SOLUTION: Also, watch screenshot for better understanding.

//1st understand some term
//1. libuv: is a multi-platform C library that provides support for asynchronous I/O based on event loops. It also provide thread pool.
//2. Nodejs internally use libuv library for I/O.
//3. Nodejs is a single threaded language.
//4. Now understand how node js internally works: thread ==> waiter(analogy)

//whenever we run file "node index.js" 1st a process of node created. It has 2 main parts (i) Main Thread(single thread) (ii) Thread Pool.

// ################### Main Thread #######################
//1st: code is run in main thread. Now, see the sequence of main thread(what nodejs do)
//1. init project
//2. Top level code execute karta ha(like require, console)
//3. Event callbacks register: Event callbacks is a function in a script that Monitoring Scripting Client calls in response to an event
//4. Event Loop start(when up finished executing): BEST DOCS(Read Definitely)*: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick


//Now, event loop executing: now, see the sequence of event loop in phase
//1. Expired Timer callbacks(e.g: setTimeout, setInterval).
//2. IO pooling(e.g: callback runs of file-system(require)).
//3. setImmediate Callbacks.
//4. close callbacks --> if NO  => EXIT else again execute from phase-1.
//So, these are the phases of event loop.


// while(true){ //this while loop run when event loop executed
//     //1. sabhi timers ke callback ko chalo.
//     //2. kissi ka file read ho gaya hai toh usko show kar do.
//     //3. agar koi setImmediate code hai toh usko run kardo.
//     //4. kya code mai aur kuch baki hai? Yes or No
//     //if No: break.
//     //if YES: toh chalo wapas phirse.
// }


// ################### Thread Pool #######################





//Task-Queue, Micro-Task Queue all these are done by browser. It is how browser internally execute the code.
// This(index.js) is done by nodejs. It is how nodejs internally works.
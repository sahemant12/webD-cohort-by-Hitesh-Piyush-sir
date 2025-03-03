//prototype is a object.
//Basic
// Array.prototype = {properties, methods}
const arr = [1, 2, 3, 4]; //Now, arr.__proto__ will access all the properties and methods of  Array.prototype. Means
arr.__proto__ = Array.prototype; 

//E.g:
let str = "Hemant";
let len = str.length; //1st it will check length property inside str(it will not found) then it will go to str.__proto__ (there it will find and return the length). If there it also not found then it will go to the parent of __proto__ if there also not present then it keep going until reach null.

Array.prototype.callMe = function(){ //make my own property "callMe" and add it to the Array.
    console.log("I'm He-man-t");
}
console.log(arr);
console.log(arr.callMe()); //I'm He-man-t


//Important**
//polyfills:
//Let's tell a story: suppose a browser doesn't have a method or that method will present in browser after update. If a program executes and run the method that is not present in browser. Then what will happen? that program will crash. So, here comes the polyfills: it is a piece of code that fills given missing methods/functionality, allowing us to use the methods that are not present in the browser.  
// For example, if an older browser lacks the Array.prototype.includes method, a polyfill can add it so that our code runs smoothly across all browsers.

if(!Array.prototype.fill){
    //Fallback - polyfill
    Array.prototype.fill = function(){
        console.log("making my own polyfill");       
    }
}

//forEach
//



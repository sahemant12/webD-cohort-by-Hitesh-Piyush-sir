//1. sort(): sort the element of the array and return the reference to the same array. 
//description: If compareFn is not supplied, all non-undefined array elements are sorted by converting them to strings and comparing strings in UTF-16 code units order. For example, "banana" comes before "cherry". In a numeric sort, 9 comes before 80, but because numbers are converted to strings, "80" comes before "9" in the Unicode order. All undefined elements are sorted to the end of the array.

//Internal details of sort later


//2. currying:Currying is a functional programming technique where a function is transformed into a sequence of functions, each taking a single argument. Instead of taking multiple arguments at once, a curried function takes them one at a time. Currying helps break down a function into smaller, reusable functions. It is widely used in JavaScript frameworks like React and Redux. 


//3. call, bind, apply in Js:
// ----------------------------------------------------------------------- Not understood
//call: humhara curr execution context kisi aur ko pas kar deta hai.
function setUserName(username){
    //complex DB calls
    this.username = username;
    console.log("I'm setUserName Fn");
}

function createUser(username, email, password){
    // setUserName(this, username); //not working
    setUserName.call(this, username);
    this.email = email;
    this.password = password;
}
// const user = new createUser("Hemant Sah", "hemant@gmail.com", "@123");
// console.log(user);

// -----------------------------------------------------------------------



//for Better Understand: Best E.g below to understand call, bind, and apply

let userDetails = {
    name: "hemant sah",
    age: 21,
    getDetails: function(){
        console.log(`My name is ${this.name} and age is ${this.age}`);        
    }
}
// userDetails.getDetails();

let userDetails2 = {
    name:"Sourav singh"
}

// userDetails.getDetails.call(userDetails2); //My name is Sourav singh and age is undefined
//it will execute the fn immediately(run immediately)
//here, getDetails() have current object: userDetails2


const getDetail = userDetails.getDetails.bind(userDetails2); //My name is Sourav singh and age is undefined
//it will make a copy of userDetails and binds it to userDetails2 object and return a fn(new).
//getDetail();


//Another E.g:
const displayDetails = function(place1, place2){
    console.log(`name:${this.name}, age: ${this.age}, ${place1}, ${place2}`);  
}

//call
// displayDetails.call(userDetails); //passing the "userDetails object"
// displayDetails.call(userDetails, "NY", "SF"); //we can also pass the argument.

//bind
const result = displayDetails.bind(userDetails, "NY", "SF");
// result();
//The only difference between call and bind is call immediately execute the fn whereas bind return a new fn.
// The only difference between call and apply is the way how we pass the argument.
displayDetails.apply(userDetails, ["NY", "SF"]); //in apply we pass the array which contains our argument.

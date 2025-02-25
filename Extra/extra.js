//1. sort(): sort the element of the array and return the reference to the same array. 
//description: If compareFn is not supplied, all non-undefined array elements are sorted by converting them to strings and comparing strings in UTF-16 code units order. For example, "banana" comes before "cherry". In a numeric sort, 9 comes before 80, but because numbers are converted to strings, "80" comes before "9" in the Unicode order. All undefined elements are sorted to the end of the array.

//Internal details of sort later


//2. currying:Currying is a functional programming technique where a function is transformed into a sequence of functions, each taking a single argument. Instead of taking multiple arguments at once, a curried function takes them one at a time. Currying helps break down a function into smaller, reusable functions. It is widely used in JavaScript frameworks like React and Redux. 


//3. call, bind, apply in Js: Watch the video again to understand much better

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
const user = new createUser("Hemant Sah", "hemant@gmail.com", "@123");
console.log(user);

//bind: 




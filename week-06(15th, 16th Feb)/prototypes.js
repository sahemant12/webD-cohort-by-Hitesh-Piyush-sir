//Basic
class Animal{
    //variables
    //method
}

const lion = new Animal();
//new keyword: allocated a new memory in heap for the object that has been created.

//prototypes: A prototype is a built-in mechanism in JavaScript that allows objects to inherit properties and methods from other objects. 

// 1. Understanding Prototypes with an Example
//E.g-1
function Person(name, age) { //constructor fn
    this.name = name;
    this.age = age;
  }
  // Adding a method to the prototype
  Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name}`);
  };
  // Adding a variable to the prototype
  Person.prototype.gender = "Male"
  
  // Creating an object
  let john = new Person("John", 25);
//   john.greet();  // Output: Hello, my name is John
// console.log(john.gender);


//E.g-2
const obj1 = {
    fname:"Hemant",
    lname:"Sah",
    age: function(){
        console.log(21);       
    }
}

const obj2 = {
    fname:"Haresh",
    lname:"Gupta"
}
obj2.__proto__ = obj1; //now we can access all the properties and fn of obj1 in obj2
// console.log(obj1.__proto__); //get access to all the properties and methods that are present in prototypes.
// console.log(obj2.age());
// console.log(obj2);
// console.log(obj2.age.toString());


//2. Prototype Chain: If a property or method is not found on an object, JavaScript looks up the chain to the object's prototype. child -> parent -> grandparent -> Object.prototype -> null



const arr = [1,2,3,4];
// console.log(arr.__proto__); //arr.__proto__ will have all the properties and methods of Array object.

const s = "Hello";
// console.log(s.__proto__); //s.__proto__ will have all the properties and methods of String object.

// //From E.g-1
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   Person.prototype.greet = function () {
//     console.log(`Hello, my name is ${this.name}`);
//   };

//   Person.prototype.gender = "Male"
  
//   let john = new Person("John", 25);
//   john.greet();  // Output: Hello, my name is John
//   Person.prototype; //Output: gender, fn, prototype(methods, properties)

//Ques perform inheritance w/o extends
class A{
    getName(){
        console.log("I'm class A");       
    }
}

class B{
    constructor(){
        this.str = "I'm variable B";
    }
    // prototype = A;
}
Object.setPrototypeOf(B.prototype, A.prototype);
const a = new A();
const b = new B();
a.getName();
console.log(b.str);
b.getName();
console.log(Object.getPrototypeOf(b));



  
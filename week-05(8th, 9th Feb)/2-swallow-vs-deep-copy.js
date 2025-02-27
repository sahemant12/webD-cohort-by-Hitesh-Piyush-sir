
//passing value
let p3 = "I'm not reference";
let p4 = p3;
p4 = "Hello";
// console.log(p3); //I'm not reference
// console.log(p4); //Hello
//here, since p3, p4 are primitives datatype: so only pass by value happen


//passing reference
let p1 = {
    name:"hemant",
}
let p2 = p1;
p2.name = "piyush";
// console.log(p1); //piyush
// console.log(p2); //piyush
//since we are passing refernece(non-primitives datatype) so change in p2 will also occur in p1.


//we don't want to pass the reference. What we will do?
//we will assign a copy. How?
//1. swallow copy(using spread operator(...)): But inner objects will not copy rather inner obj refernce will pass.
//2. Deep copy(Best way to copy(don't pass refenence))

//swallow copy
let obj1 = {
    fname:"hemant", //primitive
    lname:"sah", //primitive
    vehicles: { //non-primitive
        car:"Range Rover",
        Bike:"Harley Davidson"
    }
}
// let obj2 = obj1; //wrong way it will pass reference

let obj2 = {...obj1}; //it will make copy of obj1 but inner obj of obj1 refernce will pass.
// console.log("obj1: ",obj1);
// console.log("obj2: ",obj2);

obj2.fname = "Haresh"; //only obj2 fname will change.
obj2.vehicles = "car, bike"; //only obj2 vehicles will change. Becoz here vehicles copy is pass.
// obj2.vehicles.car = "BMW"; //both obj1 and obj2 vehicles will change. Becoz inside vehicles car reference is pass.
// console.log("obj1: ",obj1);
// console.log("obj2: ",obj2);


//deep copy: There are many technique to perform deep copy.
//one of them: if we convert the object into string then assign it to the another obj(only value will pass) then we convert that string again into object. Hence, we get the object that is copy.
//E.g: Deep Copy.
let obj3 = {
    fname:"piyush",
    lname:"nayak",
    vehicles: {
        car:"Wagnor",
        Bike:"splender"
    }
}
let objString = JSON.stringify(obj3); //convert obj3 into string.
// console.log(objString);

let obj4 = JSON.parse(objString); //convert the string into object. Now, both obj3 and obj4 have different address.
// console.log(obj4);

obj4.fname = "Shrey"; //only obj4 fname will change.
obj4.vehicles.Bike = "Hero"; //only obj4 vehicles.bike will change.
// console.log(obj3); 
// console.log(obj4);


//Imp*: serialize vs deserialize of JSON(Very Imp concept):
//Serialization is the process of converting a JavaScript object into a string format—often JSON—so that it can be stored or transmitted. Deserialization is the reverse process, where you convert that string back into a JavaScript object.

const obj = { name: "Alice", age: 30 };

// Serialization: converting the object to a JSON string
const jsonString = JSON.stringify(obj);
console.log(jsonString); // Output: '{"name":"Alice","age":30}'

// Deserialization: converting the JSON string back to an object
const newObj = JSON.parse(jsonString);
console.log(newObj); // Output: { name: "Alice", age: 30 }




const obj1 = {
    fname:"hemant",
    lname:"sah",
    vehicles: {
        car:"Range Rover",
        Bike:"Harley Davidson"
    }
}

const obj2 = {
    ...obj1 //... is spread operator(not work for inner objects)//also known as swallow copy.

}
const obj3 = obj1;
console.log("obj1: ",obj1);
console.log("obj2: ",obj2);

obj2.fname = "haresh"; //only obj2 fname will change.
obj2.vehicles.car = "BMW" //both obj1 & obj2 car will change.

console.log("obj1: ",obj1);
console.log("obj2: ",obj2);


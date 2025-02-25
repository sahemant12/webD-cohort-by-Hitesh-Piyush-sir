

//Stack: Fast, Temporary
//1. stores primitive values, and function calls
// E.g:
let x = 10;  // Primitive (stored in Stack)
let y = x;   // Copy of x is created in Stack
y = 20;      // Changing y does not affect x
console.log(x); // Output: 10
console.log(y); // Output: 20

//Heap: Slow, Dynamic
//1. Stores non-primitive values (objects, arrays, functions).
//2. Objects are stored in the Heap, but references to them are stored in the Stack.
//E.g:
let obj1 = { name: "John" };  // Object stored in Heap, reference stored in Stack
let obj2 = obj1;  // obj2 gets a reference to obj1, not a copy
obj2.name = "Doe"; // Modifying obj2 also changes obj1

console.log(obj1.name); // Output: "Doe"
console.log(obj2.name); // Output: "Doe"

//Primitive data-type:
//1. stored directly in the stack.
//2. Fixed size, fast, and immutable (cannot be changed).
//3. When assigned to another variable, a copy is created.
//E.g: Number, String, Boolean, null, undefined, Symbol

//Non-primitive data-type:
//1. Stored in Heap, with a reference stored in Stack.
//2. Can be modified after creation.
//3. When assigned to another variable, a reference is passed, not a copy.
//E.g: Object, Array, Function, Heap, Graph, Tree

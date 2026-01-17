
// 1. There are two types of import/export : (i) CommonJS  (ii) ES Modules (ESM).
// 2. Node.js use both: CommonJS is old way, ES Modules is new way. By default it use 'CommonJS'. 
// In package.json: {type: module} for ES modules and {type: commonJs} for CommonJS.

// 3. React, frontend, modern JS use 'ES Modules (ESM)'

// Some points:
// 1. 1st understand ES Modules, then its difference in Nodejs and React
// 2. 2nd understand CommonJS.

// #1. understanding ES Modules

// 1. export default hello
function hello() {
  console.log("Hello");
}
export default hello;

import hello from "./file"; // 'hello' ✔ Name can be anything
hello();


// 2. export function fnName(){}
export function sum(a, b) {
  return a + b;
}
export function mul(a, b) {
  return a * b;
}
import { sum, mul } from "./math";

// 3. export {a, b, c}
function hello2() {}
function sum2() {}
function sub() {}
export { hello2, sum2, sub };
import { hello2, sum, sub } from "./file"; // ✔ Name MUST match

// 4. Mix default + named (VERY COMMON IN REACT)
// export default function App() {}
export function Header() {}
export function Footer() {}

import App, { Header, Footer } from "./App";


// Above code help to understand how ES Modules import/export work in node.js and react.

// Difference between import and export in node.js and react:
// 1. File extensions: React -> ❌ not required, Node.js -> ✅ required
//    React: import { sum } from "./math"; .jsx not required, optional.
//    Node.js: import { sum } from "./math.js"; // REQUIRED

// 2. Who resolves imports: React -> Bundler (Vite/Webpack), Node.js -> Node itself

// 3. Node requires: { "type": "module" } in package.json whereas React doesn't need.



// #2. Understanding CommonJS:

// 1. module.exports = hello;
function hello() {
  console.log("Hello");
}
module.exports = hello; // default export(unofficially)

const hello = require("./file"); // import
hello();


// 2. exports.fn = function() {}
exports.sum = function(a, b) {
  return a + b;
};

exports.sub = function(a, b) {
  return a - b;
};
// Internally becomes:
module.exports = {sum, sub};
const { sum, sub } = require("./math"); // import

// 3. exports.fn-name = fn;
function mul(a, b){
    return a*b;
}
function div(a, b){
    return a/b;
}

exports.multiply = mul; // works
exports.div = div;
const { multiply, div } = require("./math"); // import



// 2️⃣ CommonJS vs ES Modules in Node.js (Side by Side)
//      Feature	                CommonJS	                   ES Modules
//      Import	                require()	                   import
//      Export	                module.exports	               export
//      Default export          ❌ (conceptual only)	         ✅ real
//      Named export            exports.x	                   export x
//      Top-level await         ❌	                         ✅
//      Used in React          ❌	                         ✅
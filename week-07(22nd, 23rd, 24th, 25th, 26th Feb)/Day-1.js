// ########## Part-1 ##########
let a = "100w";
const convertNum1 = Number(a); //Best practice
const convertNum2 = +a; //another way
const convertNum3 = parseInt(a); //another way
// console.log(convertNum1, convertNum2, convertNum3);



const random = Math.random(); //random no. between [0,1)
const floor = Math.floor(-6.9999); //give the floor value
// console.log(random);
// console.log(floor);

//generate random no. between 1 and 6
const dice = random * 6; //give random no. between 0 and 5.99999  //Min: 0*6 = 0, Max: 0.999999*6 = 5.999994
// console.log(dice);
const floorValue = Math.floor(dice);
// console.log(floorValue);
const randomNumBetween = floorValue+1;
// console.log(randomNumBetween);





//Merge two arr;
let arr1 = [1,2,3,4,5, "six"];
let arr2 = ["one", "two", "three"];
// console.log(arr1);
// console.log(arr2);

//1st way
let arr3 = arr1.concat(arr2); //return concate array and store it in new array. And no change in arr1 and arr2;
// console.log(arr3);

//2nd way
let arr4 = [...arr1, ...arr2];
// console.log(arr4);

//3rd way: using loop


function checkTruthValue(value){
    if(value){
        console.log("True");       
    }else{
        console.log("False"); 
    }   
}
// checkTruthValue([]); //okay: empty braces/sq bracket return true;
// checkTruthValue({});
// checkTruthValue(0);
// checkTruthValue(1);
// checkTruthValue("hemant");
// checkTruthValue("");
// checkTruthValue([1, 2, 3]);
// checkTruthValue(null); //false
// checkTruthValue(undefined); //false
// checkTruthValue(NaN); //false




// ########## Part-2 ##########

const fruits = [1, 2, 3, 4, 5];
// console.log(fruits[1]);
// console.log(fruits[-1]); //undefined
// console.log(fruits.at[-1]); //undefined
// console.log(fruits.at(-1)); //5
// Note: we use -ve index with braces not square bracket. Here, we have to make a fn that return the value from the last, based on -ve index: Have done in Day-2

//Before that let understand .reduce() method in detail:
//E.g-1
const array1 = [1, 2, 3, 4];
let expenses = [
    {description: "Groceries", amount:50, category: "Food"},
    {description: "Electricity Bill", amount:100, category: "Utilities"},
    {description: "Dinner", amount:30, category: "Food"},
    {description: "Internet Bill", amount:50, category: "Utilities"}
]

const initialValue = 0;
const undestandReduce = expenses.reduce((accumulator, currValue)=>{
    // console.log(accumulator, "@", currValue.amount);
    return "hemant"
},[1,2,3,4]);
// console.log(undestandReduce);

//E.g:2
const array = [15, 16, 17, 18, 19];
function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
  );
  return returns;
}
// array.reduce(reducer);


//challenge-1: fint the most active user using reduce. Return: that object
let userActivity = [
    {user: "Alice", activityCount: 45},
    {user: "Bob", activityCount: 75},
    {user: "Martha", activityCount: 33},
    {user: "Jonas", activityCount: 89},
    {user: "Zatch", activityCount: 22},
];

const mostActive = userActivity.reduce((acc, currUser)=>{  
    if(currUser.activityCount>acc.activityCount){
        return currUser;
    }  
    return acc;
})
console.log(mostActive);







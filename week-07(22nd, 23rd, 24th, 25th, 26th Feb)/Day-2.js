//challenge-1: Return an array: expenseReport = [{"Food":80}, {"Utilities":150}, {"Rent:500"}]
let expenses = [
    {description: "Groceries", amount:50, category: "Food"},
    {description: "Electricity Bill", amount:100, category: "Utilities"},
    {description: "Dinner", amount:30, category: "Food"},
    {description: "Home", amount:500, category: "Rent"},
    {description: "Internet Bill", amount:50, category: "Utilities"},
]
const foodExpense = expenses.reduce((expense, currExpense)=>{
    //check if given category present in the arr or not. If true then add amount else create a new obj and add amount and return the expenseReport.
    // if(expense[currExpense.category]){
    //     expense[currExpense.category] += currExpense.amount;
    // }else{   
    //     expense[currExpense.category] = currExpense.amount;
    // }
    //much better way than above
    expense[currExpense.category] = (expense[currExpense.category] || 0) + currExpense.amount;
    return expense;
},[])

// console.log(foodExpense);


//challenge-2: Return all the tasks that are not completed and sort them.
let tasks = [
    { description: "Write report", completed: false, priority: 2 },
    { description: "Send email", completed: true, priority: 3 },
    { description: "Prepare presentation", completed: false, priority: 1 },
  ];

  const pendingTask = tasks.filter((task)=>!task.completed).sort((a, b)=> a.priority - b.priority);
  console.log(pendingTask);
  
//challenge-3: Return the avg. movie rating.
let movieRatings = [
    { title: "Movie A", ratings: [4, 5, 3] },
    { title: "Movie B", ratings: [5, 5, 4] },
    { title: "Movie C", ratings: [3, 4, 2] },
  ];
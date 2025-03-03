
console.log("Start");

const fetchData = fetch("https//www.google.com"); //we are getting promise and when the promise is fulfilled we will get the data. //promise help to run the program synchronous and allow to get the data asynchronous.
fetchData
    .then(res => res.json()) //we get response as promise. when promise get fulfilled then .json() convert the data into json. Then using another then we can access the data.
    .then(data => data)


console.log("End");



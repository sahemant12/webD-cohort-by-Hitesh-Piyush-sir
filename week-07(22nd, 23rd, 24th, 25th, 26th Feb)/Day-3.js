
//challenge-1: create your own fn that give value of -ve index.
let arr = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
// console.log(arr[-1]);

function getvalue(arr, index){
    if(index<0){
        return arr[arr.length+index];
    }
    return arr[index];
}
// console.log(getvalue(arr, 25)); //Not this way. Get the answer by calling this: console.log(arr[-1]);
//we can do this by proxy: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
//proxy: It allow us to create an object that can be used in place of the original object, but we can redefine original object operations like getting, setting, and other properties.

// const user = {
//     name: "hemant sah",
//     age:21,
//     password: "@123",
// }

// const proxyUser = new Proxy(user, {
//     // get(target, prop){
//     //     console.log(prop);
//     //     console.log(target);        
//     //     return target[prop]; //target is object, and prop is its properties
//     // }
//     get(target, prop){
//         if(prop === "password"){
//             throw new Error("Access Denied");
//         }
//         return target[prop];
//     },
//     set(target, prop, value){}
// })
// console.log(proxyUser.age);



//Making proxy to get the value: arr[-1]

function negativeIndex(arr){

    return new Proxy(arr, {

        get(target, prop){ //here target is arr and prop is its index 
            let index = Number(prop);
            if(index < 0){
                return target[target.length + index]; // This modifies the original object
            }
            return target[index]; // This modifies the original object
        },
        set(target, prop, value){
            let index = Number(prop);
            if(index<0){
                target[target.length + index] = value; // This modifies the original object
            }else{
                target[index] = value; // This modifies the original object
            }
            return true;
        }
    })
}

let arr2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let negativeArr = negativeIndex(arr2);
// console.log(negativeArr[-4]);

negativeArr[-2] = 222;
negativeArr[1] = 111;
// console.log(arr2); //it also change the original array.
// console.log(negativeArr);

//Note: The original object remains unchanged, but any changes made through the Proxy are reflected in the target object. If the target object is mutable, modifications made via the Proxy do affect the target object.
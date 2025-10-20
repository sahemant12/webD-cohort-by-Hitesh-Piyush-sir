
//promise part-2
//previously developer depend on callback since promises was not exist. so to run a async fn just write a callback fn in it. If async operations done then get the data.

const fs = require('fs');
console.log("START THE PROGRAM");

//1
//reading file synchronously.
// const contents = fs.readFileSync("./Day-4-synFile.txt", "utf8");
// console.log("File Read successfully: ", contents);

//reading file asynchronously(background).
// fs.readFile("./Day-4-synFile.txt", "utf8", (err, content)=>{
//     if(err){
//         console.log("Error in file reading: ", err);       
//     }else{
//         console.log("File Read successfully: ", content);
//     }
// });
// console.log("END THE PROGRAM");



//2
// sum(2, 13, (result)=>{
//     console.log("sum: ", result);
// })
// console.log("END THE PROGRAM");

// function sum(a, b, fn){ //this is async fn.
//     setTimeout(()=>{
//         fn(a+b);
//     }, 1000);
// }



//3
//1. Read synFile
//2. create another file "hello.txt" and copy synFile file content to the "hello.txt".
//3. delete the "synFile"
// ----------------- Legacy Code ---------------------
// fs.readFile("./Day-4-synFile.txt", "utf-8", (err, content)=>{
//     if(err){
//         console.log("Error in reading synFile: ", err);      
//     }else{
//         console.log("Read synFile success: ", content);      
//         fs.writeFile("./Day-4-hello.txt", content, (err)=>{
//             if(err){
//                 console.log("Error in writing file");               
//             }else{
//                 console.log("File write success");
//                 fs.unlink("./Day-4-synFile.txt", (err)=>{
//                     if(err){
//                         console.log("Error in deleting file");                       
//                     }else{
//                         console.log("File Delete Successful");                       
//                     }
//                 })
//             }
//         });
//     }
// })


//4
//How can we do the above 3 part using promise?

// const fsv2 = require("fs/promises");

// ----------------- Modern Code ---------------------
// const result = fsv2.readFile("./Day-4-hello.txt", 'utf-8'); //result will be pending(promise)
// result
//     .then((content)=>{
//         console.log("file read success", content);
//         fsv2.writeFile("./Day-4-myFile.txt", content); //can do this using another .then()
//         fsv2.unlink("./Day-4-hello.txt"); //can do this using another .then()
//     })
//     .catch((err)=>{
//         console.log(err);       
//     })


//5
//Lets make our own Read, Write, Delete fn and it will return promise.

//read file
function readFileWithPromise(filepath, encoding){
    return new Promise((resolve, reject)=>{
        fs.readFile(filepath, encoding, (err, content)=>{
            if(err){
               reject(err);
            }else{
                resolve(content);
            }
        })
    })
}

//write file 
function writeFileWithPromise(filepath, content){
    return new Promise((resolve, reject)=>{
        fs.writeFile(filepath, content, (err)=>{
            if(err){
                reject(err);
            }else{
                resolve(true);
            }
        })
    })
}


//delete file
function deleteFileWithPromise(filepath){
    return new Promise((resolve, reject)=>{
        fs.unlink(filepath, (err)=>{
            if(err){
                reject(err);
            }else{
                resolve(true);
            }
        })
    })
}

// readFileWithPromise("./Day-4-myFile.txt", "utf-8")
//     .then((content)=>{
//         writeFileWithPromise("./Day-4-hello.txt", content)
//     })
//     .then(()=>deleteFileWithPromise("./Day-4-myFile.txt"))
//     .catch((error)=>console.log(error))
//promisification: converting legacy code to support promise.


//Now, async and wait. We use async and wait in place of .then() and .catch() for better code readibility.
//syntakic sugar
async function performTask(){ //async fn run in syn manner.
    try{
        const readFile = await readFileWithPromise("./Day-4-myFile.txt", "utf-8"); //get content
        await writeFileWithPromise("./Day-4-hello.txt", readFile);
        await wait(5); //wait for 5 seconds before file get delete
        await deleteFileWithPromise("./Day-4-myFile.txt");
    }catch(err){
        console.log(err);       
    }
    finally{
        console.log("All Done");       
    }

}
// performTask();

async function wait(seconds){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();       
        },seconds*1000);
    })

}

//usecase of aync await
async function registerUser(){
    await collectData(); //1st collect data from DB then move forward.
    validateUserEmail();

    await insertInDB(); //insert in DB then move forward.
    
    sendEmail();
    sendPushNotification();
}

registerUser()
.then(() => console.log("Done"))
.catch(() => console.log("Something went wrong"))
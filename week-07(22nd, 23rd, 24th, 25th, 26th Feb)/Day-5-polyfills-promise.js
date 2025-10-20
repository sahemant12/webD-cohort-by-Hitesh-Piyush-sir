
//polyfills of promise
//1st learn and watch that imp*********** Concept. Watch video again*******
function wait(seconds){
    return new Promise((resolve, reject)=>{
        setTimeout((err)=>{
            err ? reject(err) : resolve();
        }, seconds*1000)
    })
}

wait(5)
    .then(()=>console.log("Run after 5 seconds"))
    .catch((err)=>console.log(err))
    .finally(()=>console.log("Mai toh chalunga har baal"))

// using async/await
async function getWait(seconds){
    try{
        await wait(seconds);
        console.log("Run after 5 seconds");
    }catch(err){
        console.log(err)
    }finally{
        console.log("Mai toh chalunga har baal")
    }
}

getWait(5);
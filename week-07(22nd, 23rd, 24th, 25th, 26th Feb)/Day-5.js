
//polyfills of promise
function wait(seconds){
    return new Promise((resolve, reject)=>{
        setTimeout((err)=>{
            if(err){
                reject(err);
            }else{
                resolve();
            }
        }, seconds*1000)
    })
}

wait(5)
    .then(()=>console.log("RUn after 5 seconds"))
    .catch((err)=>console.log(err))
    .finally(()=>console.log("Mai toh chalunga har baal"))

  
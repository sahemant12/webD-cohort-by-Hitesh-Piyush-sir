const http = require('http');

const app = http.createServer((req, res)=>{
    console.log("I'm Server");
    switch(req.method){
        case 'GET': 
                    if(req.url === "/") return res.end("Home Page");
                    if(req.url === "/contact-us") return res.end("Contact-Us");
                    if(req.url === "/about-us") return res.end("About-Us");
                    break;

        case 'POST':
                    if(req.url === "/register") return res.end("Register Successful");
                    if(req.url === "/verify") return res.end("Verified");
                    break;
    }
    
});

app.listen(9999, () => {
    console.log("Server Started");
});

// Command to check response on terminal: curl -X POST http://localhost:9999/register
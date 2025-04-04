const http=require('http');
const fs=require('fs');

const PORT=3000;

const server=http.createServer((req,res)=>{
    res.writeHead(200,{'content-type': 'text/html'});

    fs.readFile('index.html',(err,data)=>{
        try{
            res.write(data);
            res.end();
        }catch(err){
            res.write('<h1>404 Not Found</h1>');
            res.end();
        }
    })
})

server.listen(PORT,(error)=>{
    if(error){
        console.log('Error',error);
    }
    else{
        console.log(`Server is running on port ${PORT}`);
    }
})
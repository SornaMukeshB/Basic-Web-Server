const http=require('http');

const fs=require('fs');
const server=http.createServer((req,res)=>{
    // console.log(req);

    const url=req.url;
    const method=req.method;
    if(url==='/'){
        res.setHeader('content-type','text/html');
        res.write('<html>')
        res.write('<head><title>Enter Form Details</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><input type="submit" value="send"></form></body>')
        res.write('</html>')
        return res.end();
    }

    if(url==='/message'&& method==='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            // console.log('chunk:');
            // console.log(chunk);
            body.push(chunk);
        })

        req.on('end',()=>{
            const parseBody=Buffer.concat(body).toString();
           // console.log(parseBody);
            const message=parseBody.split('=');
            //console.log(message[1]);
            fs.writeFile('hello.txt',message[1],(err)=>{
                console.log('Filewrite Completed!');
            });
        })
        res.setHeader('location','/')
        res.statusCode=302;
        return res.end();
    }

    res.setHeader('content-type','text/html');
    res.write('<html>')
    res.write('<head><title>Node Server</title></head>')
    res.write('<body><h1>Hello World</h1></body>')
    res.write('</html>')
    res.end();
});
server.listen(3000);

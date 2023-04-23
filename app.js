const http = require('http');
const fs = require('fs');
const { log } = require('console');

const server = http.createServer((req, res)=>{
    // console.log('url :',req.url,'method:',req.method,'headers:',req.headers);
    
    const url=req.url;
    const method=req.method;

    if(url==='/')
    {
        console.log('abcd');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write(`
        <body>
        <h1>Hello Node.js</h1>
            <form method="POST" action="/message">
                <input type="text" name="test"/>
                <button type="submit">Submit</button>
            </from>
        </body>`);
        res.write('</html>');
        return res.end();
    }

    if(url==='/message' && method==='POST')
    {
        console.log('post request');
        const body=[];

        req.on('data',(chunk)=>{
            console.log('chunk',chunk);
            body.push(chunk);
        });

        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            console.log('parsedBody',parsedBody);
            const message=parsedBody.split('=')[1];
            console.log('message',message);
            fs.writeFileSync('message.txt',message);
        })

        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
    }


    // res.setHeader('Content-Type','text/html');
    //     res.write('<html>');
    //     res.write('<head><title>My First Page</title></head>');
    //     res.write(`<body><h1>Hello Node.js</h1></body>`);
    //     res.write('</html>');
    //     res.end();

    
});

server.listen(3000);
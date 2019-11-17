const http = require('http');
const fs = require('fs');
const path = require('path');


// var message = 'I am so happy to be part of the Node Girls workshop!';
const handler = (request, response) => {
    const endpoint = request.url;
    console.log(endpoint);

    const method = request.method;
    console.log(method);

    if (endpoint === "/") {
        response.writeHead(200, {"Content-Type": "text/html"});

        fs.readFile(__dirname + '/public/index.html', function (error, file) {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });
    } else if (endpoint === "/node") {
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write("wow node time");
        response.end();
    } else if (endpoint === "/girls") {
        //  console.log("node girls just wanna have fun");
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write("node girls just wanna have fun");
        response.end();
    } else {
        console.log("inside");
        const extension = endpoint.split('.')[1];
        console.log("here extension", extension);
        const extensionType = {
            html: 'text/html',
            css: 'text/css',
            js: 'application/javascript',
            ico: 'image/x-icon',
            jpg: "image/jpeg",
        };
        const filePath = path.join(__dirname + '/public/' + endpoint);
        console.log("filepath",filePath);
        console.log("content",extensionType[extension]);
        fs.readFile(filePath, (error, file) => {
                if (error) {
                    console.log(error);
                    response.writeHead(404, {'Content-Type': 'text/html'});
                    response.end('<h1>404 file not found</h1>');
                } else {
                    response.writeHead(200, {'Content-Type': extensionType[extension]});
                    response.end(file);
                }
            }
        );
}
// else {
//         response.writeHead(404, { 'Content-Type': 'text/html' });
//         response.end('<h1>404 file not found</h1>');
//      }
}

var server = http.createServer(handler);

server.listen(3000, function () {

    console.log("Server is listening on port 3000. Ready to accept requests!");
});

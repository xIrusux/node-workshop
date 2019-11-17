const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const handler = (request, response) => {
    const endpoint = request.url;
    console.log(endpoint);

    const method = request.method;
    console.log(method);

    if (endpoint === "/") {
        response.writeHead(200, {"Content-Type": "text/html"});

        fs.readFile(__dirname + '/../public/index.html', function (error, file) {
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
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write("node girls just wanna have fun");
        response.end();
    } else if (endpoint === '/create-post') {

        message = "";

        request.on("data", function (data) {
            message += data;
        });

        request.on("end", function () {
            response.writeHead(302, {"Location": "/"});
            message = querystring.parse(message);
            console.log(message.blogpost);
            response.end();
        });

    } else {
        const extension = endpoint.split('.')[1];
        const extensionType = {
            html: 'text/html',
            css: 'text/css',
            js: 'application/javascript',
            ico: 'image/x-icon',
            jpg: "image/jpeg",
        };
        const filePath = path.join(__dirname + '/../public/' + endpoint);
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
}

module.exports = handler;

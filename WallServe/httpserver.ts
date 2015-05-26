﻿
var fs = require("fs");
var path = require("path");
var url = require("url");

export var test = "";

export function respond(request, response) 
{

    

    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd()+"/../Emperor", uri);
    console.log(filename);
    var contentTypesByExtension = { '.html': "text/html", '.htm': "text/html", '.css': "text/css", '.js': "text/javascript" };

    fs.exists(filename, function (exists) {
        if (!exists) {
            console.log((new Date()) + " WebServer FileNotFound 404: " + filename);
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found\n"); response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.write(err + "\n");
                response.end();
                return;
            }

            var headers = {};
            var contentType = contentTypesByExtension[path.extname(filename)];
            if (contentType) headers["Content-Type"] = contentType;
            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
        });
    });
}
 
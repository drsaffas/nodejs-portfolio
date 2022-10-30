const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer((request, response) => {
    let publicPath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);
    let empty = path.join(__dirname, 'public', "404.html")
    let contentType = getContentType(publicPath) || "text/html";
    
    fs.readFile(publicPath, 'utf8', (err, content) => {
	if (err) {
	    if (err.code === 'ENOENT') {
		fs.readFile(empty, 'utf8', (err, content) => {
		    response.writeHead(200, {'Content-Type': contentType});
		    response.end(content);
		})
	    }else {
		response.writeHead(500);
		response.end('A server error has occured');
	    }
	}
	response.writeHead(200, {
	    'Content-Type': contentType
	});
	response.end(content);
    })
}).listen(8081);

const getContentType = (x) => {
    let extname = path.extname(x);
    if (extname === '.js') {
	return 'text/javascript'
    }
    if (extname === '.css') {
	return 'text/css'
    }
    if (extname === '.jpg') {
	return 'image/jpg'
    }
    if (extname === '.png') {
	return 'image/png'
    }
    if (extname === '.ico') {
	return 'image/ico'
    }
}

console.log('Server running at http://127.0.0.1:8081/');

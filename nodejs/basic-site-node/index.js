var http = require('http');
var fs = require('fs');

function sendErrorPage(res) {
    fs.readFile('404.html', function(err, data) {

        if(err) {
            res.writeHead(404, {'Cotent-Type': 'text/html'});
            res.write('Page Not Found');
            return res.end();
        }

        res.writeHead(404, {'Cotent-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}

function sendPage(filepath, res) {
    fs.readFile(filepath, function(err, data){
        if (err) {
            sendErrorPage(res);
            return;
        }
        res.writeHead(200, {'Cotent-Type': 'text/html'});
        res.write(data);
        return res.end();
    });    
}

function serveRequests(req, res) {    
    let responseFilePath = `.${req.url}`;
    const filePaths = ['./about', './index', './contact-me', './404'];
    if (filePaths.indexOf(responseFilePath) >= 0) {
        responseFilePath = responseFilePath + '.html';
    }
    if (responseFilePath === './') {
        sendPage('./index.html', res);
    } else {
        sendPage(responseFilePath, res);
    }
}

http.createServer(serveRequests).listen(8080);
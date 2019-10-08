var http = require('http');
var mockserver = require('mockserver');
 
http.createServer(mockserver(__dirname+'/mocks')).listen(8000);
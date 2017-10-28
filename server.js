var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/'));
app.listen(5050, function () { console.log('listening to 5050') });
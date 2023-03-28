var fs = require('fs');
var http = require('http');
var https = require('https');

var express = require('express')
const bodyParser = require("body-parser");
const route = require('./src/controller/translation/route')
const cors = require("cors");
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;



const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./doc/swagger.json');
const port = 8080
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        // Create a worker
        cluster.fork();
    }
} else {
    // Workers share the TCP connection in this server
    var app = express();
   
    app.use(cors());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/static', express.static('/home/node-stream/Litralee_translation'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());

    route(app)
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}


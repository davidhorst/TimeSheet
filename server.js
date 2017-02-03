const express = require('express');
const path    = require( 'path' );
const root    = __dirname;
const port    = 3000;
const app     = express();
var bodyParser = require('body-parser');
// const http = require('http');
// var request = require('request');
// const server = http.createServer(app);

// Static Files
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use( express.static( path.join( root, 'node_modules' )));


// Config
app.use(bodyParser.json()); 
require( './server/config/mongoose.js');
require( './server/config/routes.js')(app);


// Start Server
app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});

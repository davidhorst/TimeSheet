console.log('mongo connection, mongoose setup');

var mongoose      = require('mongoose'),
    fs            = require('fs'),
    path          = require('path'),
    models_path   = path.join( __dirname, "../models"),
    reg           = new RegExp( ".js$", "i" ),
    dbURI         = 'mongodb://10.1.10.104/timeSheet';


mongoose.connect( dbURI );

mongoose.connection.on( 'connected', function () {
  console.log( `Mongoose default connection open to ${ dbURI }` );
});

mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});

mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});

process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});

fs.readdirSync( models_path ).forEach( function( file ) {
  if( reg.test( file ) ) {
    console.log('require: ', models_path, file);
    require( path.join( models_path, file ) );
  }
});
var util = require( 'util' );

var fst = require( './lib/fst' );
var serializer = require( './index' );

var mySerializer = serializer({});

fst.readFile( './examples.js' ).then( function ( src ) {

    var result = mySerializer( src );

    console.log( util.inspect( result, { depth: 5, colors: true } ) );
})
.catch( function ( err ) {

    console.log(err);
});
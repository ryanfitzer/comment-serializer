var fs = require( 'fs' );

module.exports.readFile = function readFile( file ) {

    return new Promise( function( resolve, reject ) {

        fs.readFile( file, 'utf8', function( err, data ) {

            if ( err ) return reject( err );

            return resolve( data );
        });
    });
}
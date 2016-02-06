var util = require( 'util' );

var template = require( './example-template-string' );

module.exports = factory;
function factory( options ) {

    return template( options );
}
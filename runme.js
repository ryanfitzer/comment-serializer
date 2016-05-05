var util = require( 'util' );
var serializer = require( './index' );

// Template string for generating some sample source code with comments
var templateComments = require( './test/lib/tagged-source-string' );

// Configure comment delimiters
var tokens = {
    'commentBegin': '/**',
    'commentLinePrefix': '*',
    'commentEnd': '*/',
    'tagPrefix': '@'
};

// Create our sample from the template string
var src = templateComments( tokens );

// Intialize a serializer instance with some options
var mySerializer = serializer({
    tokens: tokens,
    parsers: serializer.parsers()
});

var result = mySerializer( src );

var hasErrors = result.some( function ( comment ) {

    return comment.tags.some( function ( tag ) {
        return tag.error;
    });
});

// Log the results real pretty like
console.log( util.inspect( result, { depth: 10, colors: true } ) );

if ( hasErrors ) {

    console.log( '\nErrors were found in one or more tags!' );
}
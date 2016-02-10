var util = require( 'util' );
var assert = require( 'assert' );

var serializer = require( './index' );
var templateOutput = require( './test/lib/example-output' );
var templateComments = require( './test/lib/tagged-source-string' );

var tokens = {
    'commentBegin': '/**',
    'commentLinePrefix': '*',
    'commentEnd': '*/',
    'tagPrefix': '@'
};

// var parsers = serializer.parsers();
// var parsers = serializer.parsers({
//     'example': function( value ) {
//
//         var match = value.match( /([^\n]*)\n((?:.|\n)*)/ );
//
//         var result = {
//             exampleTest: value,
//             descriptionTest: ''
//         };
//
//         if ( match ) {
//
//             result.exampleOne = match[2];
//             result.descriptionOne = match[1];
//         }
//
//         return result;
//     }
// });

var expected = templateOutput( tokens );
var mySerializer = serializer({
    tokens: tokens
    , parsers: serializer.parsers()
});
var src = templateComments( tokens );
var actual = mySerializer( src );
var hasErrors = actual.some( function ( comment ) {

    return comment.tags.some( function ( tag ) {
        return tag.error;
    });
});

if ( hasErrors ) console.log( 'Errors!' );
else console.log( util.inspect( actual, { depth: 10, colors: true } ) );

// assert.deepEqual( expected, actual );



var util = require( 'util' );
var assert = require( 'assert' );

var fsp = require( './lib/fsp' );
var serializer = require( './index' );
var fixture = require( './test/lib/example-output' );

var test = require( './test/lib/tagged-source-string' );

var tokens = {
    'commentBegin': '/**',
    'commentLinePrefix': '*',
    'commentEnd': '*/',
    'tagPrefix': '@'
};

var src = test( tokens );
var mySerializer = serializer({
    tokens: tokens,
    // parsers: serializer.parsers({
    //     'example': function( value ) {
    //
    //         var match = value.match( /([^\n]*)\n((?:.|\n)*)/ );
    //
    //         var result = {
    //             exampleOne: value,
    //             descriptionOne: ''
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
    // })
});

var result = mySerializer( src );

// console.log( util.inspect( src, { depth: 5, colors: true } ) );
// console.log( util.inspect( result, { depth: 5, colors: true } ) );
// console.log( util.inspect( fixture, { depth: 5, colors: true } ) );
assert.deepEqual( fixture, result );



// fsp.readFile( './runme-examples.js' ).then( function ( src ) {
//
//     var comments = mySerializer( src );
//     var hasErrors = comments.some( function ( comment ) {
//
//         return comment.tags.some( function ( tag ) {
//             return tag.error;
//         });
//     });
//
//     // console.log( util.inspect( comments, { depth: 5, colors: true } ) );
//
//     if ( hasErrors ) console.log( 'Errors!' );
// })
// .catch( function ( err ) {
//
//     console.log(err);
// });
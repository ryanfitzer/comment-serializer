var util = require( 'util' );

var fst = require( './lib/fst' );
var serializer = require( './index' );

fst.readFile( './examples.js' ).then( function ( src ) {

    var comments = serializer( src, {
        tokens: {},
        parsers: serializer.parsers
    });
    var hasErrors = comments.some( function ( comment ) {

        return comment.tags.some( function ( tag ) {
            return tag.error;
        });
    });

    console.log( util.inspect( comments, { depth: 5, colors: true } ) );

    if ( hasErrors ) console.log( 'Errors!' );

})
.catch( function ( err ) {

    console.log(err);
});
var util = require( 'util' );

var fst = require( './lib/fst' );
var serializer = require( './index' );

var mySerializer = serializer({
    tokens: {
        // commentBegin: '/**dude',
        // commentLinePrefix: '*sweet',
    },
    parsers: serializer.parsers({
        'example': function( value ) {

            var match = value.match( /([^\n]*)\n((?:.|\n)*)/ );

            var result = {
                exampleOne: value,
                descriptionOne: ''
            };

            if ( match ) {

                result.exampleOne = match[2];
                result.descriptionOne = match[1];
            }

            return result;
        }
    })
});

fst.readFile( './examples.js' ).then( function ( src ) {

    var comments = mySerializer( src );
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
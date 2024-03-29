var assert = require( 'assert' );

var serializer = require( '../src/index' );
var templateComments = require( './lib/tagged-source-string' );
var templateExpected = require( './lib/example-output' );


describe( 'Custom Tokens', function () {

    [
        [ '/**docs',    '*Line',    '**/',      '^' ],
        [ '/**',        '\s',        '*/',      '@' ],
        [ '/*',         '**',       '*/',       '@' ],
        [ '/*!',        '*',        '*/',       '@' ],
        [ '//!',        '//',        '///',     '@' ],
        [
            '/********************************************//**',
            '*',
            '***********************************************/',
            '@'
        ]

    ].forEach( function ( tokens ) {

        it( `should replace the default tokens with: ${ tokens.join( ', ' ) }`, function () {

            var options = {
                'commentBegin': tokens[0],
                'commentLinePrefix': tokens[1],
                'commentEnd': tokens[2],
                'tagPrefix': tokens[3]
            };

            var source = templateComments( options );
            var expected = templateExpected( options );
            var actual = serializer({
                tokens: options
            })( source );

            assert.deepEqual( actual, expected );
        });

    });
});

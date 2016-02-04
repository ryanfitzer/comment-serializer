/*eslint global-require: 0*/

var util = require( 'util' );
var path = require( 'path' );
var assert = require( 'assert' );
var readFile = require( '../lib/fst' ).readFile;
var srlzr = require( '../index' );

describe( 'Custom Tokens', function() {

    var comment = readFile( path.resolve( __dirname, 'fixtures/custom-tokens.txt' ) );
    var serialize = srlzr({
        tokens: {
            'commentBegin': '/**documentation',
            'commentEnd': '**/',
            'commentLinePrefix': '*Line',
            'tagPrefix': '^'
        }
    });

    before( function () {

        return comment.then( function ( text ) {
            comment = text;
        });
    });

    it( 'should replace the default tokens', function () {

        var expected = require( './fixtures/custom-tokens-expected' );
        var actual = serialize( comment );

        assert.deepEqual( expected, actual );
    });
});
/*eslint global-require: 0*/

var util = require( 'util' );
var path = require( 'path' );
var assert = require( 'assert' );  /* https://nodejs.org/api/assert.html */

var fsp = require( '../lib/fsp' );
var serializer = require( '../index' );
var template = require( '../lib/tagged-template-string' );

var tmplComment = template`
    ${0}
     ${1}
     ${1} This is a documentation block.
     ${1}
     ${1} ${3}title DocBlock
     ${1} ${3}example The description of the example
     ${1}  <div class="flash-block">
     ${1}      <div class="flash-block-content">
     ${1}          Success Message
     ${1}      </div>
     ${1}  </div>
     ${2}
    var one = 'one';

    ${0}
     ${1} This is documentation block with no tags.
     ${2}
    var two = 'two';

    /*
     * This is just a standard comment block.
     */
    var three = 'three';
`;

describe( 'Custom Tokens', function() {

    var tokenVariations = [
        [ '/**',        '*',        '*/',   '@' ],
        [ '/**docs',    '*Line',    '**/',  '^' ]
    ];

    tokenVariations.forEach( function ( tokens ) {

        it( `should replace the default tokens with: ${ tokens.join( ', ' ) }`, function () {

            var source = tmplComment.apply( tmplComment, tokens );
            var result = serializer({
                tokens: {
                    'commentBegin': tokens[0],
                    'commentLinePrefix': tokens[1],
                    'commentEnd': tokens[2],
                    'tagPrefix': tokens[3]
                }
            })( source );

            // assert.deepEqual( expected, actual );
        });

    });
});

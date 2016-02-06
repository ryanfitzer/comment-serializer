/**
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings#Tagged_template_strings
 */
module.exports = compile;
function compile( strings ) {

    var slice = Array.prototype.slice;
    var dataKeys = slice.call( arguments, 1 );

    function template( data ) {

        return strings.map( function( string, index ) {

            var value = data[ dataKeys[ index ] ] || '';

            return `${ string }${ value }`;

        }).join( '' );
    }

    // Enable the function to be immediately invoked
    return ( template );
}

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings#Tagged_template_strings
 */
module.exports = function template( strings ) {

    var slice = Array.prototype.slice;
    var keys = slice.call( arguments, 1 );

    return ( function() {

        var values = slice.call( arguments );
        var dict = values[ values.length - 1 ] || {};
        var result = [ strings[0] ];

        keys.forEach( function( key, i ) {

            var value = Number.isInteger( key ) ? values[ key ] : dict[ key ];

            result.push( value, strings[ i + 1 ] );
        });

        return result.join( '' );
    });
}
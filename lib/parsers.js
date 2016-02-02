var util = require( 'util' );

var parsers = {

    'modifier': function ( value ) {

        var selector = value.match( /^(-|\.)?[_a-zA-Z]+[_a-zA-Z0-9-]*[^\s]/ );

        if ( !selector ) {
            throw new Error( 'No modifier could be matched' );
        }

        return {
            modifier: value,
            description: value.replace( selector[0], '' ).trim()
        };
    },

    'example': function( value ) {

        var match = value.match( /([^\n]*)\n((?:.|\n)*)/ );

        var result = {
            example: value,
            description: ''
        };

        if ( match ) {

            result.example = match[2];
            result.description = match[1];
        }

        return result;
    }
};

module.exports = factory;
function factory( options ) {

    options = options || {};

    return Object.assign( {}, parsers, options );
}

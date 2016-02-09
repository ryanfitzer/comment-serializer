var util = require( 'util' );

var parsers = {

    /**
     * Match element state pseudo-classes.
     *
     * @example :hover
     */
    'state': function( value ) {

        var match = value.match( /(^:[-_a-zA-Z]+)(.*)/ );

        if ( !match ) {
            throw new Error( 'No state pseudo-class could be matched' );
        }

        return {
            state: match[ 1 ].trim(),
            description: match[ 2 ].trim()
        };
    },

    /**
     * Match element modifier classes.
     *
     * @example .some-class
     * @example .-some-class
     * @example ._some_class
     */
    'modifier': function( value ) {

        var match = value.match( /^(\.?-?[_a-zA-Z]+[_a-zA-Z0-9-]*)(.*)/ );

        if ( !match ) {
            throw new Error( 'No modifier class could be matched' );
        }

        return {
            modifier: match[ 1 ].trim(),
            description: match[ 2 ].trim()
        };
    },

    /**
     * Match an example with optional description.
     *
     * @example <div class="some-example"><p>Hello, World!</p></div>
     *
     * @example
     *   <div class="some-example">
     *     <p>Hello, World!</p>
     *   </div>
     *
     * @example This is an optional description
     *   <div class="some-example">
     *     <p>Hello, World!</p>
     *   </div>
     */
    'example': function( value ) {

        var match = value.match( /([^\n]*)\n((?:.|\n)*)/ );

        var result = {
            example: value,
            description: ''
        };

        if ( match ) {

            result.example = match[ 2 ].trim();
            result.description = match[ 1 ].trim();
        }

        return result;
    }
};

module.exports = factory;
function factory( options ) {

    options = options || {};

    return Object.assign( {}, parsers, options );
}

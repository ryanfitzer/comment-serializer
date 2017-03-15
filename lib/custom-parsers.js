var util = require( 'util' );

var parsers = {

    /**
     * Match element state pseudo-classes.
     *
     * @state :hover This is a description
     */
    'state': function( value ) {

        var match = value.match( /(^:[-_a-zA-Z]+)(.*)/ );

        if ( !match ) {
            throw new Error( 'No state pseudo-class could be matched' );
        }

        return [
            {
                type: 'state',
                value: match[ 1 ].trim()
            },
            {
                type: 'description',
                value: match[ 2 ].trim()
            }
        ];
    },

    /**
     * Match element modifier classes.
     *
     * @modifier .some-class This is a description
     * @modifier .-some-class This is a description
     * @modifier ._some_class This is a description
     */
    'modifier': function( value ) {

        var match = value.match( /^(\.?-?[_a-zA-Z]+[_a-zA-Z0-9-]*)(.*)/ );

        if ( !match ) {
            throw new Error( 'No modifier class could be matched' );
        }

        return [
            {
                type: 'modifier',
                value: match[ 1 ].trim()
            },
            {
                type: 'description',
                value: match[ 2 ].trim()
            }
        ];
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

        var example = {
            type: 'example',
            value: value
        }

        var description = {
            type: 'description',
            value: ''
        }

        if ( match ) {

            example.value = match[ 2 ].trim();
            description.value = match[ 1 ].trim();
        }

        return [
            example,
            description
        ];
    },

    /**
     * Parse a list of tags into an array.
     *
     * @tags
     *  - tag-1
     *  - tag-2
     *  - tag-3
     *
     * @tags
     *  * tag-1
     *  * tag-2
     *  * tag-3
     */
    'tags': function( value ) {

        var match = value.match( /\s*[-*]\s+[\w-_]*/g );

        if ( !match ) {
            throw new Error( 'No tags could be matched' );
        }

        return [
            {
                type: 'tags',
                value: match.map( function ( tag ) {
                    return tag.trim().replace( /[-*]\s/, '' );
                })
            }
        ];
    }
};

module.exports = factory;
function factory( options ) {

    options = options || {};

    return Object.assign( {}, parsers, options );
}

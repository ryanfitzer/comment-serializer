var util = require( 'util' );
var path = require( 'path' );

var patterns = {
    begin: '/**',
    body: '*',
    end: '*/',
    preface: /.*@(.+)\s/,
    tagBlock: /(@[^@]*)/g,
    tagName: /@\w+/
};

function init( src, options ) {

    var exploded = explodeComments( src );

    return exploded.reduce( function( collection, section ) {

        collection.push( serialize( section ) );

        return collection;
    }, [] );
}

/**
 *
 */
function explodeComments( comments ) {

    var sections = comments.split( patterns.begin );

    return sections.reduce( function ( collection, section, index ) {

        if ( section ) {

            section = section.split( patterns.end ).map( function ( block ) {

                return block.split( '\n' ).map( function ( line, index ) {

                    return line.replace( patterns.body, '' );

                }).join( '\n' );
            });

            collection.push( section );
        }

        return collection;

    }, [] );
}

/**
 *
 */
function serialize( section ) {

    var source = section[0]
        , context = section[1]
        , preface = source.split( patterns.preface )[0]
        , tags = source.replace( preface, '' ).match( patterns.tagBlock )
        ;

    tags = tags.map( function ( block ) {

        var trimmed = block.trim();

        return {
            tag: trimmed.match( patterns.tagName )[0],
            line: 'TODO',
            source: trimmed
        };
    });

    return {
        line: 'TODO',
        preface: preface,
        source: source,
        context: context,
        tags: parseTags( tags )

    };
    /*
        [
            {
                line: 0, // The line number the comment starts on
                preface: '', // Any text found before start of first @tag
                source: '', // Full source of the comment
                context: '', // All code found between end of comment and start of next comment, or EOF
                tags: [
                    {
                        tag: '', // The name of the tag
                        line: 3, // The line number the tag starts on
                        source: '' // Full source of the tag
                        // Any other props are via custom parsers
                    },
                    {
                        // ...
                    }
                ]
            }
        ]
    */
}

/**
 *
 */
function parseTags( tags ) {

    return tags;
}

module.exports = function ( options ) {

    return function ( src ) {

        return init( src, options );
    };
}

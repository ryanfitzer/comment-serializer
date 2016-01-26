var util = require( 'util' );
var path = require( 'path' );


var rLeadSpaces = /^\s*/;
var patterns = {
    begin: '/**',
    body: '*',
    end: '*/',
    preface: /.*@(.+)\s/,
    tagBlock: /(@[^@]*)/g,
    tagName: /@\w+/
};

function init( src ) {

    var exploded = explodeComments( src );

    return exploded.reduce( function( collection, section ) {

        collection.push( serialize( section.shift(), section ) );

        return collection;
    }, [] );
}

/**
 *
 */
function explodeComments( comments ) {

    var sections = comments.split( patterns.begin );
    var startLine = sections.shift();
    var startLineNumber = startLine.split( '\n' ).length;

    return sections.reduce( function ( collection, section, index ) {

        var nextLine = startLineNumber;

        if ( section ) {

            nextLine = startLineNumber + section.split( '\n' ).length;

            section = section.split( patterns.end ).map( function ( block ) {

                block = block.split( '\n' ).map( function ( line, index ) {

                    return line.replace( rLeadSpaces, '' )
                        .replace( patterns.body, '' )
                        .replace( /^\s/, '' );

                }).join( '\n' );

                return block;
            });

            section.unshift( startLineNumber );
            startLineNumber = nextLine - 1;

            collection.push( section );
        }

        return collection;

    }, [] );
}

/**
 *
 */
function serialize( lineNumber, section ) {

    var source = section[0]
        , context = section[1]
        , preface = source.split( patterns.preface )[0].trim()
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
        line: lineNumber,
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

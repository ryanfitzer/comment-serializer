var util = require( 'util' );
var parserFactory = require( './lib/parsers' );

module.exports = factory;
module.exports.parsers = parserFactory;

function factory( config ) {

    var options = config || {};

    var patterns = Object.assign({
        commentBegin: '/**',
        commentEnd: '*/',
        commentLinePrefix: '*',
        tagPrefix: '@'
    }, options.tokens );

    // Example: https://github.com/VerbalExpressions/JSVerbalExpressions/blob/master/VerbalExpressions.js#L63
    var safeTagBlock = patterns.tagPrefix.replace( /([\].|*?+(){}^$\\:=[])/g, '\\$&' );

    var rLeadSpaces = /^\s*/;
    var rCommentPreface = new RegExp( `.*${safeTagBlock}(.+)\\s` );
    var rTagName = new RegExp( `${safeTagBlock}\\w+` );
    var rTagBlock = new RegExp( `(${safeTagBlock}[^${safeTagBlock}]*)`, 'g' );
    var parsers = options.parsers || {};


    /**
     *
     */
    function explodeComments( comments ) {

        var sections = comments.split( patterns.commentBegin );
        var startLine = sections.shift();
        // Add an extra line to make up for the commentBegin line that get removed during split
        var startLineNumber = getLinesLength( startLine ) + 1;

        return sections.reduce( function ( collection, section ) {

            var splitSection
                , nextLine = startLineNumber
                ;

            if ( section ) {

                splitSection = section.split( patterns.commentEnd );
                nextLine = startLineNumber + section.split( '\n' ).length;

                // Since multiple `commentEnd` tokens could be present in
                // a section, we need to manually split section into two parts
                section = [
                    splitSection[0],
                    splitSection.slice( 1 ).join( patterns.commentEnd )
                ];

                section = section.map( function ( block ) {

                    block = block.split( '\n' ).map( function ( line ) {

                        return line.replace( rLeadSpaces, '' )
                            .replace( patterns.commentLinePrefix, '' )
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

        var output
            , source = section[0]
            , context = section[1].trim()
            , preface = source.split( rCommentPreface )[0].trim()
            , tags = source.replace( preface, '' ).match( rTagBlock ) || []
            ;

        var startingIndex = lineNumber + getLinesLength( source.split( rCommentPreface )[0] );

        tags = tags.map( function ( block ) {

            var trimmed = block.trim()
                , tag = trimmed.match( rTagName )[0]
                ;

            var result = {
                tag: tag.replace( patterns.tagPrefix, '' ),
                value: trimmed.replace( tag, '' ).trim(),
                line: startingIndex,
                source: trimmed
            };

            startingIndex = startingIndex + getLinesLength( block );

            return result;
        });

        output = {
            line: lineNumber,
            preface: preface,
            source: source,
            context: context,
            tags: parseTags( tags )
        };

        return output;
    }

    /**
     *
     */
    function parseTags( tags ) {

        return tags.map( function ( tag ) {

            var parser = parsers[ tag.tag ];

            if ( parser ) {

                try {

                    tag = Object.assign( tag, parser( tag.value ) );
                }
                catch ( err ) {

                    tag.error = err;
                }
            }

            return tag;
        });
    }

    /**
     *
     */
    function getLinesLength( text ) {

        // Remove trailing new line beforehand
        return text.replace( /\n$/m, '' ).split( '\n' ).length;
    }

    /**
     *
     */
    return function ( src ) {

        var sections = explodeComments( src );

        return sections.reduce( function( collection, section ) {

            collection.push( serialize( section.shift(), section ) );

            return collection;
        }, [] );
    }
}
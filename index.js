var util = require( 'util' );
var tagParsers = require( './lib/parsers' );

module.exports = factory;
module.exports.parsers = tagParsers;

function factory( config ) {

    var options = config || {};

    var patterns = Object.assign({
        commentBegin: '/**',
        commentEnd: '*/',
        commentLinePrefix: '*',
        tagPrefix: '@'
    }, options.tokens );

    // Example: https://github.com/VerbalExpressions/JSVerbalExpressions/blob/master/VerbalExpressions.js#L63
    var rCharacterClasses = /([\].|*?+(){}^$\\:=[])/g;

    // Last match, URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
    var lastMatch = '\\$&';

    var safeTagPrefix = patterns.tagPrefix.replace( rCharacterClasses, lastMatch );
    var safeCommentLinePrefix = patterns.commentLinePrefix.replace( rCharacterClasses, lastMatch );

    var rLeadSpaces = /^[^\S\n]*/;
    var rCommentPreface = new RegExp( `.*${safeTagPrefix}(.+)\\s` );
    var rCommentLinePrefix = new RegExp( `^(\\s)*${safeCommentLinePrefix}\\s?` );
    var rTagName = new RegExp( `^${safeTagPrefix}([\\w-])+` );
    var parsers = options.parsers || {};

    /**
     * Splits a string into an array of sections.
     * The array has 3 parts:
     *  - starting line number
     *  - comment block stripped of `commentBegin`, `commentEnd` and
     *    `commentLinePrefix` tokens, including leading spaces between
     *    the `commentLinePrefix` and the `tagPrefix` tokens.
     *  - all source between the `commentEnd` token and next `commentBegin` token.
     *
     * @param sourceStr {String} The source to parse.
     * @return {Array}
     */
    function explodeSections( sourceStr ) {

        var sections = sourceStr.split( patterns.commentBegin );
        var startLine = sections.shift();

        // Add an extra line to make up for the commentBegin line that get removed during split
        var startLineNumber = getLinesLength( startLine ) + 1;

        return sections.reduce( function( collection, section ) {

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

                section = section.map( function( block ) {

                    block = block.split( '\n' ).map( function( line ) {

                        return line.replace( rCommentLinePrefix, '' );

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
     * Serialize a section into its various parts.
     *  - line
     *  - preface
     *  - tags
     *  - context
     *  - source
     *
     * @param lineNumber {Number} The comment's starting line number.
     * @param section {String} The comment and its contextual source.
     * @return {Object}
     */
    function serializeBlock( lineNumber, section ) {

        var source = section[0]
            , context = section[1].trim()
            , preface = source.split( rCommentPreface )[0].trim()
            , tags = source.replace( preface, '' ).trim()
            , startingIndex = lineNumber + getLinesLength( source.split( rCommentPreface )[0] )
            ;

        return {
            line: lineNumber,
            preface: preface,
            tags: serializeTags( startingIndex, tags ),
            context: context,
            source: source
        };
    }

    /**
     * Takes a tags block and serializes it into individual tag objects.
     *
     * @param lineNumber {Number} The tags block starting line number.
     * @param tags {String} The tags block.
     * @return {Array}
     */
    function serializeTags( lineNumber, tags ) {

        return tags.split( /\n/ )
        .reduce( function ( acc, line, index ) {

            if ( !index || rTagName.test( line ) ) {
                acc.push( `${line}\n` );
            }
            else {
                acc[ acc.length - 1 ] += `${line}\n`;
            }

            return acc;

        }, [] )
        .map( function( block ) {

            var trimmed = block.trim()
                // , tag = trimmed.match( rTagName )[0]
                , tag = block.match( rTagName )[0]
                ;

            var result = {
                line: lineNumber,
                tag: tag.replace( patterns.tagPrefix, '' ),
                value: trimmed.replace( tag, '' ).replace( rLeadSpaces, '' ),
                valueParsed: [],
                source: trimmed
            };

            lineNumber = lineNumber + getLinesLength( block );

            return result;
        })
        .map( function( tag ) {

            var parser = parsers[ tag.tag ];

            if ( parser ) {

                try {

                    // Tag = Object.assign( tag, parser( tag.value ) );
                    tag.valueParsed = parser( tag.value );
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
    return function( src ) {

        var sections = explodeSections( src );

        return sections.reduce( function( collection, section ) {

            collection.push( serializeBlock( section.shift(), section ) );

            return collection;
        }, [] );
    };
}
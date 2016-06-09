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
    var safeCommentBegin = patterns.commentBegin.replace( rCharacterClasses, lastMatch );
    var safeCommentLinePrefix = patterns.commentLinePrefix.replace( rCharacterClasses, lastMatch );
    var safeCommentEnd = patterns.commentEnd.replace( rCharacterClasses, lastMatch );

    var rLeadSpaces = /^[^\S\n]*/;
    // var rTestCommentBegin = new RegExp( `${safeCommentBegin}\\s*\\n\\s*${safeCommentLinePrefix}` );
    var rCommentPreface = new RegExp( `.*${safeTagPrefix}(.+)\\s` );
    // var rCommentLinePrefix = new RegExp( `^(\\s)*${safeCommentLinePrefix}\\s?` );
    var rCommentLinePrefix = new RegExp( `^(\\s)*${safeCommentLinePrefix}` );
    var rCommentLinePrefixGM = new RegExp( `^\\s*${safeCommentLinePrefix}`, 'gm' );
    var rTagName = new RegExp( `^${safeTagPrefix}([\\w-])+` );
    var rComment = new RegExp( `(${safeCommentBegin}\\s*\\n\\s*${safeCommentLinePrefix}(?:.|\\n)*?${safeCommentEnd}\\s*\\n?)` );
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
    /*
    function explodeSections( sourceStr ) {

        var sections = sourceStr.split( rTestCommentBegin )

        // Add an extra line to make up for the `commentBegin` line that gets removed during split
        var startLineNumber = getLinesLength( sections.shift() ) + 1;

        return sections.reduce( function( collection, section ) {

            var splitSection = section.split( patterns.commentEnd );
            var nextLine = startLineNumber + section.split( '\n' ).length;

            // Since multiple `commentEnd` tokens could be present in
            // a section, we need to manually split section into two parts
            section = [
                splitSection[ 0 ],
                splitSection.slice( 1 ).join( patterns.commentEnd )
            ];

            section = section.map( function( block, sectionIndex ) {

                block = block.split( '\n' ).map( function( line ) {

                    // Only strip `rCommentLinePrefix` if it's part of the comment block section
                    if ( !sectionIndex ) {
                        return line.replace( rCommentLinePrefix, '' );
                    }

                    return line;

                }).join( '\n' );

                return block;
            });

            section.unshift( startLineNumber );
            startLineNumber = nextLine;

            collection.push( section );

            return collection;

        }, [] );
    }
    */
    function explodeSections( sourceStr ) {

        var sections = sourceStr.split( rComment );
        var prevSectionLineLength = getLinesLength( sections.shift() );

        return sections.reduce( function ( accum, section, index ) {

            // Group each comment with its context
            if ( index % 2 ) {

                accum[ accum.length - 1 ].context = section;
            }
            else {
                accum.push({
                    line: prevSectionLineLength + 1,
                    source: section.trim(),
                });
            }

            prevSectionLineLength += getLinesLength( section );

            return accum;
        }, [] );

        /*
        return sections.reduce( function( collection, section ) {

            var splitSection = section.split( patterns.commentEnd );
            var nextLine = startLineNumber + section.split( '\n' ).length;

            // Since multiple `commentEnd` tokens could be present in
            // a section, we need to manually split section into two parts
            section = [
                splitSection[ 0 ],
                splitSection.slice( 1 ).join( patterns.commentEnd )
            ];

            section = section.map( function( block, sectionIndex ) {

                block = block.split( '\n' ).map( function( line ) {

                    // Only strip `rCommentLinePrefix` if it's part of the comment block section
                    if ( !sectionIndex ) {
                        return line.replace( rCommentLinePrefix, '' );
                    }

                    return line;

                }).join( '\n' );

                return block;
            });

            section.unshift( startLineNumber );
            startLineNumber = nextLine;

            collection.push( section );

            return collection;

        }, [] );
        */


    }
    
    
    function stripAndSerializeComment( lineNumber, sourceStr ) {

        // Strip comment delimiter tokens
        var stripped = sourceStr
        .replace( patterns.commentBegin, '' )
        .replace( patterns.commentEnd, '' )
        .split( '\n' )
        .map( line => line.replace( rCommentLinePrefix, '' ) );
        
        // Determine the number of preceeding spaces to strip
        var prefixSpaces = stripped.reduce( function( accum, line ) {

            if ( !accum.length && line.match( /\s*\S|\n/ ) ) {
                accum = line.match( /\s*/ )[0];
            }

            return accum;
        });

        // Strip preceeding spaces
        stripped = stripped.map( line => line.replace( prefixSpaces, '' ) );
        
        // Get line number for first tag
        var firstTagLineNumber = stripped.reduce( function ( accum, line, index ) {

            if ( isNaN( accum ) && line.match( rTagName ) ) {
                accum = index;
            }

            return accum;

        }, undefined );
        
        var comment = stripped.join( '\n' ).trim();
        var tags = stripped.splice( firstTagLineNumber ).join( '\n' );
        var preface = stripped.join( '\n' ).trim();

        return {
            comment: comment, 
            preface: preface,
            tags: serializeTags( lineNumber + firstTagLineNumber, tags )
        }
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
    /*
    function serializeBlock( section ) {

        var lineNumber = section[ 0 ]
            , source = section[ 1 ]
            , context = section[ 2 ].trim()
            , preface = source.split( rCommentPreface )[ 0 ].trim()
            , tags = source.replace( preface, '' ).trim()
            , startingIndex = lineNumber + getLinesLength( source.split( rCommentPreface )[ 0 ] ) + 1
            ;

        return {
            line: lineNumber,
            preface: preface,
            tags: serializeTags( startingIndex, tags ),
            context: context,
            source: source
        };
    }
    */

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

        var matches = text.match( /\n/g );

        return matches ? matches.length : 0;
    }

    /**
     *
     */
    return function( src ) {

        return explodeSections( src ).map( function ( section ) {
            
            var result = stripAndSerializeComment( section.line, section.source );
            
            section.comment = result.comment;
            section.preface = result.preface;
            section.tags = result.tags;
            
            console.log( util.inspect( section, { depth: 5, colors: true } ) );
            return section;
        });

        // return sections.reduce( function( collection, section ) {
        //
        //     collection.push( serializeBlock( section ) );
        //
        //     return collection;
        // }, [] );
    };
}
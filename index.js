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
    var rComment = new RegExp( `(${safeCommentBegin}\\s*\\n\\s*${safeCommentLinePrefix}(?:.|\\n)*?${safeCommentEnd}\\s*\\n?)` );
    var rCommentLinePrefix = new RegExp( `^(\\s)*${safeCommentLinePrefix}` );
    var rTagName = new RegExp( `^${safeTagPrefix}([\\w-])+` );
    var parsers = options.parsers || {};

    /**
     * Splits a string into array of sections. Each section 3 properties:
     *
     *  - line: starting line number
     *  - source: the comment source
     *  - context: source between the `commentEnd` token and next `commentBegin` token (or EOF).
     *
     * @param {String} sourceStr The source to parse.
     * @returns {Array}
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
                    source: section.trim()
                });
            }

            prevSectionLineLength += getLinesLength( section );

            return accum;

        }, [] );
    }

    /**
     * Strip and serialize a comment into its various parts.
     *
     *  - comment: the comment block stripped delimiters and leading spaces.
     *  - preface
     *  - tags
     *
     * @param {Number} lineNumber The comment's starting line number.
     * @param {String} sourceStr The comment's source.
     * @returns {Object}
     */
    function stripAndSerializeComment( lineNumber, sourceStr ) {

        // Strip comment delimiter tokens
        var stripped = sourceStr
        .replace( patterns.commentBegin, '' )
        .replace( patterns.commentEnd, '' )
        .split( '\n' )
        .map( line => line.replace( rCommentLinePrefix, '' ) );

        // Determine the number of leading spaces to strip
        var prefixSpaces = stripped.reduce( function ( accum, line ) {

            if ( !accum.length && line.match( /\s*\S|\n/ ) ) {
                accum = line.match( /\s*/ )[0];
            }

            return accum;
        });

        // Strip leading spaces
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
        };
    }

    /**
     * Takes a tags block and serializes it into individual tag objects.
     *
     * @param {Number} lineNumber The tags block starting line number.
     * @param{String}  tags The tags block.
     * @returns {Array}
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
        .map( function ( block ) {

            var trimmed = block.trim()
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
        .map( function ( tag ) {

            var parser = parsers[ tag.tag ];

            if ( parser ) {

                try {

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
     * Get the number of newlines in a block of text.
     *
     * @param {String} text Text to use.
     * @returns {Number}
     */
    function getLinesLength( text ) {

        var matches = text.match( /\n/g );

        return matches ? matches.length : 0;
    }

    return function ( src ) {

        return explodeSections( src ).map( function ( section ) {

            var result = stripAndSerializeComment( section.line, section.source );

            section.comment = result.comment;
            section.preface = result.preface;
            section.tags = result.tags;

            // console.log( util.inspect( section, { depth: 5, colors: true } ) );
            return section;
        });
    };
}
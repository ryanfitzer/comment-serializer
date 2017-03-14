const tagParsers = require( './lib/parsers' );

module.exports = factory;
module.exports.parsers = tagParsers;

function factory( config ) {

    const options = config || {};

    const patterns = Object.assign({
        commentBegin: '/**',
        commentEnd: '*/',
        commentLinePrefix: '*',
        tagPrefix: '@'
    }, options.tokens );

    // Example: https://github.com/VerbalExpressions/JSVerbalExpressions/blob/master/VerbalExpressions.js#L63
    const rCharacterClasses = /([\].|*?+(){}^$\\:=[])/g;

    // Last match, URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
    const lastMatch = '\\$&';

    const safeTagPrefix = patterns.tagPrefix.replace( rCharacterClasses, lastMatch );
    const safeCommentBegin = patterns.commentBegin.replace( rCharacterClasses, lastMatch );
    const safeCommentLinePrefix = patterns.commentLinePrefix.replace( rCharacterClasses, lastMatch );
    const safeCommentEnd = patterns.commentEnd.replace( rCharacterClasses, lastMatch );

    const rLeadSpaces = /^[^\S\n]*/;
    const rComment = new RegExp( `(${safeCommentBegin}\\s*\\n\\s*${safeCommentLinePrefix}(?:.|\\n)*?${safeCommentEnd}\\s*\\n?)` );
    const rCommentLinePrefix = new RegExp( `^(\\s)*${safeCommentLinePrefix}` );
    const rTagName = new RegExp( `^${safeTagPrefix}([\\w-])+` );
    const parsers = options.parsers || {};

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

        const sections = sourceStr.split( rComment );
        let prevSectionLineLength = getLinesLength( sections.shift() );

        return sections.reduce( function ( accum, section, index ) {

            // Group each comment with its context
            if ( index % 2 ) {

                accum[ accum.length - 1 ].context = section.trimRight();
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
        let stripped = sourceStr
        .replace( patterns.commentBegin, '' )
        .replace( patterns.commentEnd, '' )
        .split( '\n' )
        .map( line => line.replace( rCommentLinePrefix, '' ) );

        // Determine the number of leading spaces to strip
        const prefixSpaces = stripped.reduce( function ( accum, line ) {

            if ( !accum.length && line.match( /\s*\S|\n/ ) ) {
                accum = line.match( /\s*/ )[0];
            }

            return accum;
        });

        // Strip leading spaces
        stripped = stripped.map( line => line.replace( prefixSpaces, '' ) );

        // Get line number for first tag
        const firstTagLineNumber = stripped.reduce( function ( accum, line, index ) {

            if ( isNaN( accum ) && line.match( rTagName ) ) {
                accum = index;
            }

            return accum;

        }, undefined );

        const comment = stripped.join( '\n' ).trim();
        const tags = stripped.splice( firstTagLineNumber ).join( '\n' );
        const preface = stripped.join( '\n' ).trim();

        return {
            preface,
            content: comment,
            tags: serializeTags( lineNumber + firstTagLineNumber, tags )
        };
    }

    /**
     * Takes a tags block and serializes it into individual tag objects.
     *
     * @param {Number} lineNumber The tags block starting line number.
     * @param {String} tags The tags block.
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

            const trimmed = block.trim();
            const tag = block.match( rTagName )[0];

            const result = {
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

            const parser = parsers[ tag.tag ];

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

        const matches = text.match( /\n/g );

        return matches ? matches.length : 0;
    }

    return function ( src ) {

        return explodeSections( src ).map( function ( section ) {

            const result = stripAndSerializeComment( section.line, section.source );

            section.content = result.content;
            section.preface = result.preface;
            section.tags = result.tags;

            // console.log( util.inspect( section, { depth: 5, colors: true } ) );
            return section;
        });
    };
}
var util = require( 'util' );
var parsers = require( './lib/tag-parsers' );

var patterns = {
    commentBegin: '/**',
    commentEnd: '*/',
    commentLinePrefix: '*',
    tagPrefix: '@'
};

var rLeadSpaces = /^\s*/;
var rCommentPreface = new RegExp( `.*${patterns.tagPrefix}(.+)\\s` );
var rTagName = new RegExp( `${patterns.tagPrefix}\\w+` );
var rTagBlock = new RegExp( `(${patterns.tagPrefix}[^${patterns.tagPrefix}]*)`, 'g' );

module.exports = setup;
module.exports.parsers = parsers;

/**
 *
 */
function setup( src, options ) {

    getPatterns = getPatterns.bind( options );
    getParsers = getParsers.bind( options );

    return init( src );
}

/**
 *
 */
function init( src ) {

    var sections = explodeComments( src );

    return sections.reduce( function( collection, section ) {

        collection.push( serialize( section.shift(), section ) );

        return collection;
    }, [] );
}

/**
 *
 */
function getPatterns() {

    var tokens = Object.assign({
        commentBegin: '/**',
        commentEnd: '*/',
        commentLinePrefix: '*',
        tagPrefix: '@'
    }, this.tokens );

    var regexps = {
        leadSpaces: /^\s*/,
        commentPreface: new RegExp( `.*${tokens.tagPrefix}(.+)\\s` ),
        tagName: new RegExp( `${tokens.tagPrefix}\\w+` ),
        tagBlock: new RegExp( `(${tokens.tagPrefix}[^${tokens.tagPrefix}]*)`, 'g' )
    };

    return Object.assign( tokens, regexps );
}

/**
 *
 */
function getParsers() {

    return this.parsers || {};
}

/**
 *
 */
function explodeComments( comments ) {

    var sections = comments.split( patterns.commentBegin );
    var startLine = sections.shift();
    // Add an extra line to make up for the commentBegin line
    var startLineNumber = getLinesLength( startLine ) + 1;

    return sections.reduce( function ( collection, section ) {

        var nextLine = startLineNumber;

        if ( section ) {

            nextLine = startLineNumber + section.split( '\n' ).length;

            section = section.split( patterns.commentEnd ).map( function ( block ) {

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
        , tags = source.replace( preface, '' ).match( rTagBlock )
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

    // Subtract 1 for last '\n'
    return text.split( '\n' ).length - 1;
}

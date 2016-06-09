var util = require( 'util' );

// Template string for generating some sample source code with comments
var templateComments = require( './test/lib/tagged-source-string' );

var patterns = {
    commentBegin: '//!',
    commentLinePrefix: '///',
    commentEnd: '//',
    tagPrefix: '@'
};

// var patterns = {
//     commentBegin: '/*',
//     commentLinePrefix: '*',
//     commentEnd: '*/',
//     tagPrefix: '@'
// };

/*
1. Explode file into sections
    [
        starting line number
        comment
        context
    ]
*/

var src = templateComments( patterns );

// Example: https://github.com/VerbalExpressions/JSVerbalExpressions/blob/master/VerbalExpressions.js#L63
var rCharacterClasses = /([\].|*?+(){}^$\\:=[])/g;

// Last match, URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
var lastMatch = '\\$&';

var safeCommentBegin = patterns.commentBegin.replace( rCharacterClasses, lastMatch );
var safeCommentLinePrefix = patterns.commentLinePrefix.replace( rCharacterClasses, lastMatch );
var safeCommentEnd = patterns.commentEnd.replace( rCharacterClasses, lastMatch );

var rComment = new RegExp( `(${safeCommentBegin}\\s*\\n\\s*${safeCommentLinePrefix}(?:.|\\n)*?${safeCommentEnd})` );

var test = `
Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor.`.split( /(\n)/ );

console.log( util.inspect( test, { depth: 5, colors: true } ) );
console.log('\n');

console.log( util.inspect( src.split( rComment ), { depth: 5, colors: true } ) );




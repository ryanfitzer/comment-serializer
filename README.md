# Comment Serializer #

[![NPM version](https://badge.fury.io/js/comment-serializer.svg)](https://www.npmjs.com/package/comment-serializer) [![Try on RunKit](https://badge.runkitcdn.com/comment-serializer.svg)](https://runkit.com/npm/comment-serializer)

Comment Serializer parses a source string for documentation comment blocks and returns a serialized object. It is syntax agnostic and can be configured to support most documentation comment styles. 



## Usage ##

```js
const serializer = require( 'comment-serializer' );

const mySerializer = serializer( { /* options */ } );

const source = `
/**
 * This is the general description.
 *
 * @title Button
 *
 * @markup <button class="btn">My Button</button>
 */
.btn {
  color: red;
}`;

const result = mySerializer( source );

```

Try out a [more robust example on RunKit](https://runkit.com/npm/comment-serializer).



## Options ##


### `options.parsers` ###

  - Required: No
  - Type: `Object`

Customize the handling of tags. An object where the tag name is the key and the value is a function. The function receives the tag's value and returns the parsed value.

Here's a simple example:

Source to parse:

```
/**
 * @mySpecialTag This value is special!
 */
```

The custom parser:

```js
const mySerializer = serializer({
  parsers: {
    mySpecialTag: function( value ) {
      return value.toUpperCase();
    }
  }
});
```

Result:

```js
[{
  line: 1,
  source: '/**\n * @mySpecialTag This value is special!\n */',
  context: '',
  content: '@mySpecialTag This value is special!',
  preface: '',
  tags: [{
    line: 2,
    tag: 'mySpecialTag',
    value: 'This value is special!',
    valueParsed: 'THIS VALUE IS SPECIAL!',
    source: '@mySpecialTag This value is special!'
  }]
}]

```

A more advanced example:

```
/**
 * @mySpecialTag
 *  - item-1
 *  - item-2
 *  - item-3
 */
```

```js
const mySerializer = serializer({
  parsers: {
    'mySpecialTag': function( value ) {
    
      const match = value.match( /\s*[-*]\s+[\w-_]*/g );
      
      return [
        {
          type: 'items',
          value: match.map( function ( item ) {
            return item.trim().replace( /[-*]\s/, '' );
          })
        }
      ];
    }
  }
});
```

Result:

```js
[{
  line: 1,
  source: '/**\n * @mySpecialTag\n *  - item-1\n *  - item-2\n *  - item-3\n */',
  context: '',
  content: '@mySpecialTag\n - item-1\n - item-2\n - item-3',
  preface: '',
  tags: [{
    line: 2,
    tag: 'mySpecialTag',
    value: '\n - item-1\n - item-2\n - item-3',
    valueParsed: [{
      type: 'items',
      value: ['item-1', 'item-2', 'item-3']
    }],
    source: '@mySpecialTag\n - item-1\n - item-2\n - item-3'
  }]
}]
```

You can find more examples of custom parsers in [`./lib/custom-parsers.js`](comment-serializer/lib/custom-parsers.js)

### `options.tokens` ###

  - Required: No
  - Type: `Object`

Customize the comment delimiters.


### `options.tokens.commentBegin` ###

  - Required: No
  - Type: `String`
  - Default: `'/**'`

The delimiter marking the beginning of a comment block.


### `options.tokens.commentLinePrefix` ###

  - Required: No
  - Type: `String`
  - Default: `'*'`

The delimiter marking a new line in the body of a comment block.


### `options.tokens.tagPrefix` ###

  - Required: No
  - Type: `String`
  - Default: `'@'`

The delimiter marking the start of a tag in the comment body.


### `options.tokens.commentEnd` ###

  - Required: No
  - Type: `String`
  - Default: `'*/'`

The delimiter marking the end of a comment block.



## Syntax Support ##

Comment delimiters:

```text
/**       <- commentBegin
 *        <- commentLinePrefix
 * @tag   <- tagPrefix (the "@" symbol)
 */       <- commentEnd
 ```

While most documentation comment styles should be supported, there are a few rules around the syntax:

  1. The `commentBegin`, `commentLinePrefix`, `commentEnd` and `tagPrefix` delimiter tokens must be distinct from each other.

  2. Delimiters should not rely on a whitespace character as a delimiter. For example, the following style would not be supported:

  ```text
  /**
    An unsupported style.
    
    @tag
   */
  ```


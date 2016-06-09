# Comment Serializer #

[![NPM version](https://badge.fury.io/js/comment-serializer.svg)](https://www.npmjs.com/package/comment-serializer)

Comment Serializer parses a source string for documentation comments and returns a serialized object. It is syntax agnostic and can be configured to support most documentation comment styles. 



## Usage ##

[TODO]

Run it directly to see a demo that logs the results to the console:

```
$ node runme
```



## Options ##

[TODO]

```js
{
    // These are the default delimiters
    tokens: {
        'commentBegin': '/**',
        'commentLinePrefix': '*',
        'commentEnd': '*/',
        'tagPrefix': '@'
    },
    // These are example custom parsers from "lib/parsers.js"
    parsers: serializer.parsers()
}
```



## What you Get Back ##

[TODO]

```js
[
    {
        line: 0, // Line number on which comment block starts
        preface: '', // Text before first tag
        source: '', // Full source of the comment block
        context: '', // Code bounded by end of current comment block and start of next (or EOF)
        tags: [
            {
                tag: '', // Name of the tag
                value: '', // Content after tag name
                line: 0, // Line number on which tag starts
                source: '' // Full source of the tag block
                error: {} // Present if any error was thrown
                valueParsed: [
                    // return value from custom tag parser
                ]
            },
            {...},
            {...}
        ]
    }
]
```

For example: with the following example content containing a comment block:

```js
/**
 * This is the general preface.
 *
 * @title This is a description.
 */
var bar = 'foo';
```

comment-serializer will generate the following `json`:

```js
[
    {
        line: 1,
        preface: 'This is the general preface.',
        source: '\nThis is the general preface.\n\n@title This is a description.\n ',
        context: 'var bar = \'foo\';',
        tags: [{
            line: 4,
            tag: 'title',
            value: 'This is a description.',
            valueParsed: [],
            source: '@title This is a description.'
        }
    }
]
```


## Custom Tag Parsers ##

[TODO]

Custom tag parsers can be passed to the `options` argument. See `lib/parsers.js` as an example.



## Syntax Support ##

Comment delimiters:

```
/**       <- commentBegin
 *        <- commentLinePrefix
 * @tag   <- tagPrefix (the "@" symbol)
 */       <- commentEnd
 ```

While most documentation comment styles should be supported, there are a few rules around the syntax:

  1. The `commentBegin`, `commentLinePrefix`, `commentEnd` and `tagPrefix` delimiter tokens are distinct from each other.

  2. Delimiters should not rely on a whitespace character. For example, the following style would not be supported:

        /**
          An unsupported style.
          
          @tag
         */

  3. ?????



## Test ##

[TODO]

```
$ npm test
```

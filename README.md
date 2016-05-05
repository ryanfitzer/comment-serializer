# Comment Serializer #

[TODO]



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


## Test ##

[TODO]

```
$ npm test
```

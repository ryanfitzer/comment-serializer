# Comment Serializer #

Not much to see yet...



## Usage ##

In early development, so just run it directly to see a demo that logs the results to the console:

```
$ node runme
```



## What you Get Back ##

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
                    // return value from custom parser
                ]
            },
            {...},
            {...}
        ]
    }
]
```

For example: With the following example content containing a comment block:

```js
/**
 * This is the general preface.
 *
 * @title This is a description.
 */
var bar = 'foo';
```

comment-serializer generates this `json`:

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

Custom tag parsers can be provided. See `lib/parsers.js` as an example. These are used in `runme.js`.


## Test

```
$ npm test
```

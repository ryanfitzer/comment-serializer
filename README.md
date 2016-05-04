# Comment Serializer #

Not much to see yet...



## Usage ##

In early development, so just run it directly to see a demo that logs the results to the console:

```
$ node runme
```



## Comment Object ##

```js
[
    {
        line: 0, // The line number the comment starts on
        preface: '', // Any text found before the first @tag
        source: '', // Full source of the comment
        context: '', // All code found between end of comment and start of next comment, or EOF
        tags: [
            {
                tag: '', // The name of the tag
                value: '', // The content after the tag name
                line: 0, // The line number the tag starts on
                source: '' // Full source of the tag
                error: {} // Only present if any error was thrown
                // Any other props are via custom parsers
            },
            {
                // ...
            }
        ]
    }
]
```



## Test

```
$ npm test
```

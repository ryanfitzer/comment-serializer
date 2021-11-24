# Comment Serializer

![License](https://img.shields.io/npm/l/comment-serializer) ![Version](https://img.shields.io/npm/v/comment-serializer) ![Node support](https://img.shields.io/node/v/comment-serializer) ![Bundle size](https://img.shields.io/bundlephobia/minzip/comment-serializer) [![Downloads](https://img.shields.io/npm/dm/comment-serializer)](https://www.npmjs.com/package/comment-serializer)

Comment Serializer parses a source string for documentation comment blocks and returns a serialized object. It is language and comment syntax style agnostic. It configured to support most documentation comment block styles.

Try out an [example on RunKit](https://runkit.com/npm/comment-serializer).

## Usage

**source-code.txt**:

```txt
//!
 // This is the general description.
 //
 // ^title Button
 // ^markup <button class="btn">My Button</button>
 ///

Blah, blah, blah... Some code...
```

**my-serializer.js**

```js
const { readFileSync } = require('fs');
const serializer = require('comment-serializer');

const src = readFileSync('source-code.txt', { encoding: 'utf8' });

const mySerializer = serializer({
  tokens: {
    commentBegin: '//!',
    commentLinePrefix: '//',
    tagPrefix: '^',
    commentEnd: '///',
  },
});

const result = mySerializer(src);
```

## Options

### `options.parsers`

- Required: No
- Type: `object`

Custom tag parsers. An object of functions, keyed by the name of the tag to be parsed. The function receives the tag's content and must return the parsed value as a `string`.

When no parsers are provided, tags are serialized into `tag` and `value` pairs, but their values are not parsed in any way.

You can find some examples of custom parsers in [`examples/custom-parsers/parsers.js`](examples/custom-parsers/parsers.js)

#### Example

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
    mySpecialTag: (value) => value.toUpperCase(),
  },
});
```

Result:

```js
[
  {
    line: 1,
    source: '/**\n * @mySpecialTag This value is special!\n */',
    context: '',
    content: '@mySpecialTag This value is special!',
    preface: '',
    tags: [
      {
        line: 2,
        tag: 'mySpecialTag',
        value: 'This value is special!',
        valueParsed: 'THIS VALUE IS SPECIAL!',
        source: '@mySpecialTag This value is special!',
      },
    ],
  },
];
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
    mySpecialTag: (value) => {
      const match = value.match(/\s*[-*]\s+[\w-_]*/g);

      return [
        {
          type: 'items',
          value: match.map((item) => item.trim().replace(/[-*]\s/, '')),
        },
      ];
    },
  },
});
```

Result:

```js
[
  {
    line: 1,
    source:
      '/**\n * @mySpecialTag\n *  - item-1\n *  - item-2\n *  - item-3\n */',
    context: '',
    content: '@mySpecialTag\n - item-1\n - item-2\n - item-3',
    preface: '',
    tags: [
      {
        line: 2,
        tag: 'mySpecialTag',
        value: '\n - item-1\n - item-2\n - item-3',
        valueParsed: [
          {
            type: 'items',
            value: ['item-1', 'item-2', 'item-3'],
          },
        ],
        source: '@mySpecialTag\n - item-1\n - item-2\n - item-3',
      },
    ],
  },
];
```

##### Tag Parsing Errors

Errors that occur while parsing a tag's value are caught. When this happens, tag's the `valueParsed` property will be an empty `array`, and the error object is added to the `error` property.

Example:

```js
{
  line: 2,
  tag: 'mySpecialTag',
  value: '\n - item-1\n - item-2\n - item-3',
  valueParsed: [],
  source: '@mySpecialTag\n - item-1\n - item-2\n - item-3',
  error: { Error }
}
```

### `options.tokens`

- Required: No
- Type: `object`

Customize the comment delimiters. The default tokens use [JSDoc comment block](https://google.github.io/styleguide/jsguide.html#jsdoc) syntax.

### `options.tokens.commentBegin`

- Required: No
- Type: `string`
- Default: `'/**'`

The delimiter marking the beginning of a comment block.

### `options.tokens.commentLinePrefix`

- Required: No
- Type: `string`
- Default: `'*'`

The delimiter marking a new line in the body of a comment block.

### `options.tokens.tagPrefix`

- Required: No
- Type: `string`
- Default: `'@'`

The delimiter marking the start of a tag in the comment body.

### `options.tokens.commentEnd`

- Required: No
- Type: `string`
- Default: `'*/'`

The delimiter marking the end of a comment block.

## Token Syntax Support

Comment delimiters:

```
/**       <- commentBegin
 *        <- commentLinePrefix
 * @tag   <- tagPrefix (the "@" symbol)
 */       <- commentEnd
```

While most documentation comment styles should be supported, there are a few rules around the syntax:

1. The `commentBegin`, `commentLinePrefix`, `commentEnd` and `tagPrefix` delimiter tokens must be distinct from each other.

2. Delimiters should not rely on a whitespace character as a delimiter. For example, the following style would not be supported:

```
/**
  An unsupported style.

  @tag
 */
```

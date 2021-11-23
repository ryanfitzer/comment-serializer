const { readFileSync } = require('fs');
const createSerializer = require('../../src/index.js');

const src = readFileSync(`${__dirname}/source.txt`, { encoding: 'utf8' });

const mySerializer = createSerializer({
    tokens: {
        commentBegin: '//!',
        commentLinePrefix: '//',
        tagPrefix: '^',
        commentEnd: '///',
    },
});

const result = mySerializer(src);

console.log(require('util').inspect(result, { depth: 5, colors: true }));

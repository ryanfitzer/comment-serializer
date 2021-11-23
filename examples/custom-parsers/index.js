const { readFileSync } = require('fs');
const createSerializer = require('../../src/index.js');
const parsers = require('./parsers.js');

const src = readFileSync(`${__dirname}/source.txt`, { encoding: 'utf8' });

const mySerializer = createSerializer({ parsers });
const result = mySerializer(src);

console.log(require('util').inspect(result, { depth: 5, colors: true }));

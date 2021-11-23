const createSerializer = require('./src');

const src = `
//!
 // This is the general description.
 //
 // Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est  laborum.
 //
 //     This is a tabbed line (4 spaces)
 //     This is a tabbed line (4 spaces)
 //
 // ^title Button
 //
 // ^modifier .cta primary coloring
 // ^state :hover transition animation on hover
 //
 // ^example This is the description for the markup example.
 //  <a class="btn" href="#">a.btn</a>
 //
 // ^example <button class="btn">button.btn</button>
 //
 // ^example <button class="btn cta">button.btn.cta</button>
 //
 // ^example
 //  <div class="btn-set">
 //    <button class="btn cta">button.btn.cta</button>
 //    <button class="btn">button.btn</button>
 //  </div>
 ///

Blah, blah, blah... Some code...
`;

// Create a custom parser for the `example` tag
const exampleTagParser = (value) => {
    const match = value.match(/([^\n]*)\n((?:.|\n)*)/);

    const markup = {
        type: 'markup',
        value: value,
    };

    const description = {
        type: 'description',
        value: '',
    };

    if (match) {
        markup.value = match[2].trim();
        description.value = match[1].trim();
    }

    return [markup, description];
};

// Create a configured serializer
const mySerializer = createSerializer({
    parsers: {
        example: exampleTagParser,
    },
    tokens: {
        commentBegin: '//!',
        commentLinePrefix: '//',
        tagPrefix: '^',
        commentEnd: '///',
    },
});

// Returns the serialized comments
mySerializer(src);

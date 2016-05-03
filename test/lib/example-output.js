module.exports = factory;

function factory( tokens ) {

    return [ { line: 6,
        preface: 'This is the general description.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)',
        source: `\nThis is the general description.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)\n\n${tokens.tagPrefix}title-multi-word One Element\n${tokens.tagPrefix}example The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>\n${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n${tokens.tagPrefix}state :focus Special animated hover focus state\n${tokens.tagPrefix}state :hover Special animated hover focus state\n     `,
        context: '',
        tags:
         [ { tag: 'title-multi-word',
             value: 'One Element',
             valueParsed: [],
             line: 12,
             source: `${tokens.tagPrefix}title-multi-word One Element` },
           { tag: 'example',
             value: 'The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>',
             valueParsed: [],
             line: 13,
             source: `${tokens.tagPrefix}example The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>` },
           { tag: 'modifier',
             value: '.flash-block-success JS added class that disables the block disappearing',
             valueParsed: [],
             line: 19,
             source: `${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing` },
           { tag: 'state',
             value: ':focus Special animated hover focus state',
             valueParsed: [],
             line: 20,
             source: `${tokens.tagPrefix}state :focus Special animated hover focus state` },
           { tag: 'state',
             value: ':hover Special animated hover focus state',
             valueParsed: [],
             line: 21,
             source: `${tokens.tagPrefix}state :hover Special animated hover focus state` } ] },
      { line: 24,
        preface: 'This is the general description.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)',
        source: `\nThis is the general description.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)\n\n${tokens.tagPrefix}title One Element\n${tokens.tagPrefix}example The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>\n${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n${tokens.tagPrefix}state :focus Special animated hover focus state\n${tokens.tagPrefix}state :hover Special animated hover focus state\n     `,
        context: 'var ryan = \'one\';',
        tags:
         [ { tag: 'title',
             value: 'One Element',
             valueParsed: [],
             line: 30,
             source: `${tokens.tagPrefix}title One Element` },
           { tag: 'example',
             value: 'The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>',
             valueParsed: [],
             line: 31,
             source: `${tokens.tagPrefix}example The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>` },
           { tag: 'modifier',
             value: '.flash-block-success JS added class that disables the block disappearing',
             valueParsed: [],
             line: 37,
             source: `${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing` },
           { tag: 'state',
             value: ':focus Special animated hover focus state',
             valueParsed: [],
             line: 38,
             source: `${tokens.tagPrefix}state :focus Special animated hover focus state` },
           { tag: 'state',
             value: ':hover Special animated hover focus state',
             valueParsed: [],
             line: 39,
             source: `${tokens.tagPrefix}state :hover Special animated hover focus state` } ] },
      { line: 43,
        preface: 'This is the general description.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)',
        source: `\nThis is the general description.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)\n\n${tokens.tagPrefix}title Button\n\n${tokens.tagPrefix}modifier .cta primary coloring\n${tokens.tagPrefix}state :hover transition animation on hover\n\n${tokens.tagPrefix}example The example description\n <a class="btn" href="#">a.btn</a>\n\n${tokens.tagPrefix}example <button class="btn">button.btn</button>\n\n${tokens.tagPrefix}example <button class="btn cta">button.btn.cta</button>\n\n${tokens.tagPrefix}example\n <div class="btn-set">\n   <button class="btn cta">button.btn.cta</button>\n   <button class="btn">button.btn</button>\n </div>\n `,
        context: 'var ryan = \'two\';',
        tags:
         [ { tag: 'title',
             value: 'Button',
             valueParsed: [],
             line: 51,
             source: `${tokens.tagPrefix}title Button` },
           { tag: 'modifier',
             value: '.cta primary coloring',
             valueParsed: [],
             line: 53,
             source: `${tokens.tagPrefix}modifier .cta primary coloring` },
           { tag: 'state',
             value: ':hover transition animation on hover',
             valueParsed: [],
             line: 54,
             source: `${tokens.tagPrefix}state :hover transition animation on hover` },
           { tag: 'example',
             value: 'The example description\n <a class="btn" href="#">a.btn</a>',
             valueParsed: [],
             line: 56,
             source: `${tokens.tagPrefix}example The example description\n <a class="btn" href="#">a.btn</a>` },
           { tag: 'example',
             value: '<button class="btn">button.btn</button>',
             valueParsed: [],
             line: 59,
             source: `${tokens.tagPrefix}example <button class="btn">button.btn</button>` },
           { tag: 'example',
             value: '<button class="btn cta">button.btn.cta</button>',
             valueParsed: [],
             line: 61,
             source: `${tokens.tagPrefix}example <button class="btn cta">button.btn.cta</button>` },
           { tag: 'example',
             value: '\n <div class="btn-set">\n   <button class="btn cta">button.btn.cta</button>\n   <button class="btn">button.btn</button>\n </div>',
             valueParsed: [],
             line: 63,
             source: `${tokens.tagPrefix}example\n <div class="btn-set">\n   <button class="btn cta">button.btn.cta</button>\n   <button class="btn">button.btn</button>\n </div>` } ] },
      { line: 71,
        preface: 'This is the general description.',
        source: `\nThis is the general description.\n\n${tokens.tagPrefix}title Three Element\n${tokens.tagPrefix}example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>\n${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n${tokens.tagPrefix}state :focus Special animated hover focus state\n${tokens.tagPrefix}state :hover Special animated hover focus state\n `,
        context: 'var ryan = \'three\';',
        tags:
         [ { tag: 'title',
             value: 'Three Element',
             valueParsed: [],
             line: 74,
             source: `${tokens.tagPrefix}title Three Element` },
           { tag: 'example',
             value: '\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>',
             valueParsed: [],
             line: 75,
             source: `${tokens.tagPrefix}example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>` },
           { tag: 'modifier',
             value: '.flash-block-success JS added class that disables the block disappearing',
             valueParsed: [],
             line: 81,
             source: `${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing` },
           { tag: 'state',
             value: ':focus Special animated hover focus state',
             valueParsed: [],
             line: 82,
             source: `${tokens.tagPrefix}state :focus Special animated hover focus state` },
           { tag: 'state',
             value: ':hover Special animated hover focus state',
             valueParsed: [],
             line: 83,
             source: `${tokens.tagPrefix}state :hover Special animated hover focus state` } ] },
      { line: 100,
        preface: 'This is the general description.',
        source: `\nThis is the general description.\n\n${tokens.tagPrefix}title Four Element\n${tokens.tagPrefix}example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>\n${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n${tokens.tagPrefix}state :focus Special animated hover focus state\n${tokens.tagPrefix}state :hover Special animated hover focus state\n `,
        context: 'var ryan = \'four\';',
        tags:
         [ { tag: 'title',
             value: 'Four Element',
             valueParsed: [],
             line: 103,
             source: `${tokens.tagPrefix}title Four Element` },
           { tag: 'example',
             value: '\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>',
             valueParsed: [],
             line: 104,
             source: `${tokens.tagPrefix}example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>` },
           { tag: 'modifier',
             value: '.flash-block-success JS added class that disables the block disappearing',
             valueParsed: [],
             line: 110,
             source: `${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing` },
           { tag: 'state',
             value: ':focus Special animated hover focus state',
             valueParsed: [],
             line: 111,
             source: `${tokens.tagPrefix}state :focus Special animated hover focus state` },
           { tag: 'state',
             value: ':hover Special animated hover focus state',
             valueParsed: [],
             line: 112,
             source: `${tokens.tagPrefix}state :hover Special animated hover focus state` } ] } ];
}
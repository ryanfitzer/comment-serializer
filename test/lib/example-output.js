module.exports = factory;

function factory( tokens ) {

    return [{
        line: 6,
        source: `${tokens.commentBegin}\n     ${tokens.commentLinePrefix} This is the general description.\n     ${tokens.commentLinePrefix}\n     ${tokens.commentLinePrefix}     This is a tabbed line (4 spaces)\n     ${tokens.commentLinePrefix}     This is a tabbed line (4 spaces)\n     ${tokens.commentLinePrefix}\n     ${tokens.commentLinePrefix} ${tokens.tagPrefix}title-multi-word One ${tokens.tagPrefix} Element\n     ${tokens.commentLinePrefix} ${tokens.tagPrefix}example The description of the example\n     ${tokens.commentLinePrefix}  <div class="flash-block">\n     ${tokens.commentLinePrefix}      <div class="flash-block-content">\n     ${tokens.commentLinePrefix}          Success Message\n     ${tokens.commentLinePrefix}      </div>\n     ${tokens.commentLinePrefix}  </div>\n     ${tokens.commentLinePrefix} ${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n     ${tokens.commentLinePrefix} ${tokens.tagPrefix}state :focus Special animated hover focus state\n     ${tokens.commentLinePrefix} ${tokens.tagPrefix}state :hover Special animated hover focus state\n     ${tokens.commentEnd}`,
        context: '',
        content: `This is the general description.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)\n\n${tokens.tagPrefix}title-multi-word One ${tokens.tagPrefix} Element\n${tokens.tagPrefix}example The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>\n${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n${tokens.tagPrefix}state :focus Special animated hover focus state\n${tokens.tagPrefix}state :hover Special animated hover focus state`,
        preface: 'This is the general description.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)',
        tags: [{
            line: 12,
            tag: 'title-multi-word',
            value: `One ${tokens.tagPrefix} Element`,
            valueParsed: [],
            source: `${tokens.tagPrefix}title-multi-word One ${tokens.tagPrefix} Element`
        }, {
            line: 13,
            tag: 'example',
            value: 'The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>',
            valueParsed: [],
            source: `${tokens.tagPrefix}example The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>`
        }, {
            line: 19,
            tag: 'modifier',
            value: '.flash-block-success JS added class that disables the block disappearing',
            valueParsed: [],
            source: `${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing`
        }, {
            line: 20,
            tag: 'state',
            value: ':focus Special animated hover focus state',
            valueParsed: [],
            source: `${tokens.tagPrefix}state :focus Special animated hover focus state`
        }, {
            line: 21,
            tag: 'state',
            value: ':hover Special animated hover focus state',
            valueParsed: [],
            source: `${tokens.tagPrefix}state :hover Special animated hover focus state`
        }]
    }, {
        line: 24,
        source: `${tokens.commentBegin}\n     ${tokens.commentLinePrefix} This is the general description.\n     ${tokens.commentLinePrefix}\n     ${tokens.commentLinePrefix}     This is a tabbed line (4 spaces)\n     ${tokens.commentLinePrefix}     This is a tabbed line (4 spaces)\n     ${tokens.commentLinePrefix}\n     ${tokens.commentLinePrefix} ${tokens.tagPrefix}title One Element\n     ${tokens.commentLinePrefix} ${tokens.tagPrefix}example The description of the example\n     ${tokens.commentLinePrefix}  <div class="flash-block">\n     ${tokens.commentLinePrefix}      <div class="flash-block-content">\n     ${tokens.commentLinePrefix}          Success Message\n     ${tokens.commentLinePrefix}      </div>\n     ${tokens.commentLinePrefix}  </div>\n     ${tokens.commentLinePrefix} ${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n     ${tokens.commentLinePrefix} ${tokens.tagPrefix}state :focus Special animated hover focus state\n     ${tokens.commentLinePrefix} ${tokens.tagPrefix}state :hover Special animated hover focus state\n     ${tokens.commentEnd}`,
        context: 'var ryan = \'one\';',
        content: `This is the general description.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)\n\n${tokens.tagPrefix}title One Element\n${tokens.tagPrefix}example The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>\n${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n${tokens.tagPrefix}state :focus Special animated hover focus state\n${tokens.tagPrefix}state :hover Special animated hover focus state`,
        preface: 'This is the general description.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)',
        tags: [{
            line: 30,
            tag: 'title',
            value: 'One Element',
            valueParsed: [],
            source: `${tokens.tagPrefix}title One Element`
        }, {
            line: 31,
            tag: 'example',
            value: 'The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>',
            valueParsed: [],
            source: `${tokens.tagPrefix}example The description of the example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>`
        }, {
            line: 37,
            tag: 'modifier',
            value: '.flash-block-success JS added class that disables the block disappearing',
            valueParsed: [],
            source: `${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing`
        }, {
            line: 38,
            tag: 'state',
            value: ':focus Special animated hover focus state',
            valueParsed: [],
            source: `${tokens.tagPrefix}state :focus Special animated hover focus state`
        }, {
            line: 39,
            tag: 'state',
            value: ':hover Special animated hover focus state',
            valueParsed: [],
            source: `${tokens.tagPrefix}state :hover Special animated hover focus state`
        }]
    }, {
        line: 43,
        source: `${tokens.commentBegin}\n ${tokens.commentLinePrefix} This is the general description.\n ${tokens.commentLinePrefix}\n ${tokens.commentLinePrefix} Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n ${tokens.commentLinePrefix}\n ${tokens.commentLinePrefix}     This is a tabbed line (4 spaces)\n ${tokens.commentLinePrefix}     This is a tabbed line (4 spaces)\n ${tokens.commentLinePrefix}\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}title Button\n ${tokens.commentLinePrefix}\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}modifier .cta primary coloring\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}state :hover transition animation on hover\n ${tokens.commentLinePrefix}\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}example The example description\n ${tokens.commentLinePrefix}  <a class="btn" href="#">a.btn</a>\n ${tokens.commentLinePrefix}\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}example <button class="btn">button.btn</button>\n ${tokens.commentLinePrefix}\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}example <button class="btn cta">button.btn.cta</button>\n ${tokens.commentLinePrefix}\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}example\n ${tokens.commentLinePrefix}  <div class="btn-set">\n ${tokens.commentLinePrefix}    <button class="btn cta">button.btn.cta</button>\n ${tokens.commentLinePrefix}    <button class="btn">button.btn</button>\n ${tokens.commentLinePrefix}  </div>\n ${tokens.commentEnd}`,
        context: 'var ryan = \'two\';',
        content: `This is the general description.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)\n\n${tokens.tagPrefix}title Button\n\n${tokens.tagPrefix}modifier .cta primary coloring\n${tokens.tagPrefix}state :hover transition animation on hover\n\n${tokens.tagPrefix}example The example description\n <a class="btn" href="#">a.btn</a>\n\n${tokens.tagPrefix}example <button class="btn">button.btn</button>\n\n${tokens.tagPrefix}example <button class="btn cta">button.btn.cta</button>\n\n${tokens.tagPrefix}example\n <div class="btn-set">\n   <button class="btn cta">button.btn.cta</button>\n   <button class="btn">button.btn</button>\n </div>`,
        preface: 'This is the general description.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n    This is a tabbed line (4 spaces)\n    This is a tabbed line (4 spaces)',
        tags: [{
            line: 51,
            tag: 'title',
            value: 'Button',
            valueParsed: [],
            source: `${tokens.tagPrefix}title Button`
        }, {
            line: 53,
            tag: 'modifier',
            value: '.cta primary coloring',
            valueParsed: [],
            source: `${tokens.tagPrefix}modifier .cta primary coloring`
        }, {
            line: 54,
            tag: 'state',
            value: ':hover transition animation on hover',
            valueParsed: [],
            source: `${tokens.tagPrefix}state :hover transition animation on hover`
        }, {
            line: 56,
            tag: 'example',
            value: 'The example description\n <a class="btn" href="#">a.btn</a>',
            valueParsed: [],
            source: `${tokens.tagPrefix}example The example description\n <a class="btn" href="#">a.btn</a>`
        }, {
            line: 59,
            tag: 'example',
            value: '<button class="btn">button.btn</button>',
            valueParsed: [],
            source: `${tokens.tagPrefix}example <button class="btn">button.btn</button>`
        }, {
            line: 61,
            tag: 'example',
            value: '<button class="btn cta">button.btn.cta</button>',
            valueParsed: [],
            source: `${tokens.tagPrefix}example <button class="btn cta">button.btn.cta</button>`
        }, {
            line: 63,
            tag: 'example',
            value: '\n <div class="btn-set">\n   <button class="btn cta">button.btn.cta</button>\n   <button class="btn">button.btn</button>\n </div>',
            valueParsed: [],
            source: `${tokens.tagPrefix}example\n <div class="btn-set">\n   <button class="btn cta">button.btn.cta</button>\n   <button class="btn">button.btn</button>\n </div>`
        }]
    }, {
        line: 71,
        source: `${tokens.commentBegin}\n ${tokens.commentLinePrefix} This is the general description.\n ${tokens.commentLinePrefix}\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}title Three Element\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}example\n ${tokens.commentLinePrefix}  <div class="flash-block">\n ${tokens.commentLinePrefix}      <div class="flash-block-content">\n ${tokens.commentLinePrefix}          Success Message\n ${tokens.commentLinePrefix}      </div>\n ${tokens.commentLinePrefix}  </div>\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}state :focus Special animated hover focus state\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}state :hover Special animated hover focus state\n ${tokens.commentEnd}`,
        context: 'var ryan = \'three\';',
        content: `This is the general description.\n\n${tokens.tagPrefix}title Three Element\n${tokens.tagPrefix}example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>\n${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n${tokens.tagPrefix}state :focus Special animated hover focus state\n${tokens.tagPrefix}state :hover Special animated hover focus state`,
        preface: 'This is the general description.',
        tags: [{
            line: 74,
            tag: 'title',
            value: 'Three Element',
            valueParsed: [],
            source: `${tokens.tagPrefix}title Three Element`
        }, {
            line: 75,
            tag: 'example',
            value: '\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>',
            valueParsed: [],
            source: `${tokens.tagPrefix}example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>`
        }, {
            line: 81,
            tag: 'modifier',
            value: '.flash-block-success JS added class that disables the block disappearing',
            valueParsed: [],
            source: `${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing`
        }, {
            line: 82,
            tag: 'state',
            value: ':focus Special animated hover focus state',
            valueParsed: [],
            source: `${tokens.tagPrefix}state :focus Special animated hover focus state`
        }, {
            line: 83,
            tag: 'state',
            value: ':hover Special animated hover focus state',
            valueParsed: [],
            source: `${tokens.tagPrefix}state :hover Special animated hover focus state`
        }]
    }, {
        line: 100,
        source: `${tokens.commentBegin}\n ${tokens.commentLinePrefix} This is the general description.\n ${tokens.commentLinePrefix}\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}title Four Element\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}example\n ${tokens.commentLinePrefix}  <div class="flash-block">\n ${tokens.commentLinePrefix}      <div class="flash-block-content">\n ${tokens.commentLinePrefix}          Success Message\n ${tokens.commentLinePrefix}      </div>\n ${tokens.commentLinePrefix}  </div>\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}state :focus Special animated hover focus state\n ${tokens.commentLinePrefix} ${tokens.tagPrefix}state :hover Special animated hover focus state\n ${tokens.commentEnd}`,
        context: `var ryan = \'four\';\n/*\n    regular comment\n${tokens.commentEnd}`,
        content: `This is the general description.\n\n${tokens.tagPrefix}title Four Element\n${tokens.tagPrefix}example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>\n${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing\n${tokens.tagPrefix}state :focus Special animated hover focus state\n${tokens.tagPrefix}state :hover Special animated hover focus state`,
        preface: 'This is the general description.',
        tags: [{
            line: 103,
            tag: 'title',
            value: 'Four Element',
            valueParsed: [],
            source: `${tokens.tagPrefix}title Four Element`
        }, {
            line: 104,
            tag: 'example',
            value: '\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>',
            valueParsed: [],
            source: `${tokens.tagPrefix}example\n <div class="flash-block">\n     <div class="flash-block-content">\n         Success Message\n     </div>\n </div>`
        }, {
            line: 110,
            tag: 'modifier',
            value: '.flash-block-success JS added class that disables the block disappearing',
            valueParsed: [],
            source: `${tokens.tagPrefix}modifier .flash-block-success JS added class that disables the block disappearing`
        }, {
            line: 111,
            tag: 'state',
            value: ':focus Special animated hover focus state',
            valueParsed: [],
            source: `${tokens.tagPrefix}state :focus Special animated hover focus state`
        }, {
            line: 112,
            tag: 'state',
            value: ':hover Special animated hover focus state',
            valueParsed: [],
            source: `${tokens.tagPrefix}state :hover Special animated hover focus state`
        }]
    }]
;
}
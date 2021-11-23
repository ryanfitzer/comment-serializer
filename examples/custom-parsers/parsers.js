module.exports = {
    /**
     * Match element state pseudo-classes.
     *
     * @usage `@state :hover This is a description`.
     *
     * @param {string} value The tag's value to parse.
     * @returns {array}
     */
    state: (value) => {
        const match = value.match(/(^:[-_a-zA-Z]+)(.*)/);

        if (!match) {
            throw new Error('No state pseudo-class could be matched');
        }

        return [
            {
                type: 'state',
                value: match[1].trim(),
            },
            {
                type: 'description',
                value: match[2].trim(),
            },
        ];
    },

    /**
     * Match element modifier classes.
     *
     * @usage `@modifier .some-class This is a description`.
     * @usage `@modifier .-some-class This is a description`.
     * @usage `@modifier ._some_class This is a description`.
     *
     * @param {string} value The tag's value to parse.
     * @returns {array}
     */
    modifier: (value) => {
        const match = value.match(/^(\.?-?[_a-zA-Z]+[_a-zA-Z0-9-]*)(.*)/);

        if (!match) {
            throw new Error('No modifier class could be matched');
        }

        return [
            {
                type: 'modifier',
                value: match[1].trim(),
            },
            {
                type: 'description',
                value: match[2].trim(),
            },
        ];
    },

    /**
     * Match an example with optional description.
     *
     * @usage `@example <div class="some-example"><p>Hello, World!</p></div>`
     *
     * @usage `@example
     *           <div class="some-example">
     *             <p>Hello, World!</p>
     *           </div>`
     *
     * @usage `@example This is an optional description
     *           <div class="some-example">
     *             <p>Hello, World!</p>
     *           </div>`
     *
     * @param {string} value The tag's value to parse.
     * @returns {array}
     */
    example: (value) => {
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
    },

    /**
     * Parse a list of tags into an array.
     *
     * @usage `@tags
     *          - tag-1
     *          - tag-2
     *          - tag-3`
     *
     * @usage `@tags
     *          * tag-1
     *          * tag-2
     *          * tag-3`
     *
     * @param {string} value The tag's value to parse.
     * @returns {array}
     */
    tags: (value) => {
        const match = value.match(/\s*[-*]\s+[\w-_]*/g);

        if (!match) {
            throw new Error('No tags could be matched');
        }

        return [
            {
                type: 'tags',
                value: match.map(function (tag) {
                    return tag.trim().replace(/[-*]\s/, '');
                }),
            },
        ];
    },
};

module.exports = [
    {
        line: 2,
        preface: 'This is a documentation block.',
        source: '\n\nThis is a documentation block.\n\n^title DocBlock\n',
        context: 'var one = \'one\';\n\n/**\n* This is just a standard comment block.\n*/\nvar two = \'two\';',
        tags: [
            {
                tag: 'title',
                value: 'DocBlock',
                line: 6,
                source: '^title DocBlock'
            }
        ]
    }
];
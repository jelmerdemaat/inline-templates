var inlineTemplates = require('../index'),
    test = require('ava');

console.log(inlineTemplates('./src/test.html'));

test('foo', t => {
    t.pass();
});

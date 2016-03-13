var inlineTemplates = require('../index'),
    test = require('ava');

// Mustache
test('mustache basic', t => {
    var inlined = inlineTemplates('./includes/mustache/basic.html').replace(/\r|\n/g, '');
    t.is(inlined, 'My name is James');
});

test('mustache empty', t => {
    var inlined = inlineTemplates('./includes/mustache/no-data.html').replace(/\r|\n/g, '');
    t.is(inlined, 'A template with no data');
});

// Handlebars
test('handlebars basic', t => {
    var inlined = inlineTemplates('./includes/handlebars/basic.html').replace(/\r|\n/g, '');
    t.is(inlined, 'My name is James');
});

test('handlebars empty', t => {
    var inlined = inlineTemplates('./includes/handlebars/no-data.html').replace(/\r|\n/g, '');
    t.is(inlined, 'A template with no data');
});

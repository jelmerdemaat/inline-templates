# inline-templates [![Build Status](https://travis-ci.org/jelmerdemaat/inline-templates.svg?branch=master)](https://travis-ci.org/jelmerdemaat/inline-templates)

Inlines templates inside given source files.

## Install

```
$ npm install --save inline-templates
```

## Usage

```js
const inlineTemplates = require('inline-templates');

inlineTemplates('./src/index.html');
// => returns index.html with template references
// compiled inline.
```

## API

### inlineTemplates(input)

#### source

Type: `string`

The source file.

## License

MIT © [Jelmer de Maat](http://jelmerdemaat.nl)

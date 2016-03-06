var esprima = require('esprima');
var escodegen = require('escodegen');

var testFunction = 'handlebars("../template.html", { "name": "Jelmer", "version": 0.1 })';

var result, engine, template, data;

function parseInclude(includeString) {
  if(!includeString) throw new Error('I need an include string.');

  result = esprima.parse(includeString);

  if(typeof result === 'object') {
    if(result.body[0].expression &&
       result.body[0].expression.callee &&
       result.body[0].expression.arguments.length > 0) {
      engine = result.body[0].expression.callee.name;

      if(result.body[0].expression.arguments[0].type === 'Literal') {
        template = result.body[0].expression.arguments[0].value;

        if(result.body[0].expression.arguments[1] && result.body[0].expression.arguments[1].type === 'ObjectExpression') {
          data = JSON.parse(escodegen.generate(result.body[0].expression.arguments[1], { format: { json: true, compact: true } }));
        }
      } else {
        throw new Error('Template name must be a string.');
      }

      return { engine: engine, template: template, data: data };

    } else {
      throw new Error('Invalid inline template expression. See the docs for the correct formatting.');
    }
  } else {
    throw new Error(result);
  }
}

function findIncludes(files) {

}

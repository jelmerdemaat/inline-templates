var fs = require('fs'),
    path = require('path');

var validInclude = new RegExp(/\+(\S+)\((.*)\)/gi),
    includeData = new RegExp(/{.*}/gi),
    includeTemplate = new RegExp(/(.*?)\,/i);

var supportedEngines = {
  mustache: function(template, data) {
    var Mustache = require('mustache');
    if(data) {
      return Mustache.render(template, data);
    }
    return Mustache.render(template);
  },
  handlebars: function(template, data) {
    var Handlebars = require('handlebars');
    if(data) {
      return Handlebars.compile(template)(data);
    }
    return Handlebars.compile(template);
  }
};

function unquote(string) {
  return string.replace(/\'|\"/gi, '');
}

function readTemplate(template, baseFolder) {
  var templatePath = path.join(baseFolder, template);

  return fs.readFileSync(templatePath, 'utf-8');
}

function parseInclude(includeType, content) {
  if(!includeType) throw new Error('I need a type of include.');

  var result = { engine: includeType };

  data = content.match(includeData);

  if(data && data.length) {
    result.data = JSON.parse(data[0].replace(/\n|\r/g, ''));

    // Take first capturing group from content match
    template = unquote(content.match(includeTemplate)[1]);

    if(template && template.length && template.indexOf(':') === -1) {
      result.template = template;
    } else {
      throw new Error('Could not read template name from ' + content)
    }
  } else {
    if(result.engine === 'handlebars') result.data = {};
    result.template = unquote(content);
  }

  return result;
}

function render(includeType, content, baseFolder) {
  var includeObject = parseInclude(includeType, content),
      templateContent = readTemplate(includeObject.template, baseFolder);

  // If engine is one that this module supports:
  if(supportedEngines[includeObject.engine]) {
    if(includeObject.data) {
      return supportedEngines[includeObject.engine](templateContent, includeObject.data);
    }
    return supportedEngines[includeObject.engine](templateContent);
  } else {
    throw new Error('Rendering engine "' + includeObject.engine + '" is unrecognized or not supported.')
  }
}

function findIncludes(file) {
  var contents = fs.readFileSync(file, 'utf-8');

  if(typeof contents === 'string' && contents.length) {
    var baseFolder = path.dirname(file) || './';

    contents = contents.replace(validInclude, function(substring, includeType, content) {
      return render(includeType, content, baseFolder);
    });

    return contents;
  } else {
    throw new Error('Could not read file ' + file);
  }
}

module.exports = function(file) {
  if(!file) {
    throw new Error('I must be given a file to read.');
  }

  if(typeof file !== 'string') {
    throw new Error('I must be given a string value to a file.');
  }

  return findIncludes(file);
}

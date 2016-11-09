var Handlebars = require("handlebars");
var cheerio = require('cheerio');
var marked = require('marked');
var formatModel = require('./formatModel');
// var entities = require("entities");

var printSchema = function(value, options) {
  if (!value) {
    return '';
  }

  var schema;

  if (value.type === 'object') {
    schema = formatModel(value, options);
  } else {
    schema = value;
  }

  var schemaString = require("json-stable-stringify")(schema, { space: 2 });

  // Add an extra CRLR before the code so the postprocessor can determine
  // the correct line indent for the <pre> tag.
  var $ = cheerio.load(marked("```json\r\n" + schemaString + "\n```"));
  var definitions = $('span:not(:has(span)):contains("#/definitions/")');
  definitions.each(function(index, item) {
    var ref = $(item).html();
    var refLink = ref.replace(/&quot;/g, "").replace('#/definitions/', '#definition-')
    // TODO: This should be done in a template
    $(item).html("<a href=" + refLink + ">" + ref + "</a>");
  });

  // return '<pre><code class="hljs lang-json">' +
  //   this.highlight(schemaString, 'json') +
  //   '</code></pre>';

  return $.html();
};

module.exports = function(value, options) {
  var html = printSchema(value, options);
  return new Handlebars.SafeString(html)
};

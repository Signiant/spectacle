var Handlebars = require("handlebars");
var common = require("../lib/common");
var formatModel = require('./formatModel');
var printSchema = require('./printSchema');
// var entities = require("entities");


module.exports = function(reference, options) {
  if (!reference) {
    console.error("Cannot print null reference.");
    return '';
  }
  var model = common.resolveSchemaReference(reference, options.data.root);
    model = formatModel(model, options);
  var html = printSchema(model);
  // html = common.highlight(html, 'json')
  // html = entities.decodeHTML(html); html;
  return new Handlebars.SafeString(html);
};

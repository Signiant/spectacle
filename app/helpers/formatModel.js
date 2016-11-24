'use strict';
var common = require('../lib/common');

var formatModel = function(model, options) {
    if (typeof model === 'object' && typeof model.properties === 'object')
        model = model.properties;

    var clonedModel = JSON.parse(JSON.stringify(model));
    Object.keys(clonedModel).forEach(function(propName) {
        var prop = clonedModel[propName];
        if (typeof prop.example !== 'undefined') {
            clonedModel[propName] = prop.example
        }
        else {
            if (prop.type) {
                if (prop.type !== "object") {
                    if (prop.type === 'array') {
                        if(prop.items['$ref']) {
                            var propModel = common.resolveSchemaReference(prop.items['$ref'], options.data.root);
                            clonedModel[propName] = [formatModel(propModel, options)];
                        } else {
                            clonedModel[propName] = [formatModel(prop.items, options)];
                        }
                    } else {
                        clonedModel[propName] = prop.type;
                    }

                } else {
                    clonedModel[propName] = formatModel(prop, options)
                }
            }

            if (prop.format) {
                clonedModel[propName] += ('(' + prop.format + ')');
            }

            if (prop['$ref']) {
                var propModel = common.resolveSchemaReference(prop['$ref'], options.data.root);
                clonedModel[propName] = formatModel(propModel, options);
            }
        }
    });

    if (options.hash.type == 'array')
        clonedModel = [clonedModel];

    return clonedModel;
};

module.exports = formatModel;
module.exports = function(object, options) {
    if (object instanceof Array) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};
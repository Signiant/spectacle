module.exports = function(value, type, options) {
    if (typeof value === type) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};
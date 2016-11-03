module.exports = function (value, options) {
    if (value !== undefined) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};
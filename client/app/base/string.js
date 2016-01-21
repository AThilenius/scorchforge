/*
 * Various helpers for Javascript strings
 */

var isEmpty = function (str) {
    return str && str.length > 0;
};

var isBlank = function (str) {
    return !str || /^\s*$/.test(str);
};

String.prototype.toPascalCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

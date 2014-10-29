angular.module('App').factory('Utils', function() {
    var Utils = {};

    Utils.hexToRgb = function hexToRgb(color) {
        var r, g, b;

        r = parseInt(color.slice(0,2), 16);
        g = parseInt(color.slice(2,4), 16);
        b = parseInt(color.slice(4,6), 16);

        return {
            r : r,
            g : g,
            b : b
        }
    };

    return Utils;
});

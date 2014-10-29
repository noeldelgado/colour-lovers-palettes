angular.module('App').filter('hexToHsl', ['Utils', function(Utils) {
    return function(color) {
        var rgb = Utils.hexToRgb(color);
        var hsl = Utils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        return "hsla(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%, 1)";
    };
}]);

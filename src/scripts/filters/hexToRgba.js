angular.module('App').filter('hexToRgba', ['Utils', function(Utils) {
    return function(color) {
        var rgb = Utils.hexToRgb(color);
        return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 1)";
    };
}]);

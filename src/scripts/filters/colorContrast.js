angular.module('App').filter('colorContrast', ['Utils', function(Utils) {
    var getBrightness = function getBrightness(rgb) {
        var sum = rgb.r + rgb.g + rgb.b;
        return Math.round(sum / (255 * 3) * 100);
    };

    return function(color) {
        var rgb = Utils.hexToRgb(color);
        var brightness = getBrightness(rgb);
        return (brightness < 50) ? 'dark' : '';
    };
}]);

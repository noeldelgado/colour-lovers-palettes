angular.module('App').filter('colorContrast', function() {
    var hexToRgb = function hexToRgb(color) {
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

    var getBrightness = function getBrightness(rgb) {
        var sum = rgb.r + rgb.g + rgb.b;
        return Math.round(sum / (255 * 3) * 100);
    };

    return function(color) {
        var rgb = hexToRgb(color);
        var brightness = getBrightness(rgb);
        return (brightness < 50) ? 'dark' : '';
    };
});

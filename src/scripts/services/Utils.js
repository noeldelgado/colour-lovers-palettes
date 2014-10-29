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

    Utils.rgbToHsl = function rgbToHsl(r, g, b) {
        var r = r/255,
            g = g/255,
            b = b/255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    return Utils;
});

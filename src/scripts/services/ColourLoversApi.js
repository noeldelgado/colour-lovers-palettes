angular.module('App').factory('ColourLoversApi', function($http) {
    var exports, API_BASE_PATH, API_PALETTES_PATH, CALLBACK;

    exports = {};
    API_BASE_PATH = "https://www.colourlovers.com/api/";
    API_PALETTES_PATH = API_BASE_PATH + "palettes/";
    API_FORMAT = "format=json";
    CALLBACK = "&jsonCallback=JSON_CALLBACK";

    exports.getRandomPalette = function getRandomPalette() {
        var url, params;

        params = "random?";
        url = API_PALETTES_PATH + params + API_FORMAT + CALLBACK;

        return $http({
            method : 'JSONP',
            url : url
        });
    };

    exports.getRandomPaletteByColor = function(color) {
        var url, params, offset;

        offset = 0;// Math.floor(Math.random() * 10);
        params = "?hex=" + color + "&numResults=20&resultOffset=" + offset + "&";
        url = API_PALETTES_PATH + params + API_FORMAT + CALLBACK;

        return $http({
            method : 'JSONP',
            url : url
        });
    };

    return exports;
});

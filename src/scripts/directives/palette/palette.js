angular.module('App').directive('palette', function() {
    return {
        restrict : 'E',
        scope : {
            colors : '='
        },
        templateUrl : 'src/scripts/directives/palette/palette.html'
    }
});

angular.module('App').directive('savedPalettes', function() {
    return {
        restrict : 'E',
        scope : {
            palettes : '='
        },
        templateUrl : 'src/scripts/directives/saved-palettes/saved-palettes.html',
        link : function link(scope, elem) {
            scope.loadPalette = function(palette) {
                scope.$emit('loadPalette', palette);
            };

            scope.$on('toggleSavedPalettes', function() {
                elem.toggleClass('active');
                scope.$emit('hideInfo');
            });

            scope.$on('hideSavedPalettes', function() {
                elem.removeClass('active');
            });
        }
    }
});

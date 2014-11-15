angular.module('App').directive('savedPalettes', function() {
    return {
        restrict : 'E',
        scope : {
            palettes : '='
        },
        templateUrl : 'src/scripts/directives/saved-palettes/saved-palettes.html',
        link : function link($scope, $element) {
            $scope.loadPalette = function(palette) {
                $scope.$emit('loadPalette', palette);
            };

            $scope.$on('toggleSavedPalettes', function() {
                $element.toggleClass('active');
                $scope.$emit('hideInfo');
            });

            $scope.$on('hideSavedPalettes', function() {
                $element.removeClass('active');
            });
        }
    }
});

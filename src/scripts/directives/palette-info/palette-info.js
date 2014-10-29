angular.module('App').directive('paletteInfo', ['$rootScope', function($rootScope) {
    return {
        restrict : 'E',
        scope : {
            infoData : '=',
            savedPalettes : '='
        },
        templateUrl : 'src/scripts/directives/palette-info/palette-info.html',
        link : function link(scope, elem) {
            var infoButton, savedPalettesButton;

            infoButton = elem[0].querySelector('.toggle-info-button');
            savedPalettesButton = elem[0].querySelector('.toggle-saved-palettes-button');

            infoButton.addEventListener('click', function() {
                infoButton.classList.toggle('active');
                savedPalettesButton.classList.remove('active');
                $rootScope.$broadcast('toggleInfo');
            }, false);

            savedPalettesButton.addEventListener('click', function() {
                savedPalettesButton.classList.toggle('active');
                infoButton.classList.remove('active');
                $rootScope.$broadcast('toggleSavedPalettes');
            }, false);

            scope.randomPalette = function randomPalette() {
                $rootScope.$broadcast('randomPalette');
            };

            scope.likePalette = function likePalette(palette) {
                $rootScope.$broadcast('savePalette', palette);
            };

            scope.unlikePalette = function unlikePalette(palette) {
                $rootScope.$broadcast('removePalette', palette);
            };
        }
    }
}]);

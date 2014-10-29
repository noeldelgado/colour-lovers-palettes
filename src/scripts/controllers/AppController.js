angular.module('App').controller('AppController', [
        '$scope', 'localStorageService', 'ColourLoversApi', '$animate',
function($scope,   localStorageService,   ColourLoversApi, $animate) {
    $scope.data = null;
    $scope.savedPalettesData = null;
    $scope.loading = true;

    $scope.$on('loadPalette', function(event, palette) {
        $scope.loadPalette(palette);
    });

    $scope.$on('randomPalette', function() {
        $scope.randomPalette();
    });

    $scope.$on('savePalette', function(event, palette) {
        $scope.savePalette(palette);
    });

    $scope.$on('removePalette', function(event, palette) {
        $scope.removePalette(palette);
    });

    $scope.loadPalette = function loadPalette(palette) {
        $scope.data = palette;
    };

    $scope.randomPalette = function randomPalette() {
        $scope.loading = true;
        ColourLoversApi.getRandomPalette().then(function(response) {
            $scope.data = response.data[0];
            $scope.loading = false;
        }, function(error) {
            $scope.loading = false;
            console.log(error)
        }, function(notify) {
            console.log(notify)
        });
    };

    $scope.randomPaletteByColor = function randomPaletteByColor(color) {
        $scope.loading = true;
        ColourLoversApi.getRandomPaletteByColor(color).then(function(response) {
            var length = response.data.length,
                randomChoice = Math.floor(Math.random() * length);

            $scope.data = response.data[randomChoice];
            $scope.loading = false;
        }, function(error) {
            $scope.loading = false;
            console.log(error)
        }, function(notify) {
            console.log(notify)
        });
    };

    $scope.savePalette = function savePalette(paletteData) {
        var palettes = localStorageService.get('Palettes'),
            alreadyAdded = false;

        if (palettes) {
            alreadyAdded = palettes.some(function(palette) {
                return paletteData.id === palette.id;
            });

            if (alreadyAdded) {
                return false;
            }

            palettes.push(paletteData);
            localStorageService.set('Palettes', palettes);
            $scope.savedPalettesData = palettes;
        } else {
            localStorageService.set('Palettes', [paletteData]);
            $scope.savedPalettesData = [paletteData];
        }

        $scope.loadPalette(paletteData);
        $scope.$broadcast('liked', paletteData);
    };

    $scope.removePalette = function removePalette(paletteData) {
        $scope.savedPalettesData = $scope.savedPalettesData.filter(function(savedPalette) {
            return savedPalette.id !== paletteData.id;
        });

        localStorageService.set('Palettes', $scope.savedPalettesData);

        $scope.loadPalette(paletteData);
        $scope.$broadcast('unliked', paletteData);
    };;

    $scope.randomPalette();

    if (localStorageService.get('Palettes')) {
        $scope.savedPalettesData = localStorageService.get('Palettes');
    } else {
        localStorageService.set('Palettes', []);
        $scope.savedPalettesData = [];
    }
}]);

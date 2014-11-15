angular.module('App').controller('AppController', [
        '$scope', 'localStorageService', 'ColourLoversApi',
function($scope,   localStorageService,   ColourLoversApi) {
    var appController = this;

    appController.data = null;
    appController.savedPalettesData = null;
    appController.loading = true;

    function loadPalette(palette) {
        appController.data = palette;
    }

    function randomPalette() {
        appController.loading = true;

        ColourLoversApi.getRandomPalette().then(function(response) {
            loadPalette(response.data[0]);
            appController.loading = false;
        }, function(error) {
            appController.loading = false;
        });
    }

    function savePalette(paletteData) {
        var palettes = localStorageService.get('Palettes'),
            alreadyAdded = false;

        if (palettes) {
            alreadyAdded = palettes.some(function(palette) {
                return (paletteData.id === palette.id);
            });

            if (alreadyAdded) return;

            palettes.push(paletteData);
            localStorageService.set('Palettes', palettes);
            appController.savedPalettesData = palettes;
        } else {
            localStorageService.set('Palettes', [paletteData]);
            appController.savedPalettesData = [paletteData];
        }

        loadPalette(paletteData);
        $scope.$broadcast('liked', paletteData);
    }

    function removePalette(paletteData) {
        appController.savedPalettesData = appController.savedPalettesData.filter(function(savedPalette) {
            return savedPalette.id !== paletteData.id;
        });

        localStorageService.set('Palettes', appController.savedPalettesData);

        loadPalette(paletteData);
        $scope.$broadcast('unliked', paletteData);
    }

    $scope.$on('loadPalette', function(event, palette) {
        loadPalette(palette);
    });

    $scope.$on('randomPalette', randomPalette);

    $scope.$on('savePalette', function(event, palette) {
        savePalette(palette);
    });

    $scope.$on('removePalette', function(event, palette) {
        removePalette(palette);
    });

    (function resolve() {
        randomPalette();

        if (localStorageService.get('Palettes')) {
            appController.savedPalettesData = localStorageService.get('Palettes');
        } else {
            localStorageService.set('Palettes', []);
            appController.savedPalettesData = [];
        }
    })();
}]);

angular.module("App", [ "ngAnimate", "LocalStorageModule" ]).config([ "$animateProvider", function($animateProvider) {
    $animateProvider.classNameFilter(/cl-animate/);
} ]), angular.module("App").factory("ColourLoversApi", function($http) {
    var exports, API_BASE_PATH, API_PALETTES_PATH, CALLBACK;
    return exports = {}, API_BASE_PATH = "https://www.colourlovers.com/api/", API_PALETTES_PATH = API_BASE_PATH + "palettes/", 
    API_FORMAT = "format=json", CALLBACK = "&jsonCallback=JSON_CALLBACK", exports.getRandomPalette = function() {
        var url, params;
        return params = "random?", url = API_PALETTES_PATH + params + API_FORMAT + CALLBACK, 
        $http({
            method: "JSONP",
            url: url
        });
    }, exports.getRandomPaletteByColor = function(color) {
        var url, params, offset;
        return offset = 0, params = "?hex=" + color + "&numResults=20&resultOffset=" + offset + "&", 
        url = API_PALETTES_PATH + params + API_FORMAT + CALLBACK, $http({
            method: "JSONP",
            url: url
        });
    }, exports;
}), angular.module("App").controller("AppController", [ "$scope", "localStorageService", "ColourLoversApi", "$animate", function($scope, localStorageService, ColourLoversApi) {
    $scope.data = null, $scope.savedPalettesData = null, $scope.loading = !0, $scope.$on("loadPalette", function(event, palette) {
        $scope.loadPalette(palette);
    }), $scope.$on("randomPalette", function() {
        $scope.randomPalette();
    }), $scope.$on("savePalette", function(event, palette) {
        $scope.savePalette(palette);
    }), $scope.$on("removePalette", function(event, palette) {
        $scope.removePalette(palette);
    }), $scope.loadPalette = function(palette) {
        $scope.data = palette;
    }, $scope.randomPalette = function() {
        $scope.loading = !0, ColourLoversApi.getRandomPalette().then(function(response) {
            $scope.data = response.data[0], $scope.loading = !1;
        }, function(error) {
            $scope.loading = !1, console.log(error);
        }, function(notify) {
            console.log(notify);
        });
    }, $scope.randomPaletteByColor = function(color) {
        $scope.loading = !0, ColourLoversApi.getRandomPaletteByColor(color).then(function(response) {
            var length = response.data.length, randomChoice = Math.floor(Math.random() * length);
            $scope.data = response.data[randomChoice], $scope.loading = !1;
        }, function(error) {
            $scope.loading = !1, console.log(error);
        }, function(notify) {
            console.log(notify);
        });
    }, $scope.savePalette = function(paletteData) {
        var palettes = localStorageService.get("Palettes"), alreadyAdded = !1;
        if (palettes) {
            if (alreadyAdded = palettes.some(function(palette) {
                return paletteData.id === palette.id;
            })) return !1;
            palettes.push(paletteData), localStorageService.set("Palettes", palettes), $scope.savedPalettesData = palettes;
        } else localStorageService.set("Palettes", [ paletteData ]), $scope.savedPalettesData = [ paletteData ];
        $scope.loadPalette(paletteData), $scope.$broadcast("liked", paletteData);
    }, $scope.removePalette = function(paletteData) {
        $scope.savedPalettesData = $scope.savedPalettesData.filter(function(savedPalette) {
            return savedPalette.id !== paletteData.id;
        }), localStorageService.set("Palettes", $scope.savedPalettesData), $scope.loadPalette(paletteData), 
        $scope.$broadcast("unliked", paletteData);
    }, $scope.randomPalette(), localStorageService.get("Palettes") ? $scope.savedPalettesData = localStorageService.get("Palettes") : (localStorageService.set("Palettes", []), 
    $scope.savedPalettesData = []);
} ]), angular.module("App").filter("colorContrast", function() {
    var hexToRgb = function(color) {
        var r, g, b;
        return r = parseInt(color.slice(0, 2), 16), g = parseInt(color.slice(2, 4), 16), 
        b = parseInt(color.slice(4, 6), 16), {
            r: r,
            g: g,
            b: b
        };
    }, getBrightness = function(rgb) {
        var sum = rgb.r + rgb.g + rgb.b;
        return Math.round(sum / 765 * 100);
    };
    return function(color) {
        var rgb = hexToRgb(color), brightness = getBrightness(rgb);
        return 50 > brightness ? "dark" : "";
    };
}), angular.module("App").filter("hexToRgba", function() {
    var hexToRgb = function(color) {
        var r, g, b;
        return r = parseInt(color.slice(0, 2), 16), g = parseInt(color.slice(2, 4), 16), 
        b = parseInt(color.slice(4, 6), 16), {
            r: r,
            g: g,
            b: b
        };
    };
    return function(color) {
        var rgb = hexToRgb(color);
        return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 1)";
    };
}), angular.module("App").directive("info", function() {
    return {
        restrict: "E",
        templateUrl: "src/scripts/directives/info/info.html",
        link: function(scope, elem) {
            scope.$on("toggleInfo", function() {
                elem.toggleClass("active"), scope.$broadcast("hideSavedPalettes");
            }), scope.$on("hideInfo", function() {
                elem.removeClass("active");
            });
        }
    };
}), angular.module("App").directive("likedFeedback", [ "$animate", function($animate) {
    return {
        restrict: "E",
        templateUrl: "src/scripts/directives/liked-feedback/liked-feedback.html",
        link: function($scope, $elem) {
            var likedElement, unlikedElement;
            likedElement = $elem[0].querySelector(".liked-feedback"), unlikedElement = $elem[0].querySelector(".unliked-feedback"), 
            $scope.$on("liked", function() {
                $animate.addClass(likedElement, "animate").then(function() {
                    likedElement.classList.remove("animate");
                });
            }), $scope.$on("unliked", function() {
                $animate.addClass(unlikedElement, "animate").then(function() {
                    unlikedElement.classList.remove("animate");
                });
            });
        }
    };
} ]), angular.module("App").directive("onClickFocus", function() {
    return {
        restrict: "A",
        scope: {},
        link: function($scope, $element) {
            $element.bind("click", function() {
                $element[0].select();
            });
        }
    };
}), angular.module("App").directive("palette", function() {
    return {
        restrict: "E",
        scope: {
            colors: "="
        },
        templateUrl: "src/scripts/directives/palette/palette.html"
    };
}), angular.module("App").directive("paletteInfo", [ "$rootScope", function($rootScope) {
    return {
        restrict: "E",
        scope: {
            infoData: "=",
            savedPalettes: "="
        },
        templateUrl: "src/scripts/directives/palette-info/palette-info.html",
        link: function(scope, elem) {
            var infoButton, savedPalettesButton;
            infoButton = elem[0].querySelector(".toggle-info-button"), savedPalettesButton = elem[0].querySelector(".toggle-saved-palettes-button"), 
            infoButton.addEventListener("click", function() {
                infoButton.classList.toggle("active"), savedPalettesButton.classList.remove("active"), 
                $rootScope.$broadcast("toggleInfo");
            }, !1), savedPalettesButton.addEventListener("click", function() {
                savedPalettesButton.classList.toggle("active"), infoButton.classList.remove("active"), 
                $rootScope.$broadcast("toggleSavedPalettes");
            }, !1), scope.randomPalette = function() {
                $rootScope.$broadcast("randomPalette");
            }, scope.likePalette = function(palette) {
                $rootScope.$broadcast("savePalette", palette);
            }, scope.unlikePalette = function(palette) {
                $rootScope.$broadcast("removePalette", palette);
            };
        }
    };
} ]), angular.module("App").directive("savedPalettes", function() {
    return {
        restrict: "E",
        scope: {
            palettes: "="
        },
        templateUrl: "src/scripts/directives/saved-palettes/saved-palettes.html",
        link: function(scope, elem) {
            scope.loadPalette = function(palette) {
                scope.$emit("loadPalette", palette);
            }, scope.$on("toggleSavedPalettes", function() {
                elem.toggleClass("active"), scope.$emit("hideInfo");
            }), scope.$on("hideSavedPalettes", function() {
                elem.removeClass("active");
            });
        }
    };
});
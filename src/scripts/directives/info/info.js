angular.module('App').directive('info', function() {
    return {
        restrict : 'E',
        templateUrl : 'src/scripts/directives/info/info.html',
        link : function(scope, elem) {
            scope.$on('toggleInfo', function(event) {
                elem.toggleClass('active');
                scope.$broadcast('hideSavedPalettes');
            });

            scope.$on('hideInfo', function() {
                elem.removeClass('active');
            });
        }
    }
});

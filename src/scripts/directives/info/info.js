angular.module('App').directive('info', function() {
    return {
        restrict : 'E',
        templateUrl : 'src/scripts/directives/info/info.html',
        link : function($scope, $element) {
            $scope.$on('toggleInfo', function() {
                $element.toggleClass('active');
                $scope.$broadcast('hideSavedPalettes');
            });

            $scope.$on('hideInfo', function() {
                $element.removeClass('active');
            });
        }
    }
});

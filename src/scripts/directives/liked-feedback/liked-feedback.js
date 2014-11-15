angular.module('App').directive('likedFeedback', ['$animate', function($animate) {
    return {
        restrict : 'E',
        templateUrl : 'src/scripts/directives/liked-feedback/liked-feedback.html',
        link : function($scope, $element) {
            var likedElement, unlikedElement;

            likedElement = $element[0].querySelector('.liked-feedback');
            unlikedElement = $element[0].querySelector('.unliked-feedback');

            $scope.$on('liked', function() {
                $animate.addClass(likedElement, 'animate').then(function() {
                    likedElement.classList.remove('animate');
                });
            });

            $scope.$on('unliked', function() {
                $animate.addClass(unlikedElement, 'animate').then(function() {
                    unlikedElement.classList.remove('animate');
                });
            });
        }
    }
}]);

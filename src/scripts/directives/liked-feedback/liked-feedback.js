angular.module('App').directive('likedFeedback', ['$animate', function($animate) {
    return {
        restrict : 'E',
        templateUrl : 'src/scripts/directives/liked-feedback/liked-feedback.html',
        link : function($scope, $elem) {
            var likedElement, unlikedElement;

            likedElement = $elem[0].querySelector('.liked-feedback');
            unlikedElement = $elem[0].querySelector('.unliked-feedback');

            $scope.$on('liked', function(event) {
                $animate.addClass(likedElement, 'animate').then(function() {
                    likedElement.classList.remove('animate');
                });
            });

            $scope.$on('unliked', function(event) {
                $animate.addClass(unlikedElement, 'animate').then(function() {
                    unlikedElement.classList.remove('animate');
                });
            });
        }
    }
}]);

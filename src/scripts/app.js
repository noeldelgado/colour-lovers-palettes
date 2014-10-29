angular.module('App', ['ngAnimate', 'LocalStorageModule'])
.config(['$animateProvider', function($animateProvider) {
    $animateProvider.classNameFilter(/cl-animate/);
}]);

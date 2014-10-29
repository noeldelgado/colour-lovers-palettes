angular.module('App').filter('untitled', function() {
    return function(value) {
        return value || 'Untitled';
    };
});

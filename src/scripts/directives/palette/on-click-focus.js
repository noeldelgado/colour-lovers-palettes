angular.module('App').directive('onClickFocus', function() {
    return {
        restrict : 'A',
        scope : {},
        link : function link($scope, $element) {
            $element.bind('click', function() {
                $element[0].select();
            });
        }
    }
});

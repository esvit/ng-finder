(function(angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define('ngFinder', ['jquery', 'angular', 'elfinder'], function($, angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(angular || null, function(angular) {
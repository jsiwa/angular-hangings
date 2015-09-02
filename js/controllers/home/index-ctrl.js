define([
    "lodash",
    "../controllers"
], function(_, controllers){
    "use strict";

    return controllers.controller('Index', ["$scope", "PromiseQueue", function($scope, PromiseQueue){

        _.extend($scope, {
            name: 'index'
        });

    }]);
});
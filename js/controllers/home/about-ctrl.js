define([
    "lodash",
    "../controllers"
], function(_, controllers){
    "use strict";

    return controllers.controller('About', ["$scope", function($scope){

        _.extend($scope, {
            name: 'about'
        });

    }]);
});
define([
    "lodash",
    "angular",
    "./views/views",
    "./config/routes",
    "./config/path",
    "angular-route",
    "angular-resource",
    "angular-messages",


    "./filters/home/countdown",

    "./services/promise-queue",

    "./directives/countdown",

    "./controllers/home/index-ctrl",
    "./controllers/home/about-ctrl"

], function(_, angular, views, routes, path){
    "use strict";

    var app = angular.module("qiezi",[
            "ngRoute",
            "ngResource",
            "ngMessages",
            "qiezi.filters",
            "qiezi.services",
            "qiezi.directives",
            "qiezi.controllers"
        ])
        .value("version", "1.0")
        .config(["$provide", function($provide){
            $provide.decorator('$rootScope', ['$delegate', function ($delegate) {
                $delegate.constructor.prototype.PATH = path;
                return $delegate;
            }]);
        }])
        .config(routes)
        .run(views);

    return {
        init: function(){
            angular.element().ready(function () {
                angular.bootstrap(document.body, [app.name]);
            });
        }
    };
});
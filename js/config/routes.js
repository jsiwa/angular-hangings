define(["./path"], function(path){
    "use strict";

    return ["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

        $locationProvider.html5Mode(false).hashPrefix('!');

        $routeProvider
            // .when('/',{
            //     redirectTo: '/home/ALL'
            // })
            .when('/', {
                redirectTo: '/home/index/'
            })
            .when('/home/', {
                redirectTo: '/home/index/'
            })
            .when('/home/index/',{
                templateUrl: path.view + "home/index.html",
                module: 'index'
            })
            .when('/home/about/', {
                templateUrl: path.view + "home/about.html",
                reloadOnSearch: false,
                module: 'about'
            })
            .otherwise({
                templateUrl: path.view + "404.html"
            });
    }];
});
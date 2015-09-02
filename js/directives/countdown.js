define([
    "jquery",
    "moment",
    "./directives",
    "text!../templates/countdown.html"
], function($, moment, directives, template){
    "use strict";

    var day_milliseconds    = 3600*1000*24,
        hour_milliseconds   = 3600*1000,
        minute_milliseconds = 60*1000;

    return directives.directive("countdown", ["$timeout", "$window", function($timeout, $window){

        return {
            restrict: "EA",
            scope:{
                time: "="
            },
            replace: true,
            template: template,
            link: function(scope, iElement, iAttrs){
                var $el     = $(iElement),
                    time    = moment(scope.time).toDate(),
                    days    = 0,
                    hours   = 0,
                    minutes = 0,
                    seconds = 0,
                    tid     = 0;

                function tick(){
                    var text          = "",
                        milliseconds  = time - (new Date());

                    days = milliseconds ? Math.floor(milliseconds/day_milliseconds) : 0;
                    milliseconds  %= day_milliseconds;

                    if(days > 0){
                        text += days + "天";
                    }

                    hours = milliseconds ? Math.floor(milliseconds/hour_milliseconds) : 0;

                    milliseconds %= hour_milliseconds;

                    if(text || hours > 0){
                        text += hours + "小时";
                    }

                    minutes = milliseconds ? Math.floor(milliseconds/minute_milliseconds) : 0;

                    milliseconds %= minute_milliseconds;

                    if(text || minutes > 0){
                        text += minutes + "分钟";
                    }

                    seconds = milliseconds ? Math.floor(milliseconds/1000) : 0;
                    if(text || seconds > 0){
                        text += seconds + "秒";
                    }

                    $el.text(text);

                    tid = $timeout(function(){
                        tick();
                    }, 1000);
                }

                tick();

                scope.$watch("time", function(curr){
                    time = moment(scope.time).toDate();
                    tick();
                });

                scope.$on("$destroy", function(){
                    $window.clearTimeout(tid);
                });
            }
        };
    }]);
});
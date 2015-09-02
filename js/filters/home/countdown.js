/*
 * 倒计时
 */
define([
    "moment",
    "../filters"
], function(moment, filters){
    "use strict";

    var day_milliseconds    = 3600*1000*24,
        hour_milliseconds   = 3600*1000,
        minute_milliseconds = 60*1000;

    return filters.filter("countdown", function(){
        return function(str){
            var text = "", date = moment(new Date(str)), now = new Date();
            if(date.isValid()){
                var milliseconds = date.diff(now),
                    days          = Math.floor(milliseconds/day_milliseconds),
                    hours         = Math.floor(milliseconds/hour_milliseconds),
                    minutes       = Math.floor(milliseconds/minute_milliseconds);

                if(hours > 24){
                    days = Math.ceil(hours/24);
                }

                if(days > 0){
                    text = days + "天";
                }else if(hours > 1){
                    text = hours + "小时";
                }else if(minutes > 0){
                    text = minutes + "分钟";
                }

            }
            return text;
        };
    });
});
define([
    "lodash",
    "../config/path",

    "text!./404.html",
    "text!./home/index.html",
    "text!./home/about.html"

], function(
    _,
    path,
    NotFound,
    home_index,
    home_about
){
    "use strict";

    var hash = {
        "404.html": NotFound,
        "home/index.html": home_index,
        "home/about.html": home_about
    };

    return ["$templateCache", function($templateCache){
        _.each(hash, function(tmpl, key){
            $templateCache.put(path.view + key, tmpl);
        });
    }];
});
"use strict";

module.exports = {

    parseRedditResults: function(res) {
        var input = JSON.parse(res);
        var result = input.data.children;

        if (result.length == 0) {return result};

        var parsedResult = result.map(function(i) {
            return JSON.parse("{" +
                '"id": "' + i.data.id + '",' +
                '"permalink": "' + i.data.permalink + '",' +
                '"url": "' + i.data.url + '",' +
                '"author": "' + i.data.author + '"'
                + "}"
            );
        });

        return parsedResult;
    },

    fetchFromRedditResults: function(reddit, favoriteList) {
        var redditResultHashMap = {};
        for (var i = 0; i < reddit.length; i++) {
            var redditId = reddit[i].id;
            redditResultHashMap[redditId] = reddit[i];
        }

        return favoriteList.map(function(el) {
            var id = el.redditId;
            var tag = el.tag;

            var redditRes = redditResultHashMap[id];
            if (redditRes != null) {
                if (tag !=  null) {
                    redditRes.tag = tag;
                }
                return redditRes;
            } else {
                return el;
            }
        });
    }
};
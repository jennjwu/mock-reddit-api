"use strict";

module.exports = {

    parseRedditResults: function(res) {
        var input = JSON.parse(res);
        var result = input.data.children;
        console.log("got total reddit items", result.length);

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
    }
};
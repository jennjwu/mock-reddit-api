"use strict";

const PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
var mongo = require("./mongoConnection");
var helper = require("./helper");
var https = require("https");

app.get("/", function (req, res) {
    logRequest(req, null);
    res.json("hello world");
});

app.post("/users", function(req, res) {
    var body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });
    req.on("end", () => {
        logRequest(req, body);

        try {
            var requestBody = JSON.parse(body);
            mongo.create(requestBody.username, requestBody.password, function(response) {
                if (response == null) {
                    res.status(500).end();
                } else {
                    res.status(200).json({"accessKey": response}).end();
                }
            });
        } catch (ex) {
            res.status(422).json({"error": "body cannot be parsed to JSON"}).end();
        }
    });
});

app.post("/users/login", function(req, res) {
    var body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });
    req.on("end", () => {
        logRequest(req, body);

        try {
            var requestBody = JSON.parse(body);
            mongo.login(requestBody.username, requestBody.password, function(response) {
                if (response == null) {
                    res.status(404).json({"error": "no such user found"}).end();
                } else {
                    res.status(200).json({"accessKey": response}).end();
                }
            });
        } catch (ex) {
            console.log(ex);
            res.status(422).json({"error": "body cannot be parsed to JSON"}).end();
        }
    });
});

app.get("/reddit", function(req, res) {
    logRequest(req, null);
    var accessKey = req.header("access-key");
    mongo.auth(accessKey, function(valid) {
        if (valid) {
            var redditRequestUrl = "https://www.reddit.com/hot.json";
            var request = https.request(redditRequestUrl, function(response) {
                var data = "";
                response.on("data", (chunk) => {
                    data += chunk.toString();
                });
                response.on("end", () => {
                    var results = helper.parseRedditResults(data);
                    res.status(200).json(results).end();
                });
            });

            request.end();
        } else {
            res.status(401).json({"error": "invalid access key"}).end();
        }
    });
});

// helper to log requests to server
function logRequest(req, body) {
    console.log("Server received", req.method, "request on", req.url);
    if (body != null) {
        console.log("with body")
        console.log(body);
    }
}

var startServer = app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = startServer;

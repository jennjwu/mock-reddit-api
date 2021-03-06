"use strict";

const PORT = process.env.PORT || 3000;
const REDDIT_REQUEST_URL = "https://www.reddit.com/hot.json";

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
            if (requestBody.username == null || requestBody.password == null) {
                res.status(422).json({"error": "required username and password fields not provided"}).end();
            } else {
                mongo.create(requestBody.username, requestBody.password, function(response) {
                    if (response == null) {
                        res.status(500).end();
                    } else {
                        res.status(200).json({"accessKey": response}).end();
                    }
                });
            }
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
            if (requestBody.username == null || requestBody.password == null) {
                res.status(422).json({"error": "required username and password fields not provided"}).end();
            } else {
                mongo.login(requestBody.username, requestBody.password, function(response) {
                    if (response == null) {
                        res.status(404).json({"error": "no such user found"}).end();
                    } else {
                        res.status(200).json({"accessKey": response}).end();
                    }
                });
            }
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
            var request = https.request(REDDIT_REQUEST_URL, function(response) {
                var data = "";
                response.on("data", (chunk) => {
                    data += chunk.toString();
                });
                response.on("end", () => {
                    try {
                        var results = helper.parseRedditResults(data);
                        res.status(200).json(results).end();
                    } catch(ex) {
                        console.log(ex);
                        res.status(500).json({"error": ex.message}).end();
                    }
                });
            });

            request.end();
        } else {
            res.status(401).json({"error": "invalid access key"}).end();
        }
    });
});

app.get("/favorites", function(req, res) {
    logRequest(req, null);
    var accessKey = req.header("access-key");
    mongo.auth(accessKey, function(valid) {
        if (valid) {
            mongo.getFavorites(accessKey, function(response) {
                if (response == null) {
                    res.status(404).json({"error": "no such user found"}).end();
                } else {
                    var userFavorites = response;
                    // no favorites
                    if (userFavorites.favorites == null) {
                        res.status(200).json([]).end();
                    } else {
                        // go to reddit to get details
                        var request = https.request(REDDIT_REQUEST_URL, function(response) {
                            var data = "";
                            response.on("data", (chunk) => {
                                data += chunk.toString();
                            });
                            response.on("end", () => {
                                var redditRes = helper.parseRedditResults(data);
                                var augRes = helper.fetchFromRedditResults(redditRes, userFavorites.favorites);
                                res.status(200).json(augRes).end();
                            });
                        });

                        request.end();
                    }
                }
            });
        } else {
            res.status(401).json({"error": "invalid access key"}).end();
        }
    });
});

app.post("/favorites", function(req, res) {
    var body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });
    req.on("end", () => {
        logRequest(req, body);

        var accessKey = req.header("access-key");

        try {
            var favorite = JSON.parse(body);
            if (favorite != null) {
                mongo.auth(accessKey, function(valid) {
                    if (valid) {
                        mongo.saveFavorite(accessKey, favorite, function(response) {
                            if (response == null) {
                                res.status(404).json({"error": "no such user found"}).end();
                            } else {
                                res.status(201).json({"message": "favorite added successfully"}).end();
                            }
                        });
                    } else {
                        res.status(401).json({"error": "invalid access key"}).end();
                    }
                });
            } else {
                res.status(422).json({"error": "favoriteId not provided in body"}).end();
            }
        } catch (ex) {
            res.status(422).json({"error": "invalid body provided"}).end();
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

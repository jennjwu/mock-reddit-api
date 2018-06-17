"use strict";

const PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();

app.get("/", function (req, res) {
    logRequest(req, null);
    res.json("hello world");
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

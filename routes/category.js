var express = require('express');
var mongoose = require("mongoose");

var router = express.Router();
var Category = require("../models/Category");
var Pay = require("../models/Pay");
var Fund = require("../models/Fund");
router.get("/create", (req, res) => {
    res.send("create");
});
router.post("/create", (req, res) => {
    new Category({
        Name: req.body.Name,
        SystemName: req.body.SystemName,
        DefaultAmount: req.body.DefaultAmount,
        DisplayOrder: req.body.DisplayOrder,
        Active: req.body.Active,
    }).
        save().
        then(data => res.redirect("/"));
});

module.exports = router;
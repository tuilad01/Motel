var express = require('express');
var mongoose = require("mongoose");

var router = express.Router();
var Category = require("../models/Category");
var Pay = require("../models/Pay");
var Fund = require("../models/Fund");
router.get('/drinkwater', (req, res) => {
    Category.
        findOne({ SystemName: "nuocvina" }).
        exec().
        then(category => {
            if (!category) {
                console.log(category);
                return;
            }
            const payItem = new Pay({
                Name: category.Name,
                Amount: category.DefaultAmount,
                Categorys: category._id
            });
            payItem.
                save().
                then(payNew => {
                    Fund.
                        findOne().
                        sort("-CreatedAt").
                        exec().
                        then(fundOld => {
                            if (!fundOld) res.redirect("/");
                            const fundNew = new Fund({
                                Amount: fundOld.Amount - payNew.Amount
                            });
                            fundNew.
                                save().
                                then(fundResponse => res.redirect("/"));
                        })
                });

        });
});

module.exports = router;
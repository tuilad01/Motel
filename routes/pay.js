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

router.get('/paid', (req, res) => {
    var systemName = req.query.SystemName;

    if (!systemName) return res.redirect("/");

    Category.
        findOne({ SystemName: systemName }).
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

router.post("/divide", (req, res) => {
    var money = parseFloat(req.body.Fund);

    Fund.findOne().sort("-CreatedAt").exec().then(fundOld => {
        if (!fundOld) res.redirect("/");
        console.log(fundOld);
        var divideMoney = (Math.abs(fundOld.Amount) + money) / 8;
        console.log(divideMoney);
        res.render("divideconfirm", {
            money: {
                fund: money,
                total: divideMoney
            }
        });
    });

});
module.exports = router;
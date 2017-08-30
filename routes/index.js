var express = require('express');
var session = require('express-session');
var mongoose = require("mongoose");

var router = express.Router();
var Category = require("../models/Category");
var Pay = require("../models/Pay");
var Fund = require("../models/Fund");
var config = require("../config");

/* GET home page. */
router.get('/', function (req, res, next) {

  var sess = req.session.someAttribute;
  if (sess === config.username) {
    var categorys = Category.find({}).sort('-_id').exec();
    var pays = Pay.find({}).sort('-_id').exec();
    var fund = Fund.findOne().sort('-CreatedAt').exec();
    Promise.all([categorys, pays, fund]).
      then((data) => {
        res.render("index", {
          title: "Motel",
          categorys: data[0] ? data[0] : [new Category()],
          pays: data[1] ? data[1] : [new Pay()],
          fund: data[2] ? data[2] : new Fund()
        });
      });
    return;
  }
  res.redirect("/login");

});
router.get('/login', (req, res) => {
  res.render("login");
});
router.post('/login', function (req, res, next) {
  if (req.body.username === config.username
    && req.body.password === config.password) {
    req.session.someAttribute = config.username;
    res.redirect("/");
    return;
  }
  res.render("login");

});
router.get("/logout", (req, res) => {
  req.session.someAttribute = "";
  res.redirect("/");
});

router.get("/install", (req, res) => {
  var fund = new Fund({
    Amount: 0
  });
  fund.save().then(data => {
    res.send("Ok");
  });
});
module.exports = router;

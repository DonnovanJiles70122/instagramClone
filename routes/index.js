var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotector').userIsLoggedIn;
var getRecentPosts = require('../middleware/postmiddleware').getRecentPosts;
var db = require("../config/database");

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', {title:"Home"});
});

router.get('/login', (req, res) => {
  res.render("login", {title:"Login"});
});

router.get('/registration', (req, res) => {
  res.render("registration", {title:"Register"});
});

router.get('/postimage', isLoggedIn, (req, res) => {
  res.render("postimage", {title:"Post Image"});
});



router.get('/post/:id(\\d+)',(req, res, next) => {
  let baseSQL =
      "SELECT u.username, p.title, p.description, p.photopath, p.created\n" +
      "FROM mydb.users u\n" +
      "JOIN mydb.post p \n" +
      "ON u.id=fk_userid\n" +
      "WHERE p.id=?;";

  let postId = req.params.id;
  db.execute(baseSQL,[postId])
      .then(([results, fields]) => {
        if(results && results.length){
          let post = results[0];
          res.render('Imagepost',{currentPost: post});
        }else{
          req.flash('error','This is not the post you are looking for');
          res.redirect('/');
        }
      })
});


module.exports = router;

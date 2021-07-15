var express = require('express');
var router = express.Router();
const UserModel = require('../models/Users');
var db = require('../config/database');
const UserError = require("../helpers/error/UserError");
const { successPrint, errorPrint } = require("../helpers/debug/debugPrinters");
var bcrypt = require("bcrypt");




router.post('/register', (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPW = req.body.password;

    // UserModel.usernameExists(username)
    //     .then((usernameDoesExist) => {
    //         if(usernameDoesExist){
    //             throw new UserError(
    //                 "Registration Failed: username already exists",
    //                 "/registration",
    //                 200
    //             );
    //         }else{
    //             return UserModel.emailExists(email)
    //         }
    //     })
    //     .then ((emailDoesExist) => {
    //         if(emailDoesExist) {
    //             throw new UserError(
    //                 "Registration Failed: username already exists",
    //                 "/registration",
    //                 200
    //             );
    //         }else{
    //             return UserModel.create(username, password, email);
    //         }
    //     })
    //     .then((createdUserId) => {
    //         if(createdUserId < 0){
    //             throw new UserError(
    //                 "Server Error, user could not be created",
    //                 "/registration",
    //                 500
    //             );
    //         } else{
    //             successPrint("User.js --> user was created");
    //             req.flash('success', 'User account has been made!');
    //             res.redirect('/login');
    //         }
    //     }).catch((err) => {
    //     errorPrint("user could not be made", err);
    //     if(err instanceof UserError){
    //         errorPrint(err.getMessage());
    //         req.flash('error', err.getMessage());
    //         res.status(err.getStatus());
    //         res.redirect(err.getRedirectURL());
    //     }else{
    //         next(err);
    //     }
    // });


    db.execute("SELECT * FROM users WHERE username=?",[username])
        .then(([results, fields]) => {
            if( results && results.length === 0) {
                return db.execute("SELECT * FROM users WHERE email=?",[email]);
            } else {
                throw new UserError(
                    "Registration Failed: username already exists",
                    "/registration",
                    200
                );
            }
        })
        .then(([results, fields]) => {
            if( results && results.length === 0) {
                let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now());"
                return db.execute(baseSQL, [username, email, password])
            } else {
                throw new UserError(
                    "Registration Failed: Email already exists",
                    "/registration",
                    200
                );
            }
        })
        .then(([results, fields]) =>{
            if(results && results.affectedRows){
                successPrint("User.js --> user was created");
                req.flash('success', 'User account has been made!');
                res.redirect('/login');
            }else{
                throw new UserError(
                    "Server Error, user could not be created",
                    "/registration",
                    500
                );
            }
        })
        .catch((err) => {
            errorPrint("user could not be made", err);
            if(err instanceof UserError){
                errorPrint(err.getMessage());
                req.flash('error', err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            }else{
                next(err);
            }
    });
});

router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let baseSQL = "SELECT id, username, password FROM users WHERE username=? AND password=?;";
    let userId;

    db.execute(baseSQL, [username, password])
        .then(([results, fields]) => {
            if(results && results.length === 1){
                successPrint(`User ${username} is logged in`);
                userId = results[0].id;
                req.session.userId = userId;
                req.session.username = username;
                res.locals.logged = true;
                req.flash('success', 'You have been successfully logged in!');
                res.redirect('/');
            }else{
                throw new UserError("Invalid username", "/login", 200)
            }
        })
        .catch((err) => {
            errorPrint("user login failed");
            if(err instanceof UserError){
                errorPrint(err.getMessage());
                req.flash('error', err.getMessage());
                res.status(err.getStatus());
                res.redirect('/login');
            }else{
                next(err)
            }
        });
});

router.post('/logout', (req, res, next) => {
   req.session.destroy((err) => {
       if(err){
           errorPrint('session could not be destroyed.');
           next(err);
       }else{
           successPrint('Session was destroyed');
           res.clearCookie('csid');
           res.json({status: "OK", message: "user is logged out"});
       }
   })
});

module.exports = router;

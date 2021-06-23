let mongoose = require('mongoose');
let router = require('express').Router();
let passport = require('passport');
let User = mongoose.model('User');
let auth = require('../auth');

router.post('/users/login', function (req, res, next) {

    if (!req.body.user.email) {
        return res.status(422).json({errors: {email: "can't be blank"}});
    }
    if (!req.body.user.password) {
        return res.status(422).json({errors: {password: "can't be blank"}});
    }

    passport.authenticate(
        'local',
        {session: false, algorithms: ["RS256"]},
        function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (user) {
                user.token = user.generateJWT();
                let x = user.toJSONFor()
                return res.json({user: x});
            } else {
                return res.status(422).json(info);
            }
        }
    )(req, res, next);
});

router.post('/users', function (req, res, next) {
    let re = /\S+@\S+\.\S+/;

    if (!req.body.user.name) {
        return res.status(422).json({errors: "name " + "can't be blank"});
    }
    if (!req.body.user.mobile) {
        return res.status(422).json({errors: "mobile no " + "can't be blank"});
    }
    if (!req.body.user.email) {
        return res.status(422).json({errors: "email " + "can't be blank"});
    } else if (!re.test(req.body.user.email)) {
        return res.status(422).json({errors: "email " + "format is wrong"});
    } else if (!User.find({email: req.body.user.email}).then(function (user) {
        if (user) {
            return 0
        } else {
            return 1
        }
    }).catch(function (err) {
        return 0
    })) {
        return res.status(422).json({errors: "email " + "already registared"});
    }
    if (!req.body.user.password) {
        return res.status(422).json({errors: "password " + "can't be blank"});
    }

    let user = new User();
    user.name = req.body.user.name;
    user.mobile = req.body.user.mobile;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);

    user.save().then(function () {
        let x = user.toJSONFor()
        return res.json({user: x});
    }).catch(next);
});

router.post('/logout', function (req, res) {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;
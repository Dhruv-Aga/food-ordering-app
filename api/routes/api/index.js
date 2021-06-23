let router = require('express').Router();

router.use('/', require('./users'));
router.use('/restaurants', require('./restaurants'));
router.use(function (req, res, next) {
    if (res.statusCode === 422) {
        const errors = res.error()
        return res.status(422).json({
            errors: Object.keys(errors).reduce(function (errors, key) {
                errors[key] = errors[key].message;

                return errors;
            }, {})
        });
    }
    return next(res);
});

module.exports = router;
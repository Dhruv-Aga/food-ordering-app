let router = require('express').Router();
let mongoose = require('mongoose');
let Restaurants = mongoose.model('Restaurants');
let auth = require('../auth');

router.get('/', auth.required, function (req, res, next) {
    const params = req.query
    let sort = {}
    let query = {}
    if (params.filter) {
        if (params.filter.name)
            query["name"] = {$regex: `.*${params.filter.name}.*`, $options: 'i'}
        if (params.filter.place)
            query["place"] = {$regex: `.*${params.filter.name}.*`, $options: 'i'}
        if (params.filter.cuisine)
            query["cuisines"] = {$elemMatch: {name: {$regex: `.*${params.filter.cuisine}.*`, $options: 'i'}}}
    }
    if (params.sort) {
        sort[params.sort] = 1
    }
    if (params.search) {
        query = {$text: {$search: params.search}}
    }
    Restaurants.find(query, {}).sort(sort).then(function (restaurants) {
        return res.status(200).json(restaurants.map(ele => ele.toJSONFor()));
    }).catch(next);
});

router.post('/', auth.required, function (req, res, next) {
    console.log(req.body)
    const rest = new Restaurants(req.body["restaurant"]);

    rest.save().then(function () {
        const data = rest.toJSON()
        return res.json({restaurant: data});
    }).catch(next);
});

module.exports = router;
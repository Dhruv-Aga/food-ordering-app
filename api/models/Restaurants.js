let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let RestaurantsSchema = new mongoose.Schema({
    shop_registration_no: {type: String, index: true},
    gst_no: {unique: true, type: String, index: true},
    owner_detail: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, index: true},
    location: {type: String, index: true},
    avg_price: Number,
    image: String,
    cuisines: [
        {
            name: {type: String, index: true},
            speciality: Boolean,
            images: String,
            quantity_available: [{
                price: Number,
                name: String,
            }],
            timestamps: {type: Date, default: new Date()},
        }
    ],
}, {timestamps: true});

RestaurantsSchema.index({name: "text", gst_no: "text", shop_registration_no: "text", location: "text"});
RestaurantsSchema.plugin(uniqueValidator, {message: 'Restaurant already Registered'});

RestaurantsSchema.methods.toJSONFor = function () {

    return {
        name: this.name,
        location: this.location,
        avg_price: this.avg_price,
        image: this.image,
        cuisines_count: this.cuisines.length
    };
};

mongoose.model('Restaurants', RestaurantsSchema);
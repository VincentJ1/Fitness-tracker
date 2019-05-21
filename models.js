const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ExerciseSchema = new Schema({
        user: {type: Object, minlength: 1},
        activity: {type: String, minlength: 1},
        exercisetype: {type: String},
        weight: {type: Number},
        reps: {type: Number},
        sets: {type: Number},
        description: {type: String},
        duration: {type: String, minlength: 1},
        date: {type: Date, default: Date.now}
});

/*
let NutritionSchema = new Schema({
    name: {type: String, required: true, max: 100},
    description: {type: String, required: false},
    calorie: {type: String, required: true, max: 100},
    quantity: {type: String, required: true, max: 100},
    date: {type: Date, default: Date.now, required: true}
});
*/


module.exports = mongoose.model('Exercise', ExerciseSchema);
/*module.exports = mongoose.model('Nutrition', NutritionSchema);*/
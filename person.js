var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/peopleDB', {
    useNewUrlParser: true
});

var Schema = mongoose.Schema;

var personSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    age: {
        type: Number,
        min: [10, "ur two yung 4 this"]
    },
    updated_at: Date,
    created_at: Date
});

personSchema.pre('save', function (next) {

    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

var Person = mongoose.model('Person', personSchema);

var david = new Person({
    firstName: "David",
    lastName: "Smith",
    age: 25
});
var hunter = new Person({
    firstName: "Hunter",
    lastName: "Wei",
    age: 23
});
var jona = new Person({
    firstName: "Jona",
    lastName: "Farache",
    age: 20
});
var bob = new Person({
    firstName: "bob",
    lastName: "Cohen",
    age: 30
});
// hunter.save();
// jona.save(function(err, res){
//     if(err){return console.error(err);
//      console.log(res)}
// })
// bob.save(function(err, res){
//     if(err){return console.error(err);
//     console.log(res)}
// })

// david.save()
// Person.find({age: 25}, function (error, result){
//     if(error) {return console.error(error);}
//     console.log(result)
// })

Person.findById(1, function (err, person) {
    if (err) console.error(err);
    console.log(person);
})

Person.findOneAndUpdate({
    age: 25
}, {
    firstName: 'Paul'
}, {
    new: true
}, function (err, person) {
    if (err) throw err;
    else console.log(person);
});

Person.remove({
    firstName: 'David'
}, function (err) {
    if (err) throw err;

    // we have deleted the person
    console.log('Person deleted!');
});
//......................................................//
// var beerSchema = new Schema ({
//     name: String,
//     abv: Number,
//     style: String
// });

// var Beer = mongoose.model('Beer', beerSchema)

// var carlsberg = new Beer({name: "carlsberg", abv: 5, style: "sassy"})
// console.log(carlsberg)
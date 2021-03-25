let envPath = __dirname + "/../.env"
require('dotenv').config({path:envPath});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise= global.Promise;

try {
    mongoose.connect( process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("connected"));
}catch (error) {
    console.log("could not connect");
}
mongoose.set('useCreateIndex', true);

var MovieSchema = new Schema({
    title:{type:String,required:true,index:{unique:true}},
    yearReleased:{type:Date, required:true},
    genre:{type:String,required:true,enum:['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Western'] },
    actors: { type: [{actorName: String, characterName: String}], required: true },
    ImageURI :{type: String, required: false},
    averageRating:{ type: Number, required:false}
});
module.exports = mongoose.model('Movie',MovieSchema);

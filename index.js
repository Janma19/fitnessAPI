const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const port = 4000;

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//MongoDB database connection
mongoose.connect("mongodb+srv://admin:admin1234@cluster0.jv4jyzj.mongodb.net/MTE?retryWrites=true&w=majority"
	);

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");


app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};
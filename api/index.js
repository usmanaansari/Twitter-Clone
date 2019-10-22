const path = require("path");
const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const app = express();
//Add User Routes
const configDefaults = require('./myConfig/default.json');


const connectDB = async() => {
	try{
		await mongoose.connect(configDefaults.mongoURI);
		console.log("MongoDB Connected");
	}
	catch(error){
		console.log(error.message);
		process.exit(1);
	}
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookie());
require('./routes/UserRoutes.js')(app);
require('./routes/ItemRoutes.js')(app);
require('./routes/SearchRoutes.js')(app);
connectDB();

app.listen(3000, () => console.log('Server running on port 3000'));

app.get("/", (req,res) => {
	res.sendFile(__dirname + "/" + "public/HTML/index.html");
});




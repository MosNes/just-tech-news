//captures env variables
require('dotenv').config();

//---------------------DEPENDENCIES AND GLOBAL VARIABLES--------------------------------------
const path = require('path');
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//required for users to see static assets in the public folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use(routes);

//-----------------------INITIALIZATIONS-----------------------------------------------------

// initialize database connection and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'))
})
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// importing env files
require('dotenv/config');

//importing api from envcd b
const api = process.env.API_URL;

//Routing Modules
const registerRoutes = require('./routes/RegisterRoutes');
const profileRoutes = require('./routes/ProfileRoutes');
const restaurentRoutes = require('./routes/RestaurentRoutes');

//Middleware
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routers
app.use(`${api}/register`, registerRoutes);
app.use(`${api}/profile`, profileRoutes);
app.use(`${api}/restuarent`, restaurentRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'foodfinder_db',
  })
  .then(() => {
    console.log('Database Connected successfully');
  })
  .catch(err => {
    console.log(err);
  });
app.get('/', (req, res) => {
  res.send('Your server is working now');
});

const Port = process.env.Port || 3000;
app.listen(Port, () => {
  // console.log(api);
  console.log('server is running http://localhost:3000');
});

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// Database config
const configureDBConnection = require('./database/dbConfig');

// Configuration of the MySQL database connection
const db = configureDBConnection();

// Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })); // if false then parse only strings 
require("./middlewares/cors")(app);

// Give access to the client for start only the server
app.use(express.static(path.join(__dirname, '../SPE-front/dist/spe-front')));

// routes
app.use("/api", require("./controllers/different"));
app.use("/api/user", require('./controllers/userController'));

// // To refresh client page using angular dom - not working
app.get("*", (req, res, next) => {
  const filePath = path.join(__dirname, '../SPE-front/dist/spe-front', 'index.html');
  res.sendFile(filePath);
});

// Establish the connection to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err);
  } else {
    console.log('Connection to the MySQL database successful');
  }
});


// hide express origin 
app.disable("x-powered-by");

// server configurations are here....
app.listen(port, () => {
  console.log(`Server started listening on port ${port}`);
});
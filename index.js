require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'adamsdb'
});

db.connect((error) => {
  if (error) throw error
  console.log('Connected to Database!');
});

app.get('/read', (request, response) => {
  const sqlSelect = "SELECT * FROM customers";
  db.query(sqlSelect, (error, result) => {
    response.send(result);
  });
});

// Read the details of a specific customer
app.get('/read/:id', (request, response) => {
  const id = request.params.id;
  const sqlSelect = "SELECT * FROM customers WHERE customer_id = ? ";

  db.query(sqlSelect, id, (error, result) => {
    if (error) console.log(error);
    response.send(result);
  } )
});


// Creating a new customer
app.post('/create', (request, response) => {
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const phone = request.body.phone;
  const email = request.body.email;
  const houseNumber = request.body.houseNumber;
  const street = request.body.street;
  const suburb = request.body.suburb;
  const city = request.body.city;

  const sqlCreate = "INSERT INTO customers (firstName, lastName, phone, email, houseNumber, street, suburb, city) VALUES (?,?,?,?,?,?,?,?)";
  db.query(sqlCreate, [firstName, lastName, phone, email, houseNumber, street, suburb, city], (error, result) => {
    if (error) console.log(error);
    response.send(result);
  });
});

// Updating the selected customer
app.put('/update/:id', (request, response) => {
  const id = request.params.id;
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const phone = request.body.phone;
  const email = request.body.email;
  const houseNumber = request.body.houseNumber;
  const street = request.body.street;
  const suburb = request.body.suburb;
  const city = request.body.city;
  const make = request.body.make;
  const model = request.body.model;
  const year = request.body.year;
  sqlUpdate = "UPDATE customers SET firstName = ?, lastName = ?, phone = ?, email = ?, houseNumber = ?, street = ?, suburb = ? city = ?  WHERE customer_id = ?";
  db.query([firstName, lastName, phone, email, houseNumber, street, suburb, city, id], (error, result) => {
    if (error) console.log(error);
    response.send(result);
  });
});

// app.delete('/delete', (req, res) => {
//   const customerId = res.data.customer_id;

//   const sqlDelete = "DELETE FROM customers WHERE customer_id = ?";
//   db.query(sqlDelete, [customerId], (err, result) => {
//     if (err) console.log(err);
//   });
// });



app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
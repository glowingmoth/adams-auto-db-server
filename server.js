require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const app = express();
// const port = 3001;
const cors = require('cors');
const faker = require('faker');
const Seeder = require('mysql-db-seed').Seeder;

// const seed = new Seeder(
//   10,
//   'localhost',
//   'root',
//   process.env.PASSWORD,
//   'adamsdb'
// );

// seed.seed(
//   5,
//   'customers',
//   {
//     firstName: faker.name.firstName,
//     lastName: faker.name.lastName,
//     phone:  faker.phone.phoneNumberFormat,
//     email: faker.internet.email,
//     houseNumber: faker.datatype.number,
//     street: faker.address.streetName,
//     suburb: faker.address.county,
//     city: faker.address.city
//   }
// );
// seed.exit();
// process.exit();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Localhost
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: process.env.PASSWORD,
//   database: 'adamsdb'
// });

const db = mysql.createConnection({
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'b5db5f1ba8f615',
  password: ffdddb85,
  database: 'heroku_93b54dfc927ff9e'
});


db.connect((error) => {
  if (error) throw error
  console.log('Connected to Database!');
});

// Read list of all customers 
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
  console.log(request.params.id);
  const id = request.params.id;
  const firstName = request.body.currentDetails.firstName;
  const lastName = request.body.currentDetails.lastName;
  const phone = request.body.currentDetails.phone;
  const email = request.body.currentDetails.email;
  const houseNumber = request.body.currentDetails.houseNumber;
  const street = request.body.currentDetails.street;
  const suburb = request.body.currentDetails.suburb;
  const city = request.body.currentDetails.city;
  const make = request.body.currentDetails.make;
  const model = request.body.currentDetails.model;
  const year = request.body.currentDetails.year;
  sqlUpdate = "UPDATE customers SET firstName = ?, lastName = ?, phone = ?, email = ?, houseNumber = ?, street = ?, suburb = ?, city = ?  WHERE customer_id = ?";
  db.query(sqlUpdate, [firstName, lastName, phone, email, houseNumber, street, suburb, city, id], (error, result) => {
    if (error) console.log(error);
    response.send(result);
  });
});

app.delete('/delete/:id', (request, response) => {
  const id = request.params.id;

  const sqlDelete = "DELETE FROM customers WHERE customer_id = ?";
  db.query(sqlDelete, id, (error, result) => {
    if (error) console.log(error);
    response.send(result);
  });
});



app.listen(process.env.PORT || 3001);
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'adamsdb'
});

db.connect((err) => {
  if (err) throw err
  console.log('Connected to Database!');
});

app.get('/read', (req, res) => {
  const sqlSelect = "SELECT * FROM customers";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post('/create', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const email = req.body.email;

  const sqlCreate = "INSERT INTO customers (firstName, lastName, phone, email) VALUES (?,?,?,?)";
  db.query(sqlCreate, [firstName, lastName, phone, email], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.delete('/delete', (req, res) => {
  const customerId = res.data.customer_id;

  const sqlDelete = "DELETE FROM customers WHERE customer_id = ?";
  db.query(sqlDelete, [customerId], (err, result) => {
    if (err) console.log(err);
  });
});



app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
// backend.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000; // Choose the desired port
app.use(cors()); // Enable CORS for all routes and port parsing

const db = mysql.createConnection({
user: 'root',
password: 'yaralexie',
database: 'TALENTS',
connectionLimit: 10
});

db.connect((err) => {
if (err) {
    console.error('MySQL connection error: ' + err.stack);
    return;
}
console.log('Connected to MySQL database');
});

app.get('/data', (req, res) => {
  db.query('SELECT * FROM talents_data', (error, results) => {
    if (error) {
    console.error('MySQL query error: ' + error.stack);
    res.status(500).send('Error fetching data from the database');
    return;
}
    res.json(results);
    console.log(results)
});
});

app.listen(port, () => {
console.log(`Backend server is running on port ${port}`);
});


// HANDLING CLOSING AND ERRORS
// Close the MySQL database connection when the application is about to exit
process.on('exit', () => {
db.end((err) => {
    if (err) {
    console.error('Error closing the MySQL connection: ' + err.stack);
    return;
    }
    console.log('MySQL connection closed');
});
});

process.on('SIGINT', () => {
console.log('\nShutting down gracefully...');
process.exit(0); // Exit the application
});

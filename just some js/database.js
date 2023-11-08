const {
    createPool
} = require('mysql');

const pool = createPool({
    // host: 'localhost',
    user: 'root',
    password: 'yaralexie',
    database: 'school',
    connectionLimit: 10
})


let data; 
// Function to fetch data and assign it to the data variable
function fetchDataFromDatabase(callback) {
    pool.query('SELECT * FROM employee', (error, results, fields) => {
    if (error) {
        console.error('Error fetching data:', error);
        callback(error, null)
    } else {
        data = results;
        // Log the data to the console
        // console.log('Fetched data:', data);

        // Close the database connection
        callback(null, data)

        pool.end();
    }
    });
}

module.exports = {fetchDataFromDatabase};
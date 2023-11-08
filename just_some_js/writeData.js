const fs = require("fs");
const pdf = require("pdf-parse");
const mysql = require("mysql");

// Create a connection to your MySQL database
const db = mysql.createConnection({
    user: 'root',
    password: 'yaralexie',
    database: 'pdf_files',
    connectionLimit: 10
});

// connecting to the database
db.connect((err) => {
if (err) {
    console.error("MySQL connection error: " + err.stack);
    return;
}
console.log("Connected to MySQL database");
});

// function to extract the  metadata and write it into the database table
// function extractAndInsertMetadata(pdfFilePath) {

function extractAndInsertMetadata(pdfFilePath) {
    // Read the PDF file
        const dataBuffer = fs.readFileSync(pdfFilePath);

        const pdfData = {
            content: dataBuffer,
            filename: 'Barriers to the Circular Economy – integration of perspectives and domains',
        };
        // Use pdf-parse to extract metadata
        pdf(dataBuffer)
        .then((data) => {
            const { info, metadata, text } = data;

            // Extract relevant metadata
            const title = metadata.get('title') || 'No Title';
            const author = metadata.get('author') || 'No Author';
            const creationDate = info.CreationDate || 'No Creation Date';
            const filename = pdfData.filename;

            // Inserting the metadata into the MySQL database
            const query = `INSERT INTO pdf_data (title, author, creationDate, filename) VALUES (?, ?, ?, ?)`;
            db.query(query, [title, author, creationDate, filename], (err) => {
            if (err) {
                console.error('Error inserting metadata into the database: ' + err);
            } else {
                console.log('Metadata inserted into the database');
            }
            });
        })
        .catch((error) => {
            console.error('Error extracting PDF metadata: ' + error);
        });
    };

        
// insert a for loop to do this function for all the files in that directory
let fileCount = 0;
let pdfFilesDirectory = '/Users/glen/Desktop/alu-code/CE-Resource-Database/ce_database/static/assets/data';
fs.readdirSync(pdfFilesDirectory)
.forEach(file => {
    if (!file.endsWith('.pdf')){
        return;
        }
        fileCount++;
        
        const pdfFilePath = `${pdfFilesDirectory}/${file}`;
        // Usage: Pass the path to your PDF file to the function
        extractAndInsertMetadata(pdfFilePath)  
    })
    console.log(`total number of pdf files: ${fileCount}`);


const fs = require('fs');
const csv = require('csv-parser');

// Function to count rows with a missing specific column
function countMissingColumnRows(csvFilePath: string, columnName: string) {
    let missingCount = 0;
    let totalRows = 0;

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row: any) => {
            totalRows++;
            if (!row[columnName] || row[columnName].trim() === '') {
                missingCount++;
            }
        })
        .on('end', () => {
            console.log(`Total rows processed: ${totalRows}`);
            console.log(`Rows with missing "${columnName}": ${missingCount}`);
            console.log(`Percentage of rows with missing "${columnName}": ${(missingCount / totalRows) * 100}%`);
        })
        .on('error', (err: any) => {
            console.error('Error reading the CSV file:', err.message);
        });
}

// Example usage
const csvFilePath = 'data/open-local.csv'; // Replace with your CSV file path
const columnName = process.argv[2]; // Get the column name from the command line arguments

countMissingColumnRows(csvFilePath, columnName);
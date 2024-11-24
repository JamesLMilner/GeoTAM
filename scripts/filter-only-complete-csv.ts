const fs = require('fs');
const csv = require('csv-parser');
const { Transform } = require('stream');

// Specify the columns that need to have values
const requiredColumns = ['voafloorarea', 'voarateablevalue']; // Replace with your column names

// Input and output file paths
const inputFilePath = './data/open-local.csv'; // Replace with your input file path
const outputFilePath = `./data/open-local-required-${requiredColumns.join('-')}.csv`; // Replace with your output file path
let filteredRows = 0;

// Transform stream to filter rows
const filterRows = new Transform({
  objectMode: true,
  transform(row, encoding, callback) {
    const hasValues = requiredColumns.every(column => row[column] && row[column].trim() !== '');
    if (hasValues) {
      callback(null, row); // Pass row if it satisfies the condition
    } else {
      filteredRows++;
      callback(); // Skip row if it does not satisfy the condition
    }
  }
});

function escapeField(field) {
    if (field.includes(',')) {
      return `"${field.replace(/"/g, '""')}"`; // Escape double quotes inside the field
    }
    return field;
  }

let headers: any = null; // Placeholder to store headers

// Create a writable stream to output filtered data
const writeStream = fs.createWriteStream(outputFilePath);

let rowCounter = 0;

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('headers', (parsedHeaders) => {
    headers = parsedHeaders;
    // Write the headers to the output file
    writeStream.write(`${headers.join(',')}\n`);
  })
  .pipe(filterRows) // Filter rows based on compulsory fields
  .on('data', (row) => {
    // Directly stringify the row with proper escaping and write it to the file
    const escapedRow = Object.values(row).map(escapeField).join(',');
    writeStream.write(escapedRow + '\n');
  })
  .on('end', () => {
    console.log(`Filtering complete - ${filteredRows} skipped. Output written to: ${outputFilePath}`);
  })
  .on('error', (error) => {
    console.error('Error:', error);
  });

  
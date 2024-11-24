const fs = require('fs');
const csv = require('csv-parser');

const targetColumn = process.argv[2]; // Get the column name from the command line arguments
 
// Input and output file paths
const inputFilePath = './data/open-local.csv'; // Replace with your input file path
const outputFilePath = `./data/open-local-unique-values-${targetColumn}.csv`; // Replace with your output file path

// Set to store unique values
const uniqueValues = new Set();

// Read the CSV file
fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Add the value from the target column to the set
    if (row[targetColumn]) {
      uniqueValues.add(row[targetColumn].trim());
    }
  })
  .on('end', () => {
    console.log(`Unique values in column "${targetColumn}":`);
    console.log([...uniqueValues]);

    // Optional: Write unique values to a file
    fs.writeFile(outputFilePath, [...uniqueValues].sort().join('\n'), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log(`Unique values saved to ${outputFilePath}`);
      }
    });
  })
  .on('error', (error) => {
    console.error('Error:', error);
  });

const fs = require('fs');
const csv = require('csv-parser');
const { Transform } = require('stream');

const turf = require('@turf/turf');
 
// Input and output file paths
const inputFilePath = './data/manchester.csv'; // Replace with your input file path
const outputFilePath = `./data/inner-manchester.csv`; // Replace with your output file path
let filteredRows = 0;

// Transform stream to filter rows
const filterRows = new Transform({
  objectMode: true,
  transform(row, encoding, callback) {


    const latitude = row['latitude'] 
    const longitude = row['longitude']

    const pointInPolygon = turf.booleanPointInPolygon([longitude, latitude], {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -2.293589602548309,
              53.50315412565925
            ],
            [
              -2.293589602548309,
              53.45256594368598
            ],
            [
              -2.1931019386415755,
              53.45256594368598
            ],
            [
              -2.1931019386415755,
              53.50315412565925
            ],
            [
              -2.293589602548309,
              53.50315412565925
            ]
          ]
        ],
        "type": "Polygon"
      }
    })

 
    if (pointInPolygon) {
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

  
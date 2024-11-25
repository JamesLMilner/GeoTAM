const fs = require('fs');
const csv = require('csv-parser');
const { Transform } = require('stream');

// Specify the columns that need to have values
const requiredColumns = ['voafloorarea', 'voarateablevalue']; // Replace with your column names

// Input and output file paths
const inputFilePath = './data/open-local-required-voafloorarea-voarateablevalue.csv'; // Replace with your input file path
const outputFilePath = `./data/open-local-required-${requiredColumns.join('-')}.csv`; // Replace with your output file path

 
 

let headers: any = null; // Placeholder to store headers

 
let rowCounter = 0;

const totalFloorArea = {
  OFFICE_GENERAL: 0,
  OFFICE_SERVICED_OFFICE:  0,
  OFFICE_BUSINESS_PARK:  0,
  OFFICE_DATA_CENTRES:  0,
  RETAIL_HIGH_STREET:  0,
  RETAIL_RESTAURANTS_AND_CAFES:  0,
  RETAIL_OTHER_SUPERSTORES_AND_WAREHOUSES:  0,
  RETAIL_FINANCIAL_AND_PROFESSIONAL_SERVICES:  0,
  RETAIL_FOOD_SUPERSTORES: 0,
  WAREHOUSING_LARGE_SCALE_AND_HIGH_BAY: 0,
  WAREHOUSE_AND_DISTRIBUTION: 0,
  AGRICULTURAL_GENERAL: 0,
  INDUSTRIAL_GENERAL: 0,
  INDUSTRIAL_LIGHT: 0,
  LEISURE_AMUSEMENT_AND_ENTERTAINMENT_CENTRES: 0,
  LEISURE_GENERAL_HOTELS: 0,
  LEISURE_LUXURY_HOTELS: 0,
  LEISURE_BUDGET_HOTELS: 0,
  LEISURE_CINEMAS: 0,
  LEISURE_PERIODIC_USE: 0,
  LEISURE_CULTURAL_ATTRACTIONS: 0,
  LEISURE_SPORTS_CENTRES_AND_PRIVATE_CLUBS: 0,
  OTHER_COMMERCIAL: 0,
  OTHER_PUBLIC: 0
}

const totalRateableValue = {
  OFFICE_GENERAL: 0,
  OFFICE_SERVICED_OFFICE:  0,
  OFFICE_BUSINESS_PARK:  0,
  OFFICE_DATA_CENTRES:  0,
  RETAIL_HIGH_STREET:  0,
  RETAIL_RESTAURANTS_AND_CAFES:  0,
  RETAIL_OTHER_SUPERSTORES_AND_WAREHOUSES:  0,
  RETAIL_FINANCIAL_AND_PROFESSIONAL_SERVICES:  0,
  RETAIL_FOOD_SUPERSTORES: 0,
  WAREHOUSING_LARGE_SCALE_AND_HIGH_BAY: 0,
  WAREHOUSE_AND_DISTRIBUTION: 0,
  AGRICULTURAL_GENERAL: 0,
  INDUSTRIAL_GENERAL: 0,
  INDUSTRIAL_LIGHT: 0,
  LEISURE_AMUSEMENT_AND_ENTERTAINMENT_CENTRES: 0,
  LEISURE_GENERAL_HOTELS: 0,
  LEISURE_LUXURY_HOTELS: 0,
  LEISURE_BUDGET_HOTELS: 0,
  LEISURE_CINEMAS: 0,
  LEISURE_PERIODIC_USE: 0,
  LEISURE_CULTURAL_ATTRACTIONS: 0,
  LEISURE_SPORTS_CENTRES_AND_PRIVATE_CLUBS: 0,
  OTHER_COMMERCIAL: 0,
  OTHER_PUBLIC: 0
}

const totalCounts = {
  OFFICE_GENERAL: 0,
  OFFICE_SERVICED_OFFICE:  0,
  OFFICE_BUSINESS_PARK:  0,
  OFFICE_DATA_CENTRES:  0,
  RETAIL_HIGH_STREET:  0,
  RETAIL_RESTAURANTS_AND_CAFES:  0,
  RETAIL_OTHER_SUPERSTORES_AND_WAREHOUSES:  0,
  RETAIL_FINANCIAL_AND_PROFESSIONAL_SERVICES:  0,
  RETAIL_FOOD_SUPERSTORES: 0,
  WAREHOUSING_LARGE_SCALE_AND_HIGH_BAY: 0,
  WAREHOUSE_AND_DISTRIBUTION: 0,
  AGRICULTURAL_GENERAL: 0,
  INDUSTRIAL_GENERAL: 0,
  INDUSTRIAL_LIGHT: 0,
  LEISURE_AMUSEMENT_AND_ENTERTAINMENT_CENTRES: 0,
  LEISURE_GENERAL_HOTELS: 0,
  LEISURE_LUXURY_HOTELS: 0,
  LEISURE_BUDGET_HOTELS: 0,
  LEISURE_CINEMAS: 0,
  LEISURE_PERIODIC_USE: 0,
  LEISURE_CULTURAL_ATTRACTIONS: 0,
  LEISURE_SPORTS_CENTRES_AND_PRIVATE_CLUBS: 0,
  OTHER_COMMERCIAL: 0,
  OTHER_PUBLIC: 0
}

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('headers', (parsedHeaders) => {
    headers = parsedHeaders;
    // Write the headers to the output file
  })
  .on('data', (row) => {
 
 
    const category = row['voasubcategory'];
    const floorArea = row['voafloorarea'];
    const rateableValue = row['voarateablevalue'];


    if (category in totalCounts) {
      totalCounts[category] += 1;
    }

    if (category in totalRateableValue && !isNaN(rateableValue)) {

      totalRateableValue[category] += Number(rateableValue);
    } else {
      console.log(`Unknown category: ${category}`);
    }

    if (category in totalFloorArea && !isNaN(floorArea)) {
      totalFloorArea[category] += Number(floorArea);
    } else {
      console.log(`Unknown category: ${category}`);
    }

    
  })
  .on('end', () => {
    console.log(`Total floor area by category:`);
    Object.keys(totalFloorArea).forEach((category) => {
      if (totalCounts[category] !== 0) {
        console.log(category,   totalFloorArea[category] / totalCounts[category]);
      }
    })
    console.log(`Total rateable value by category:`);
    Object.keys(totalRateableValue).forEach((category) => {
      if (totalCounts[category] !== 0) {
        console.log(category,   totalRateableValue[category] / totalCounts[category]);
      }
    })
    // console.log(totalRateableValue);
  })
  .on('error', (error) => {
    console.error('Error:', error);
  });

  
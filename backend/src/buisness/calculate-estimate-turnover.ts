import { Business } from './business.model';

const dataByVoaSubCategory: Record<
  string,
  {
    employeePerSqM: number;
    averageRateableValue: number;
    averageFloorArea: number;
  }
> = {
  OFFICE_GENERAL: {
    employeePerSqM: 0.0833,
    averageRateableValue: 27920.02067861431,
    averageFloorArea: 187.9689300484727,
  },
  OFFICE_SERVICED_OFFICE: {
    employeePerSqM: 0.1,
    averageRateableValue: 9135.714285714286,
    averageFloorArea: 154.00428571428574,
  },
  OFFICE_BUSINESS_PARK: {
    employeePerSqM: 0.1,
    averageRateableValue: 224538.88888888888,
    averageFloorArea: 2409.0266666666666,
  },
  OFFICE_DATA_CENTRES: {
    employeePerSqM: 0.0213,
    averageRateableValue: 204726.08695652173,
    averageFloorArea: 1608.6000000000001,
  },
  RETAIL_HIGH_STREET: {
    employeePerSqM: 0.0526,
    averageRateableValue: 11134.208556715575,
    averageFloorArea: 89.68657660835024,
  },
  RETAIL_RESTAURANTS_AND_CAFES: {
    employeePerSqM: 0.0667,
    averageRateableValue: 31641.661157024795,
    averageFloorArea: 207.17701652892578,
  },
  RETAIL_OTHER_SUPERSTORES_AND_WAREHOUSES: {
    employeePerSqM: 0.0111,
    averageRateableValue: 113631.79152542373,
    averageFloorArea: 1085.8815016949188,
  },
  RETAIL_FINANCIAL_AND_PROFESSIONAL_SERVICES: {
    employeePerSqM: 0.0625,
    averageRateableValue: 47299.47136563877,
    averageFloorArea: 307.09473568281925,
  },
  RETAIL_FOOD_SUPERSTORES: {
    employeePerSqM: 0.0588,
    averageRateableValue: 46584.670487106014,
    averageFloorArea: 335.01335243553,
  },
  WAREHOUSING_LARGE_SCALE_AND_HIGH_BAY: {
    employeePerSqM: 0.0125,
    averageRateableValue: 77628.25217013889,
    averageFloorArea: 2086.175920138,
  },
  WAREHOUSE_AND_DISTRIBUTION: {
    employeePerSqM: 0.0143,
    averageRateableValue: 239187.14285714287,
    averageFloorArea: 5937.595714285714,
  },
  INDUSTRIAL_GENERAL: {
    employeePerSqM: 0.0278,
    averageRateableValue: 24919.441404513804,
    averageFloorArea: 644.0403328559413,
  },
  INDUSTRIAL_LIGHT: {
    employeePerSqM: 0.0213,
    averageRateableValue: 44913.0016722408,
    averageFloorArea: 1873.2422658862868,
  },
  LEISURE_AMUSEMENT_AND_ENTERTAINMENT_CENTRES: {
    employeePerSqM: 0.0143,
    averageRateableValue: 24841.05081300813,
    averageFloorArea: 347.3719512195122,
  },
  LEISURE_GENERAL_HOTELS: {
    employeePerSqM: 0.0177,
    averageRateableValue: 6327.754237288135,
    averageFloorArea: 4.296610169491525,
  },
  LEISURE_LUXURY_HOTELS: {
    employeePerSqM: 0.0177,
    averageRateableValue: 6327.754237288135,
    averageFloorArea: 4.296610169491525,
  },
  LEISURE_BUDGET_HOTELS: {
    employeePerSqM: 0.0177,
    averageRateableValue: 4983.951965065502,
    averageFloorArea: 7.471615720524017,
  },
  LEISURE_CINEMAS: {
    employeePerSqM: 0.0111,
    averageRateableValue: 24841, // Not available, using LEISURE_AMUSEMENT_AND_ENTERTAINMENT_CENTRES
    averageFloorArea: 347.3719512195122, // Not available, using LEISURE_AMUSEMENT_AND_ENTERTAINMENT_CENTRES
  },
  LEISURE_PERIODIC_USE: {
    employeePerSqM: 0.0278, // Not specifically mentioned, using same as LEISURE_CULTURAL_ATTRACTIONS
    averageRateableValue: 10042.083333333334,
    averageFloorArea: 184.96030303030304,
  },
  LEISURE_CULTURAL_ATTRACTIONS: {
    employeePerSqM: 0.0278,
    averageRateableValue: 24020.754,
    averageFloorArea: 241.23433962264147,
  },
  LEISURE_SPORTS_CENTRES_AND_PRIVATE_CLUBS: {
    employeePerSqM: 0.0154,
    averageRateableValue: 29200.462,
    averageFloorArea: 559.818577878,
  },
  AGRICULTURAL_GENERAL: {
    employeePerSqM: 0.0278, // Not specifically mentioned, using same as INDUSTRIAL_GENERAL
    averageRateableValue: 4199.166666666667,
    averageFloorArea: 38.18840579710145,
  },
  OTHER_COMMERCIAL: {
    employeePerSqM: 0.0143, // Not specifically mentioned, mostly car spaces so gone with WAREHOUSE_AND_DISTRIBUTION
    averageRateableValue: 3750.8517350157726,
    averageFloorArea: 32.334829366217356,
  },
  OTHER_PUBLIC: {
    employeePerSqM: 0.0526, // Not specifically mentioned, but looks like surgeries, village hall etc, gone with RETAIL_HIGH_STREET
    averageRateableValue: 8814.231792144026,
    averageFloorArea: 128.6689361702128,
  },
} as const;

export function calculateEstimateTurnover(business: Business): number {
  const AVERAGE_RENT_TO_TURNOVER_PERCENTAGE = 7;
  const AVERAGE_TURNOVER_PER_EMPLOYEE = 145498;

  const averageFloorAreaForCategory =
    dataByVoaSubCategory[business.voaCategory].averageFloorArea;
  const averageRateableValueForCategory =
    dataByVoaSubCategory[business.voaCategory].averageRateableValue;

  console.log({
    averageFloorAreaForCategory,
    averageRateableValueForCategory,
  });

  // We work on the assumption that bigger businesses have higher turnover
  const floorAreaFactor =
    business.floorAreaSquareMeters / averageFloorAreaForCategory;
  const rateableValueFactor =
    business.voaRateableValue / averageRateableValueForCategory;

  // We take the average of the two factors
  const averageBusinessSizeFactor = (floorAreaFactor + rateableValueFactor) / 2;

  // Estimate based on rental value of the property
  const annualRent = business.voaRateableValue || 0;
  const turnoverAnnualRentEstimate =
    annualRent / (AVERAGE_RENT_TO_TURNOVER_PERCENTAGE / 100);

  // Estimate based on the number of employees
  const employeesPerSqMeterMultiplier =
    dataByVoaSubCategory[business.voaCategory].employeePerSqM;

  const estimatedEmployees =
    business.floorAreaSquareMeters * employeesPerSqMeterMultiplier;

  // We adjust it based on the size of the business
  const turnoverByEmployeeEstimate =
    estimatedEmployees *
    AVERAGE_TURNOVER_PER_EMPLOYEE *
    averageBusinessSizeFactor;

  // We take the average of the two estimates
  const finalAverageEstimate =
    (turnoverAnnualRentEstimate + turnoverByEmployeeEstimate) / 2;

  // We know that the GDP of Manchester is £87.7 billion
  // undamped this approach would give us a TAM of £755.8 billion
  const greaterManchesterGDP = 87_700_000_000;
  const greaterManchesterTAM = 755_777_778_764;

  // We want to account for all the missing rows, so factor that into the dampening factor
  const completeRows = 98522;
  const totalRows = 175929;

  const DAMPENING_FACTOR =
    (greaterManchesterTAM * (totalRows / completeRows)) / greaterManchesterGDP;

  console.log({
    turnoverAnnualRentEstimate,
    turnoverByEmployeeEstimate,
    finalAverageEstimate,
    averageBusinessSizeFactor,
  });

  return finalAverageEstimate / DAMPENING_FACTOR;
}

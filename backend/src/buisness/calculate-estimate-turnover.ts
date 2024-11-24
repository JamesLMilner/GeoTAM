import { Business } from './business.model';

const voaSubCategoryEmployeesPerSqFt = {
  OFFICE_GENERAL: 1,
  OFFICE_SERVICED_OFFICE: 1,
  OFFICE_BUSINESS_PARK: 1,
  OFFICE_DATA_CENTRES: 1,
  RETAIL_HIGH_STREET: 1,
  RETAIL_RESTAURANTS_AND_CAFES: 1,
  RETAIL_OTHER_SUPERSTORES_AND_WAREHOUSES: 1,
  RETAIL_FINANCIAL_AND_PROFESSIONAL_SERVICES: 1,
  RETAIL_FOOD_SUPERSTORES: 1,
  WAREHOUSING_LARGE_SCALE_AND_HIGH_BAY: 1,
  WAREHOUSE_AND_DISTRIBUTION: 1,
  AGRICULTURAL_GENERAL: 1,
  INDUSTRIAL_GENERAL: 1,
  INDUSTRIAL_LIGHT: 1,
  LEISURE_AMUSEMENT_AND_ENTERTAINMENT_CENTRES: 1,
  LEISURE_GENERAL_HOTELS: 1,
  LEISURE_LUXURY_HOTELS: 1,
  LEISURE_BUDGET_HOTELS: 1,
  LEISURE_CINEMAS: 1,
  LEISURE_PERIODIC_USE: 1,
  LEISURE_CULTURAL_ATTRACTIONS: 1,
  LEISURE_SPORTS_CENTRES_AND_PRIVATE_CLUBS: 1,
  OTHER_COMMERCIAL: 1,
  OTHER_PUBLIC: 1,
};

export function calculateEstimateTurnover(business: Business): number {
  const AVERAGE_RENT_TO_TURNOVER_PERCENTAGE = 7;
  const AVERAGE_TURNOVER_PER_EMPLOYEE = 145498;

  // Estimate based on rental value of the property
  const annualRent = business.voaRateableValue || 0;
  const turnoverAnnualRentEstimate =
    annualRent / (AVERAGE_RENT_TO_TURNOVER_PERCENTAGE / 100);

  // Estimate based on the number of employees
  const employeesPerSqFtMultiplier =
    voaSubCategoryEmployeesPerSqFt[business.voaCategory];

  const estimatedEmployees =
    business.floorAreaSquareMeters * employeesPerSqFtMultiplier;

  const turnoverByEmployeeEstimate =
    estimatedEmployees * AVERAGE_TURNOVER_PER_EMPLOYEE;

  return (turnoverByEmployeeEstimate + turnoverAnnualRentEstimate) / 2;
}

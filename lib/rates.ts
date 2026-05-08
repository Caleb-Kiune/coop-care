import { QuoteFormValues } from "./schema";

// DATA LAYER: Premium Rates
const RATES = {
  COMPREHENSIVE: {
    OPTION_1: { base: [7789, 10651, 17031, 21187, 23787, 25068, 26989], additional: 3889 },
    OPTION_2: { base: [8789, 12553, 20104, 25023, 28099, 29615, 31889], additional: 4389 },
    OPTION_3: { base: [9789, 14260, 22863, 28467, 31972, 33699, 36289], additional: 4889 },
  },
  INPATIENT_ONLY: {
    OPTION_1: { base: [2597, 2930, 4675, 5811, 6522, 6872, 7397], additional: 1197 },
    OPTION_2: { base: [3297, 4288, 6869, 8550, 9602, 10120, 10897], additional: 1497 },
    OPTION_3: { base: [3897, 5026, 8061, 10037, 11274, 11883, 12797], additional: 1797 },
  },
};

// LOGIC LAYER: The math engine that reads the data.
export function calculatePremium(
  coverageType: QuoteFormValues["coverageType"],
  benefitOption: QuoteFormValues["benefitOption"],
  dependentCount: number
): number {
  // 1. Instantly navigate the nested object to get the correct tier data
  const tier = RATES[coverageType][benefitOption];
  
  // 2. If dependents are 0 to 6, grab the exact rate matching the array index
  if (dependentCount <= 6) {
    return tier.base[dependentCount];
  }
  
  // 3. If dependents exceed 6, take the max base rate (M+6) and add the per-person extra
  const maxBaseRate = tier.base[6];
  const extraDependents = dependentCount - 6;
  
  return maxBaseRate + (extraDependents * tier.additional);
}
import { QuoteFormValues } from "./schema";
import { CIC_RATES } from "./constants"; 

export function calculatePremium(
  coverageType: QuoteFormValues["coverageType"],
  benefitOption: QuoteFormValues["benefitOption"],
  dependentCount: number
): number {
  const tier = CIC_RATES[coverageType][benefitOption];
  
  if (dependentCount <= 6) {
    return tier.base[dependentCount];
  } 
  
  const maxBaseRate = tier.base[6];
  const extraDependents = dependentCount - 6;
  
  return maxBaseRate + (extraDependents * tier.additional);
}
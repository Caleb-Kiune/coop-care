import { QuoteFormValues } from "./schema";
import { CIC_RATES, POLICY_ADMIN_FEE } from "./constants"; // Importing the separated data

export function calculatePremium(
  coverageType: QuoteFormValues["coverageType"],
  benefitOption: QuoteFormValues["benefitOption"],
  dependentCount: number
): number {
  const tier = CIC_RATES[coverageType][benefitOption];
  let basePremium = 0;
  
  if (dependentCount <= 6) {
    basePremium = tier.base[dependentCount];
  } else {
    const maxBaseRate = tier.base[6];
    const extraDependents = dependentCount - 6;
    basePremium = maxBaseRate + (extraDependents * tier.additional);
  }
  
  return basePremium + POLICY_ADMIN_FEE; 
}
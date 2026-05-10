import { QuoteFormValues } from "./schema";
import { CIC_RATES, STATUTORY_LEVIES } from "./constants"; 

export interface PremiumBreakdown {
  basePremium: number;
  trainingLevy: number;
  phcf: number;
  stampDuty: number;
  totalPremium: number;
}

export function calculatePremium(
  coverageType: QuoteFormValues["coverageType"],
  benefitOption: QuoteFormValues["benefitOption"],
  dependentCount: number
): PremiumBreakdown {
  const tier = CIC_RATES[coverageType][benefitOption];
  
  let basePremium = 0;
  if (dependentCount <= 6) {
    basePremium = tier.base[dependentCount];
  } else {
    const maxBaseRate = tier.base[6];
    const extraDependents = dependentCount - 6;
    basePremium = maxBaseRate + (extraDependents * tier.additional);
  }

  const trainingLevy = Math.round(basePremium * STATUTORY_LEVIES.TRAINING_LEVY_RATE);
  const phcf = Math.round(basePremium * STATUTORY_LEVIES.PHCF_RATE);
  const stampDuty = STATUTORY_LEVIES.STAMP_DUTY;
  
  const totalPremium = basePremium + trainingLevy + phcf + stampDuty;

  return {
    basePremium,
    trainingLevy,
    phcf,
    stampDuty,
    totalPremium
  };
}
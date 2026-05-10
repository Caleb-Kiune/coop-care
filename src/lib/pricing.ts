import { QuoteFormValues, RosterMember } from "./schema";
import { CIC_RATES, STATUTORY_LEVIES } from "./constants"; 

export interface PremiumBreakdown {
  basePremium: number;
  trainingLevy: number;
  phcf: number;
  stampDuty: number;
  totalPremium: number;
}

export function calculateBasePremium(
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

  return basePremium;
}

export function calculatePremium(
  coverageType: QuoteFormValues["coverageType"],
  benefitOption: QuoteFormValues["benefitOption"],
  dependentCount: number
): PremiumBreakdown {
  const basePremium = calculateBasePremium(coverageType, benefitOption, dependentCount);
  
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

export function calculateGroupPremium(roster: RosterMember[]): PremiumBreakdown {
  if (roster.length === 0) {
    return {
      basePremium: 0,
      trainingLevy: 0,
      phcf: 0,
      stampDuty: 0,
      totalPremium: 0
    };
  }

  let totalBasePremium = 0;
  for (const member of roster) {
    totalBasePremium += member.basePremium;
  }

  const trainingLevy = Math.round(totalBasePremium * STATUTORY_LEVIES.TRAINING_LEVY_RATE);
  const phcf = Math.round(totalBasePremium * STATUTORY_LEVIES.PHCF_RATE);
  const stampDuty = STATUTORY_LEVIES.STAMP_DUTY;
  
  const totalPremium = totalBasePremium + trainingLevy + phcf + stampDuty;

  return {
    basePremium: totalBasePremium,
    trainingLevy,
    phcf,
    stampDuty,
    totalPremium
  };
}
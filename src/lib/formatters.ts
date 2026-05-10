/**
 * InsurTech formatting utilities for dense table/PDF contexts.
 * Full labels remain in the form inputs; these abbreviations are for data display only.
 */

const COVERAGE_ABBR: Record<string, string> = {
  COMPREHENSIVE: "Comp",
  INPATIENT_ONLY: "Inpat",
};

const OPTION_ABBR: Record<string, string> = {
  OPTION_1: "Opt 1",
  OPTION_2: "Opt 2",
  OPTION_3: "Opt 3",
};

/** "COMPREHENSIVE" → "Comp" */
export function formatCoverage(type: string): string {
  return COVERAGE_ABBR[type] ?? type;
}

/** "OPTION_1" → "Opt 1" */
export function formatOption(option: string): string {
  return OPTION_ABBR[option] ?? option;
}

/** 0 → "M", 1 → "M+1", 5 → "M+5" */
export function formatDependents(count: number): string {
  return count === 0 ? "M" : `M+${count}`;
}

/** "COMPREHENSIVE" + "OPTION_1" → "Comp - Opt 1" */
export function formatMemberPlan(coverage: string, option: string): string {
  return `${formatCoverage(coverage)} - ${formatOption(option)}`;
}

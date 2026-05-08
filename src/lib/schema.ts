import { z } from "zod";

export const quoteSchema = z.object({
  clientName: z
    .string()
    .max(50, "Name must be less than 50 characters")
    .optional(),
  coverageType: z.enum(["COMPREHENSIVE", "INPATIENT_ONLY"]),
  benefitOption: z.enum(["OPTION_1", "OPTION_2", "OPTION_3"]),
  dependentCount: z.number().int().min(0, "Dependents cannot be negative"),
  eligibilityConfirmed: z.literal(true, {
    errorMap: () => ({ message: "You must confirm age eligibility before proceeding." }),
  }),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
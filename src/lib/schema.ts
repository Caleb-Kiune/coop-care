import { z } from "zod";

export const quoteSchema = z.object({
  clientName: z
    .string()
    .trim()
    .max(50, "Name must be less than 50 characters")
    .optional(),
  coverageType: z.enum(["COMPREHENSIVE", "INPATIENT_ONLY"], {
    message: "Please select a coverage type.",
  }),
  benefitOption: z.enum(["OPTION_1", "OPTION_2", "OPTION_3"], {
    message: "Please select a benefit tier.",
  }),
  dependentCount: z.number().int().min(0, "Dependents cannot be negative"),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
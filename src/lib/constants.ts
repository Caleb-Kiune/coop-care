export const CIC_RATES = {
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

export const BENEFIT_LIMITS = {
  COMPREHENSIVE: {
    OPTION_1: { inpatient: "100,000", outpatient: "30,000", maternity: "15,000", dental: "5,000", optical: "5,000", lastExpense: "50,000", accommodation: "Ward Bed" },
    OPTION_2: { inpatient: "200,000", outpatient: "40,000", maternity: "20,000", dental: "5,000", optical: "5,000", lastExpense: "50,000", accommodation: "Ward Bed" },
    OPTION_3: { inpatient: "300,000", outpatient: "50,000", maternity: "25,000", dental: "7,500", optical: "7,500", lastExpense: "50,000", accommodation: "Ward Bed" },
  },
  INPATIENT_ONLY: {
    OPTION_1: { inpatient: "100,000", outpatient: "N/A", maternity: "N/A", dental: "N/A", optical: "N/A", lastExpense: "50,000", accommodation: "Ward Bed" },
    OPTION_2: { inpatient: "200,000", outpatient: "N/A", maternity: "N/A", dental: "N/A", optical: "N/A", lastExpense: "50,000", accommodation: "Ward Bed" },
    OPTION_3: { inpatient: "300,000", outpatient: "N/A", maternity: "N/A", dental: "N/A", optical: "N/A", lastExpense: "50,000", accommodation: "Ward Bed" },
  },
};

export const STATUTORY_LEVIES = {
  TRAINING_LEVY_RATE: 0.002,
  PHCF_RATE: 0.0025,
  STAMP_DUTY: 40,
};
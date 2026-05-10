export interface TermCategory {
  title: string;
  items: string[];
}

export interface TermSection {
  heading: string;
  categories: TermCategory[];
}

export const POLICY_TERMS: TermSection[] = [
  {
    heading: "Special Terms",
    categories: [
      {
        title: "Waiting periods",
        items: [
          "No waiting period for accident related admissions",
          "1 year for pre-existing & chronic conditions treatment.",
          "10 months waiting period for Maternity and maternity related treatment."
        ]
      },
      {
        title: "Age Eligibility",
        items: [
          "Eligible age for Children from birth (born at full term of 37 weeks) to 18 years; 21 years up to 25 years subject to proof of learning from the learning institution.",
          "Eligible age for Principle member and spouse – up to 70 years."
        ]
      },
      {
        title: "General Conditions",
        items: [
          "Geographical limit is Kenya only.",
          "Lodging facilities for parent accompanying a child below 12 years being admitted",
          "Access is strictly within the designated panel provided.",
          "Members will access services through Photo cards. Cost of card replacement for lost or damaged card is KES. 300 per card."
        ]
      },
      {
        title: "Dental benefits which covers;",
        items: [
          "Cost of fillings",
          "Root canal",
          "X-rays",
          "Polishing and scaling necessitated by a prevailing medical condition and authorized by a doctor.",
          "Tooth extractions including surgical extraction together with anesthetics fees",
          "Decay",
          "Accidental dental injury."
        ]
      },
      {
        title: "Optical benefits which covers:",
        items: [
          "Expenses relating to eye treatment",
          "Accidental eye injury.",
          "Consultation.",
          "Eye testing",
          "Treatment arising from injury to the eyes caused solely and directly by accident external and visible means or arising from a disease affecting the eye or optical nerve.",
          "The supply of lenses. The prescribed spectacles will be acquired from an approved optician limited to one pair every two years."
        ]
      }
    ]
  },
  {
    heading: "Exclusions",
    categories: [
      {
        title: "Non-Medical & Cosmetic Treatments",
        items: [
          "Cosmetic surgery, beauty treatments, weight loss programs, and nature/spa therapies."
        ]
      },
      {
        title: "Non-Standard or Unapproved Care",
        items: [
          "Experimental treatments, alternative therapies (e.g., acupuncture, herbalists), unregistered practitioners, and self-prescribed/self-referred care."
        ]
      },
      {
        title: "Lifestyle & Personal Risk Activities",
        items: [
          "Injuries from hazardous sports, riots, war, military service, and nuclear/radioactive exposure."
        ]
      },
      {
        title: "Maternity, Infertility & Family Planning",
        items: [
          "Infertility treatments for both dependents and main members and pregnancy related costs for dependents."
        ]
      },
      {
        title: "Devices, Equipment, Dental & Optical Exclusions",
        items: [
          "External surgical appliances, diagnostic tools (e.g., glucometers, BP machines, hearing aids), Optical exclusions – Plano prescriptions, +/-0.25 prescriptions, photo chromatic lenses, antiglare coatings & Laser correction of eyesight. Dental exclusions will include dental scaling, crowns, bridges, orthodontics, and dentures"
        ]
      },
      {
        title: "Other Insurance & Non-Panel Providers",
        items: [
          "Costs recoverable under other insurance (e.g., SHA, GPA, WIBA) and services from non-designated hospitals or doctors."
        ]
      }
    ]
  }
];

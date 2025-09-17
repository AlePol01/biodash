export const transparencyDatabase = [
  {
    id: 1,
    name: "Vitamin D3 (Cholecalciferol)",
    ingredients: ["Cholecalciferol 2000 IU", "Microcrystalline Cellulose", "Vegetable Stearate"],
    certifications: ["USP Verified", "NSF Certified"],
    knownContaminants: "None detected",
    regulatoryNotes: "Generally Recognized as Safe (GRAS). Limited FDA oversight of dosage claims."
  },
  {
    id: 2,
    name: "Magnesium Glycinate",
    ingredients: ["Magnesium (as Magnesium Glycinate) 400mg", "Vegetable Capsule", "Silicon Dioxide"],
    certifications: ["Third-party tested"],
    knownContaminants: "Heavy metals below USP limits",
    regulatoryNotes: "Bisglycinate form has better absorption. No FDA pre-market approval required."
  },
  {
    id: 3,
    name: "Whey Protein Isolate",
    ingredients: ["Proprietary Protein Blend 25g (Whey Protein Isolate, Whey Protein Concentrate)", "Natural Flavors", "Sucralose"],
    certifications: ["NSF Certified for Sport"],
    knownContaminants: "None detected in recent batch testing",
    regulatoryNotes: "Proprietary blend - exact amounts of isolate vs concentrate not disclosed"
  },
  {
    id: 4,
    name: "Multivitamin Complex",
    ingredients: ["Vitamin A 5000 IU", "Vitamin C 500mg", "Vitamin E 30 IU", "B-Complex", "Iron 18mg", "Calcium 200mg"],
    certifications: ["USP Verified"],
    knownContaminants: "None detected",
    regulatoryNotes: "Iron content may interact with certain medications. Consult healthcare provider."
  },
  {
    id: 5,
    name: "Omega-3 Fish Oil",
    ingredients: ["EPA 600mg", "DHA 400mg", "Other Omega-3 Fatty Acids 200mg", "Gelatin Capsule", "Glycerin"],
    certifications: ["IFOS Certified", "Third-party tested"],
    knownContaminants: "Mercury below detection limits",
    regulatoryNotes: "FDA recognizes health benefits. Source and processing methods vary significantly."
  },
  {
    id: 6,
    name: "Creatine Monohydrate",
    ingredients: ["Creatine Monohydrate 5g"],
    certifications: ["Creapure Certified", "Informed Sport"],
    knownContaminants: "None detected",
    regulatoryNotes: "Extensive research support. No FDA pre-market approval required."
  }
];

export const drugInteractions = [
  {
    drug: "Warfarin",
    supplement: "Vitamin E",
    severity: "High",
    description: "Vitamin E may increase bleeding risk when combined with Warfarin. Monitor INR closely.",
    mechanism: "Vitamin E potentiates anticoagulant effects"
  },
  {
    drug: "Levothyroxine",
    supplement: "Calcium",
    severity: "Moderate",
    description: "Calcium can reduce absorption of Levothyroxine. Take 4 hours apart.",
    mechanism: "Calcium binds to levothyroxine in GI tract"
  },
  {
    drug: "Metformin",
    supplement: "Magnesium",
    severity: "Low",
    description: "May be beneficial - Magnesium deficiency common with Metformin use.",
    mechanism: "Metformin may deplete magnesium stores"
  },
  {
    drug: "Digoxin",
    supplement: "Magnesium",
    severity: "Moderate",
    description: "Low magnesium levels can increase Digoxin toxicity risk.",
    mechanism: "Magnesium deficiency increases cardiac sensitivity to Digoxin"
  },
  {
    drug: "Tetracycline",
    supplement: "Calcium",
    severity: "High",
    description: "Calcium significantly reduces Tetracycline absorption. Take 2-4 hours apart.",
    mechanism: "Calcium forms chelates with Tetracycline"
  },
  {
    drug: "Aspirin",
    supplement: "Omega-3",
    severity: "Moderate",
    description: "Combined use may increase bleeding risk. Monitor for bleeding symptoms.",
    mechanism: "Both have antiplatelet effects"
  }
];

export const sampleSupplements = [
  {
    id: 1,
    name: "Vitamin D3",
    dosage: "2000 IU",
    frequency: "Daily",
    startDate: "2025-08-01",
    notes: "For immune support"
  },
  {
    id: 2,
    name: "Magnesium Glycinate",
    dosage: "400mg",
    frequency: "Daily",
    startDate: "2025-08-15",
    notes: "Better sleep and muscle recovery"
  }
];

export const sampleSideEffects = [
  {
    id: 1,
    supplementId: 2,
    supplementName: "Magnesium Glycinate",
    description: "Mild stomach upset in morning",
    severity: "Mild",
    dateOccurred: "2025-08-20"
  }
];

export const sampleHealthMetrics = [
  {
    id: 1,
    date: "2025-09-10",
    mood: 4,
    energy: 3,
    sleepQuality: "Good",
    notes: "Felt energetic after morning workout"
  },
  {
    id: 2,
    date: "2025-09-11",
    mood: 3,
    energy: 4,
    sleepQuality: "Excellent",
    notes: "Great sleep with magnesium supplement"
  },
  {
    id: 3,
    date: "2025-09-12",
    mood: 4,
    energy: 4,
    sleepQuality: "Good",
    notes: "Consistent energy levels"
  }
];

export const regulatoryInfo = {
  fdaOversight: "The FDA does not review dietary supplements for safety or efficacy before they reach the market. Under DSHEA (1994), supplements are regulated more like foods than drugs.",
  proprietaryBlends: "Proprietary blends allow manufacturers to hide specific amounts of individual ingredients, making it difficult to assess effectiveness or safety.",
  thirdPartyTesting: "Third-party certifications from NSF, USP, or ConsumerLab provide independent verification of supplement contents and purity.",
  commonIssues: [
    "Underdosed active ingredients",
    "Contamination with heavy metals", 
    "Undisclosed pharmaceutical compounds",
    "Mislabeled contents"
  ]
};
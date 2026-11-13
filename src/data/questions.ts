export interface Question {
  id: string;
  questionNumber: number;
  domain: "Thoracic" | "ALARA Physics" | "Neuroradiology" | "Emergency Trauma" | "Musculoskeletal" | "GI/Abdomen";
  track: "core" | "alara" | "spotters" | "past_papers";
  difficulty: "Foundation" | "Moderate" | "Hard";
  stem: string;
  image?: string;
  windowPreset?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  reference: string;
  dhaBlueprintWeight: string;
}

export const MOCK_QUESTIONS: Question[] = [
  {
    id: "q-1",
    questionNumber: 1,
    domain: "Thoracic",
    track: "core",
    difficulty: "Foundation",
    stem: "A 34-year-old male presents with sudden pleuritic right-sided chest pain and acute shortness of breath. Review the posteroanterior radiograph. What is the most likely diagnosis?",
    image: "/chest-xray.jpg",
    windowPreset: "Window: Lung (W:1500 L:-600)",
    options: [
      { id: "A", text: "Right apical bullous emphysema", isCorrect: false },
      { id: "B", text: "Primary spontaneous pneumothorax", isCorrect: true },
      { id: "C", text: "Loculated right pleural effusion", isCorrect: false },
      { id: "D", text: "Skin fold artifact (pseudopneumothorax)", isCorrect: false }
    ],
    explanation: "Correct: (B) Primary spontaneous pneumothorax. The distinct sharp white visceral pleural line devoid of peripheral pulmonary vascular markings is pathognomonic. Skin fold artifacts project beyond the thoracic cage boundary and demonstrate an edge effect.",
    reference: "Grainger & Allison's Diagnostic Radiology, 7th Ed, Ch. 12",
    dhaBlueprintWeight: "Thoracic 22%"
  },
  {
    id: "q-2",
    questionNumber: 2,
    domain: "ALARA Physics",
    track: "alara",
    difficulty: "Hard",
    stem: "According to ICRP Publication 103 and DHA radiation safety standards, what is the annual effective dose limit for occupationally exposed radiation personnel averaged over 5 consecutive years?",
    options: [
      { id: "A", text: "50 mSv in any single year, provided 5-year average is 20 mSv/year", isCorrect: true },
      { id: "B", text: "100 mSv strictly every single year", isCorrect: false },
      { id: "C", text: "1 mSv per year for all hospital workers", isCorrect: false },
      { id: "D", text: "150 mSv for eye lens and whole body", isCorrect: false }
    ],
    explanation: "Correct: (A). ICRP 103 occupational limit for effective dose is 20 mSv per year, averaged over defined periods of 5 years (100 mSv in 5 years), with the further provision that in any single year the effective dose should not exceed 50 mSv.",
    reference: "ICRP Publication 103 & Bushberg Physics of Medical Imaging, Ch. 22",
    dhaBlueprintWeight: "Physics & Safety 20%"
  },
  {
    id: "q-3",
    questionNumber: 3,
    domain: "Neuroradiology",
    track: "past_papers",
    difficulty: "Moderate",
    stem: "An axial non-contrast head CT in a 24-year-old following head trauma shows a biconvex (lenticular) high-attenuation extra-axial collection that does not cross the cranial sutures. Which vessel is most commonly ruptured?",
    options: [
      { id: "A", text: "Bridging cortical veins", isCorrect: false },
      { id: "B", text: "Middle meningeal artery", isCorrect: true },
      { id: "C", text: "Anterior cerebral artery", isCorrect: false },
      { id: "D", text: "Internal carotid cavernous segment", isCorrect: false }
    ],
    explanation: "Correct: (B) Middle meningeal artery. An epidural hematoma (EDH) typically arises from tear of the middle meningeal artery underneath a temporal bone fracture (pterion). It is bounded by sutural attachments of the periosteal dura.",
    reference: "Osborn's Brain: Imaging, Pathology, and Anatomy, 2nd Ed",
    dhaBlueprintWeight: "Neuroradiology 20%"
  },
  {
    id: "q-4",
    questionNumber: 4,
    domain: "Emergency Trauma",
    track: "spotters",
    difficulty: "Moderate",
    stem: "In an abdominal radiograph of a supine polytrauma patient, radiolucency outlining both the inner and outer margins of the bowel wall is observed. What is the name of this radiological sign?",
    options: [
      { id: "A", text: "Rigler sign (double-wall sign)", isCorrect: true },
      { id: "B", text: "Football sign", isCorrect: false },
      { id: "C", text: "Plesio-pneumoperitoneum marker", isCorrect: false },
      { id: "D", text: "Chilaiditi interposition sign", isCorrect: false }
    ],
    explanation: "Correct: (A) Rigler sign. In pneumoperitoneum on a supine radiograph, free gas in the peritoneal cavity outlines the external bowel wall while luminal intraluminal gas outlines the inner mucosa, making both sides visible.",
    reference: "Brant and Helms' Fundamentals of Diagnostic Radiology, Ch. 28",
    dhaBlueprintWeight: "Emergency/Trauma 18%"
  },
  {
    id: "q-5",
    questionNumber: 5,
    domain: "Thoracic",
    track: "core",
    difficulty: "Foundation",
    stem: "On a high-resolution computed tomography (HRCT) of the chest, which of the following is considered the primary diagnostic feature of honeycombing in Idiopathic Pulmonary Fibrosis (IPF)?",
    options: [
      { id: "A", text: "Subpleural, clustered cystic airspaces (3-10 mm) with shared thickened fibrous walls", isCorrect: true },
      { id: "B", text: "Centrilobular ground glass opacities sparing the subpleural zone", isCorrect: false },
      { id: "C", text: "Mosaic attenuation with extensive expiratory air trapping", isCorrect: false },
      { id: "D", text: "Peribronchovascular consolidations with reversed halo sign", isCorrect: false }
    ],
    explanation: "Correct: (A). Honeycombing on HRCT represents clustered, thick-walled subpleural cystic spaces typically 3-10 mm in diameter, characteristic of the definitive Usual Interstitial Pneumonia (UIP) pattern.",
    reference: "Fleischner Society CT Glossary & Diagnostic Guidelines for IPF 2022",
    dhaBlueprintWeight: "Thoracic 22%"
  },
  {
    id: "q-6",
    questionNumber: 6,
    domain: "Musculoskeletal",
    track: "spotters",
    difficulty: "Foundation",
    stem: "What is the classic radiographic appearance of a non-ossifying fibroma (NOF) in the distal femoral metaphysis of an asymptomatic 14-year-old?",
    options: [
      { id: "A", text: "Well-circumscribed eccentrically located osteolytic lesion with thin sclerotic scalloped border and multilocular bubbly appearance", isCorrect: true },
      { id: "B", text: "Permeative cortical destruction with hair-on-end periosteal reaction", isCorrect: false },
      { id: "C", text: "Dense cloud-like osteoid matrix mineralization in the epiphysis", isCorrect: false },
      { id: "D", text: "Central nidus with marked surrounding reactive sclerosis", isCorrect: false }
    ],
    explanation: "Correct: (A). NOF (fibrous cortical defect) is an eccentric, metaphyseal lucent lesion with a sharp scalloped sclerotic rim without aggressive periosteal reaction or soft-tissue mass.",
    reference: "Helms' Skeletal Radiology: The Bare Bones",
    dhaBlueprintWeight: "MSK 15%"
  },
  {
    id: "q-7",
    questionNumber: 7,
    domain: "GI/Abdomen",
    track: "core",
    difficulty: "Moderate",
    stem: "Which contrast enhancement pattern on dynamic multiphasic liver CT/MRI is diagnostic of a classic focal nodular hyperplasia (FNH)?",
    options: [
      { id: "A", text: "Immediate intense homogeneous arterial hyperenhancement with central scar that remains hypointense in arterial phase and hyperintense on delayed phases", isCorrect: true },
      { id: "B", text: "Peripheral nodular discontinuous puddling with progressive centripetal fill-in", isCorrect: false },
      { id: "C", text: "Arterial phase hyperenhancement with rapid portal venous washout and pseudocapsule", isCorrect: false },
      { id: "D", text: "Targetoid peripheral rim enhancement with central non-enhancing necrosis", isCorrect: false }
    ],
    explanation: "Correct: (A). FNH typically demonstrates vivid homogeneous arterial phase enhancement with a central stellate scar that enhances progressively in delayed phases due to abundant myxoid fibrous stroma.",
    reference: "LI-RADS v2024 Criteria & Clinical Imaging of Liver",
    dhaBlueprintWeight: "GI/Abdomen 15%"
  },
  {
    id: "q-8",
    questionNumber: 8,
    domain: "ALARA Physics",
    track: "alara",
    difficulty: "Hard",
    stem: "In digital radiography and CT, increasing the tube peak voltage (kVp) while keeping mAs constant will have what effect on patient entrance skin dose and beam penetrability?",
    options: [
      { id: "A", text: "Increases beam penetration and increases entrance skin exposure proportionally to kVp squared", isCorrect: true },
      { id: "B", text: "Decreases beam half-value layer (HVL)", isCorrect: false },
      { id: "C", text: "Decreases Compton scattering relative to photoelectric effect", isCorrect: false },
      { id: "D", text: "Reduces overall detector signal-to-noise ratio", isCorrect: false }
    ],
    explanation: "Correct: (A). Radiation output from the X-ray tube increases approximately with kVp^2. Higher kVp increases beam energy, increasing HVL and penetration, but with identical mAs it markedly increases tube output and patient entrance dose.",
    reference: "Bushberg JT. The Essential Physics of Medical Imaging, 3rd Ed",
    dhaBlueprintWeight: "Physics & Safety 20%"
  },
  {
    id: "q-9",
    questionNumber: 9,
    domain: "Neuroradiology",
    track: "past_papers",
    difficulty: "Moderate",
    stem: "Which MRI sequence is most sensitive for detecting hyperacute ischemic stroke within the first 30 minutes of symptom onset?",
    options: [
      { id: "A", text: "Diffusion-Weighted Imaging (DWI) with matching ADC hypointensity", isCorrect: true },
      { id: "B", text: "T2 FLAIR axial sequence", isCorrect: false },
      { id: "C", text: "T1 pre-contrast spin echo", isCorrect: false },
      { id: "D", text: "Gradient Echo (GRE) T2*", isCorrect: false }
    ],
    explanation: "Correct: (A). DWI shows cytotoxic edema as bright signal with low ADC within minutes of arterial occlusion, preceding FLAIR or T2 hyperintensity by several hours.",
    reference: "Stroke Imaging Guidelines & Osborn's Brain",
    dhaBlueprintWeight: "Neuroradiology 20%"
  },
  {
    id: "q-10",
    questionNumber: 10,
    domain: "Emergency Trauma",
    track: "spotters",
    difficulty: "Foundation",
    stem: "On a lateral cervical spine radiograph of an adult trauma patient, what is the maximum normal predental space (atlantodental interval, ADI)?",
    options: [
      { id: "A", text: "3.0 mm (up to 5.0 mm in young children)", isCorrect: true },
      { id: "B", text: "7.0 mm", isCorrect: false },
      { id: "C", text: "1.0 mm strictly", isCorrect: false },
      { id: "D", text: "10.0 mm", isCorrect: false }
    ],
    explanation: "Correct: (A). The normal adult ADI (distance between posterior cortex of anterior arch of C1 and anterior cortex of the dens) is <= 3 mm. An ADI > 3 mm in adults indicates transverse ligament disruption.",
    reference: "Harris & Mirvis. The Radiology of Emergency Medicine",
    dhaBlueprintWeight: "Emergency/Trauma 18%"
  }
];

export interface SprintQuestion {
  id: number;
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const SPRINT_QUESTIONS: SprintQuestion[] = [
  {
    id: 1,
    domain: "Thoracic CT",
    question: "Signet ring sign on axial chest CT is diagnostic of which entity?",
    options: ["Bronchiectasis", "Pulmonary Embolism", "Hamartoma", "Pneumatocele"],
    correctAnswer: 0,
    explanation: "Signet ring sign occurs when internal diameter of bronchus exceeds adjacent pulmonary artery diameter."
  },
  {
    id: 2,
    domain: "Radiation Physics",
    question: "If operator distance from a fluoroscopy tube is doubled from 1m to 2m, the dose rate drops to:",
    options: ["1/2", "1/4", "1/8", "Zero"],
    correctAnswer: 1,
    explanation: "Inverse square law: Dose is inversely proportional to distance squared (1/2^2 = 1/4)."
  },
  {
    id: 3,
    domain: "Emergency CT",
    question: "Sentinel clot sign in abdominal trauma is most useful for:",
    options: ["Localizing site of organ hemorrhage", "Differentiating ascites", "Predicting pneumothorax", "Evaluating bowel ischemia"],
    correctAnswer: 0,
    explanation: "The highest CT attenuation hematoma (sentinel clot) lies closest to the bleeding organ."
  },
  {
    id: 4,
    domain: "Neuro MRI",
    question: "Which sequence confirms fat within a dermoid cyst or teratoma?",
    options: ["T1 with Fat Saturation loss", "DWI restriction", "T2 FLAIR hyperintensity", "SWI bloom"],
    correctAnswer: 0,
    explanation: "Fat suppression cancels high T1 signal of adipose tissue."
  },
  {
    id: 5,
    domain: "Pediatric Rad",
    question: "Target sign on abdominal ultrasound in an infant with colicky pain indicates:",
    options: ["Intussusception", "Hypertrophic Pyloric Stenosis", "Midgut volvulus", "Appendicitis"],
    correctAnswer: 0,
    explanation: "Concentric rings of alternating echogenicity represent bowel within bowel."
  },
  {
    id: 6,
    domain: "Bone Spotters",
    question: "Fallen fragment sign on plain radiograph is characteristic of:",
    options: ["Simple (unicameral) bone cyst", "Aneurysmal bone cyst", "Osteosarcoma", "Enchondroma"],
    correctAnswer: 0,
    explanation: "Pathologic cortical fracture fragment sinks to dependent portion of fluid-filled UBC."
  },
  {
    id: 7,
    domain: "ALARA Protocol",
    question: "Standard lead apron equivalent thickness required in fluoroscopy suites is at least:",
    options: ["0.25 mm to 0.5 mm Pb", "2.0 mm Pb", "0.05 mm Pb", "1.0 cm Pb"],
    correctAnswer: 0,
    explanation: "0.25 to 0.5 mm lead equivalent attenuates >90-95% of scatter radiation at diagnostic kVp."
  },
  {
    id: 8,
    domain: "Mammography",
    question: "Popcorn calcifications on mammogram are classic for involuting:",
    options: ["Fibroadenoma", "Ductal carcinoma in situ", "Fat necrosis", "Phyllodes tumor"],
    correctAnswer: 0,
    explanation: "Coarse 'popcorn' calcifications are pathognomonic for degenerating fibroadenomas."
  },
  {
    id: 9,
    domain: "Cardiac Rad",
    question: "Water bottle heart appearance on erect chest radiograph suggests:",
    options: ["Large pericardial effusion", "Tetralogy of Fallot", "Coarctation of aorta", "Ebstein anomaly"],
    correctAnswer: 0,
    explanation: "Globular symmetric enlargement of cardiac silhouette without pulmonary edema."
  },
  {
    id: 10,
    domain: "Vascular Rad",
    question: "String of beads sign on renal angiogram in a young female with hypertension is classic for:",
    options: ["Fibromuscular dysplasia (FMD)", "Atherosclerotic stenosis", "Polyarteritis nodosa", "Takayasu arteritis"],
    correctAnswer: 0,
    explanation: "Medial fibroplasia causes alternating stenosis and ectasia of the mid-to-distal renal artery."
  }
];

export interface CommunityPost {
  id: string;
  author: string;
  badge: string;
  avatarBg: string;
  initials: string;
  time: string;
  text: string;
  likes: number;
  replies: number;
}

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "p-1",
    author: "Dr. Fatima Al-Mansoor",
    badge: "Cleared DHA 2024",
    avatarBg: "bg-emerald-600",
    initials: "FA",
    time: "12m ago",
    text: "Heads up everyone taking the DHA exam this month: make sure you master the revised ICRP 103 dose limits and the pediatric bone age Greulich & Pyle standard for hand radiograph! 3 spotters were directly from that.",
    likes: 24,
    replies: 5
  },
  {
    id: "p-2",
    author: "Dr. Omar Khaled",
    badge: "Radiology Registrar",
    avatarBg: "bg-blue-600",
    initials: "OK",
    time: "48m ago",
    text: "Does anyone have a solid mnemonic for the benign bone lesions with fluid-fluid levels? ABC vs Giant Cell Tumor?",
    likes: 15,
    replies: 8
  },
  {
    id: "p-3",
    author: "Dr. Tariq Al-Hashimi",
    badge: "Specialist Radiologist",
    avatarBg: "bg-black",
    initials: "TA",
    time: "2h ago",
    text: "Remember: In acute trauma, look for subtle pneumoperitoneum at the liver surface (anterior superior) in horizontal beam lateral decubitus. Don't rely solely on upright films if patient is supine!",
    likes: 89,
    replies: 19
  }
];


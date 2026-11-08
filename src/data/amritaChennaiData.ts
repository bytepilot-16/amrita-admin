export interface BranchData {
  id: string;
  name: string;
  code: string;
  department: string;
  description: string;
  seats: number;
  avgPackage: string;
  highestPackage: string;
  topRecruiters: string[];
  keyLabs: string[];
  slabCutoffs: {
    slab1: { aeee: number; jeePercentile: number; fee: number };
    slab2: { aeee: number; jeePercentile: number; fee: number };
    slab3: { aeee: number; jeePercentile: number; fee: number };
    regular: { aeee: number; jeePercentile: number; fee: number };
  };
}

export interface BuildingNode {
  id: string;
  name: string;
  code: string;
  category: 'academic' | 'research' | 'residential' | 'dining' | 'sports' | 'spiritual' | 'utility';
  x: number; // percentage coordinate on 2.5D blueprint
  y: number;
  description: string;
  walkTimeFromGate: string;
  timings: string;
  rules: string[];
  facilities: string[];
  relatedQuery: string;
}

export interface MessDayMenu {
  day: string;
  breakfast: { time: string; items: string[]; beverage: string };
  lunch: { time: string; items: string[]; specials: string };
  snacks: { time: string; items: string[]; beverage: string };
  dinner: { time: string; items: string[]; sweetOrFruit: string };
}

export const AMRITA_CAMPUS_META = {
  name: "Amrita Vishwa Vidyapeetham",
  campus: "Chennai Campus (Vengal)",
  address: "337/1A, Vengal Village, Tiruvallur Taluk & District, Tamil Nadu 601103",
  coordinates: "13.2384° N, 79.9739° E",
  established: 2019,
  nirfUniversityRank: "Top 7 in India (Vishwa Vidyapeetham Overall)",
  naacAccreditation: "A++ Grade (Highest Tier)",
  deanOffice: "Academic Block 1 (AB-1), Level 2",
  admissionsHelpline: "+91 44 3553 9000 / admissions.chn@amrita.edu",
  curfewTime: "8:30 PM (Biometric Hostel Gate Closure)",
  studyHours: "9:00 PM – 10:30 PM (Quiet Study Protocol)",
  cautionDeposit: 10000, // Refundable one-time
  hostelAnnualBase: 110000, // Average hostel + mess per year
};

export const CHENNAI_BRANCHES: BranchData[] = [
  {
    id: "cse-core",
    name: "Computer Science & Engineering",
    code: "CSE",
    department: "School of Computing",
    description: "Flagship computing program focusing on algorithms, high-performance computing, distributed systems, and systems engineering.",
    seats: 180,
    avgPackage: "₹11.8 LPA",
    highestPackage: "₹56.9 LPA",
    topRecruiters: ["Microsoft", "Google", "Amazon", "Cisco", "Oracle", "Directi"],
    keyLabs: ["Alan Turing Advanced Computing Lab", "Distributed Systems Cluster", "Apple iOS Developer Academy"],
    slabCutoffs: {
      slab1: { aeee: 2500, jeePercentile: 96.5, fee: 150000 },
      slab2: { aeee: 7500, jeePercentile: 93.0, fee: 275000 },
      slab3: { aeee: 15000, jeePercentile: 88.0, fee: 375000 },
      regular: { aeee: 24000, jeePercentile: 80.0, fee: 475000 },
    },
  },
  {
    id: "cse-ai-ds",
    name: "CSE (Artificial Intelligence & Data Science)",
    code: "AI&DS",
    department: "School of Computing",
    description: "Cutting-edge curriculum in deep neural networks, generative AI, LLM fine-tuning, computer vision, and autonomous intelligence systems.",
    seats: 120,
    avgPackage: "₹11.2 LPA",
    highestPackage: "₹52.0 LPA",
    topRecruiters: ["NVIDIA", "Amazon AWS", "Accenture AI Labs", "Target", "Siemens"],
    keyLabs: ["NVIDIA GPU AI Research Cluster", "Computer Vision & Robotics Arena", "Speech & NLP Sandbox"],
    slabCutoffs: {
      slab1: { aeee: 3500, jeePercentile: 95.2, fee: 150000 },
      slab2: { aeee: 9500, jeePercentile: 91.5, fee: 275000 },
      slab3: { aeee: 18000, jeePercentile: 86.5, fee: 375000 },
      regular: { aeee: 28000, jeePercentile: 78.0, fee: 475000 },
    },
  },
  {
    id: "cse-cyber",
    name: "CSE (Cyber Security)",
    code: "CYBER",
    department: "Center for Cyber Security Systems & Networks",
    description: "Specialized defense curriculum backed by Amrita's globally renowned bi0s CTF research team. Reverse engineering, cryptography, and zero-day defense.",
    seats: 60,
    avgPackage: "₹10.8 LPA",
    highestPackage: "₹48.0 LPA",
    topRecruiters: ["CrowdStrike", "Palo Alto Networks", "Cisco Talos", "Wells Fargo", "KPMG Cyber"],
    keyLabs: ["bi0s Offensive Security Warzone", "Hardware Hacking & IoT Pen-Testing Bay", "Cryptographic Protocol Bench"],
    slabCutoffs: {
      slab1: { aeee: 4800, jeePercentile: 94.0, fee: 150000 },
      slab2: { aeee: 12000, jeePercentile: 89.5, fee: 275000 },
      slab3: { aeee: 21000, jeePercentile: 84.0, fee: 375000 },
      regular: { aeee: 32000, jeePercentile: 76.0, fee: 450000 },
    },
  },
  {
    id: "cce",
    name: "Computer & Communication Engineering",
    code: "CCE",
    department: "School of Computing & Telecommunications",
    description: "Hybrid engineering combining 5G/6G networking protocols, cloud networks, software-defined radios, and cloud infrastructure.",
    seats: 60,
    avgPackage: "₹9.5 LPA",
    highestPackage: "₹38.5 LPA",
    topRecruiters: ["Qualcomm", "Ericsson", "Cisco", "Nokia", "Samsung R&D"],
    keyLabs: ["5G & Next-Gen Wireless Testbed", "Cloud Networking Simulator", "Signal Processing Workbench"],
    slabCutoffs: {
      slab1: { aeee: 7500, jeePercentile: 92.5, fee: 150000 },
      slab2: { aeee: 17500, jeePercentile: 86.0, fee: 275000 },
      slab3: { aeee: 28000, jeePercentile: 80.0, fee: 375000 },
      regular: { aeee: 36000, jeePercentile: 74.0, fee: 425000 },
    },
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    code: "ECE",
    department: "Department of Electronics & Communication",
    description: "VLSI chip design, embedded microcontrollers, IoT edge AI, microwave engineering, and signal integrity testing.",
    seats: 120,
    avgPackage: "₹9.2 LPA",
    highestPackage: "₹42.0 LPA",
    topRecruiters: ["Texas Instruments", "Intel", "Cadence", "Synopsys", "Bosch", "Microchip"],
    keyLabs: ["VLSI Chip Design Suite (Cadence/Synopsys)", "Embedded Edge AI Systems Lab", "RF & Microwave Chamber"],
    slabCutoffs: {
      slab1: { aeee: 6500, jeePercentile: 93.5, fee: 150000 },
      slab2: { aeee: 16000, jeePercentile: 87.5, fee: 275000 },
      slab3: { aeee: 26000, jeePercentile: 81.5, fee: 375000 },
      regular: { aeee: 35000, jeePercentile: 75.0, fee: 425000 },
    },
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    code: "EEE",
    department: "Department of Electrical Engineering",
    description: "Electric vehicle powertrain engineering, renewable smart grids, power electronics, battery management systems (BMS), and automation.",
    seats: 60,
    avgPackage: "₹8.4 LPA",
    highestPackage: "₹32.0 LPA",
    topRecruiters: ["ABB", "Schneider Electric", "Tesla Energy (Suppliers)", "L&T", "Tata Motors EV"],
    keyLabs: ["EV Powertrain & Battery Testbench", "Smart Microgrid Research Lab", "Industrial PLC Automation Suite"],
    slabCutoffs: {
      slab1: { aeee: 12000, jeePercentile: 88.0, fee: 150000 },
      slab2: { aeee: 22000, jeePercentile: 82.0, fee: 275000 },
      slab3: { aeee: 35000, jeePercentile: 75.0, fee: 375000 },
      regular: { aeee: 42000, jeePercentile: 70.0, fee: 400000 },
    },
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    code: "ME",
    department: "Department of Mechanical Engineering",
    description: "Industry 4.0 robotics, autonomous drone design, additive 3D manufacturing, computational fluid dynamics (CFD), and finite element modeling.",
    seats: 60,
    avgPackage: "₹8.0 LPA",
    highestPackage: "₹28.0 LPA",
    topRecruiters: ["Dassault Systèmes", "L&T Heavy Civil", "Mahindra & Mahindra", "Batery & Drone Startups"],
    keyLabs: ["Additive Manufacturing & 3D Print Lab", "Robotics & CNC Automation Cell", "Wind Tunnel & Aerodynamics Bench"],
    slabCutoffs: {
      slab1: { aeee: 12500, jeePercentile: 87.5, fee: 150000 },
      slab2: { aeee: 23000, jeePercentile: 81.0, fee: 275000 },
      slab3: { aeee: 36000, jeePercentile: 74.5, fee: 375000 },
      regular: { aeee: 44000, jeePercentile: 68.0, fee: 400000 },
    },
  },
];

export const CAMPUS_NODES: BuildingNode[] = [
  {
    id: "ab-1",
    name: "Academic Block 1 (AB-1)",
    code: "AB-1",
    category: "academic",
    x: 48,
    y: 35,
    description: "The primary 5-storey architectural centerpiece housing smart lecture theaters, Dean's Chamber, admissions cell, and computing departments.",
    walkTimeFromGate: "4 mins (300 meters)",
    timings: "8:00 AM – 6:30 PM",
    rules: ["Smart ID Card tap mandatory at entry", "Formal attire enforced during 8:30 AM – 4:30 PM", "Mobile phones on silent in lecture halls"],
    facilities: ["Air-conditioned tiered lecture halls", "Department of Computer Science", "Dean & Admissions Office", "High-speed Wi-Fi 6 coverage"],
    relatedQuery: "Tell me about Academic Block 1 and lecture hall facilities at Chennai",
  },
  {
    id: "turing-lab",
    name: "Alan Turing AI & High-Performance Lab",
    code: "LAB-TURING",
    category: "research",
    x: 62,
    y: 28,
    description: "Supercomputing and edge hardware laboratory powered by NVIDIA DGX workstations, humanoid robotic rigs, and high-frequency FPGA boards.",
    walkTimeFromGate: "6 mins (420 meters)",
    timings: "8:00 AM – 9:00 PM (24/7 during Hackathons)",
    rules: ["Authorized badge swipe required", "No food or unsealed liquids permitted", "Log out of compute clusters when done"],
    facilities: ["NVIDIA RTX 4090 & A100 Clusters", "Robotics Test Track", "Cyber Defense Sandbox", "3D Printing & Soldering Station"],
    relatedQuery: "What hardware and GPU compute clusters exist in the AI & Turing lab?",
  },
  {
    id: "central-library",
    name: "Central Knowledge Library",
    code: "LIB-CENTRAL",
    category: "academic",
    x: 35,
    y: 42,
    description: "A three-level peaceful sanctuary stocked with over 45,000 physical volumes, IEEE Xplore digital terminals, soundproof study pods, and archival stacks.",
    walkTimeFromGate: "5 mins (380 meters)",
    timings: "8:00 AM – 10:00 PM (Weekdays) | 9:00 AM – 6:00 PM (Sundays)",
    rules: ["Absolute silence in Reading Zone 2 & 3", "Books issued for 14 days renewal", "No bags permitted beyond cloak locker"],
    facilities: ["IEEE / ACM / Springer Digital Terminals", "Sound-insulated Group Discussion Rooms", "Reprography & Printing Unit", "Faculty Research Lounge"],
    relatedQuery: "What are the Central Library hours and IEEE digital resource access?",
  },
  {
    id: "boys-hostel",
    name: "Agastya & Vyasa Boys Hostels",
    code: "HSTL-BOYS",
    category: "residential",
    x: 75,
    y: 58,
    description: "Multi-wing residential towers for male students featuring spacious 4-sharing rooms for 1st years, solar water heaters, study desks, and Wi-Fi access points.",
    walkTimeFromGate: "8 mins (600 meters)",
    timings: "Gate Closes strictly at 8:30 PM",
    rules: ["Biometric check-in mandatory by 8:30 PM", "Study hours enforced 9:00 PM – 10:30 PM", "Electric kettles/heaters prohibited in rooms", "Outing pass via MMS with parent OTP"],
    facilities: ["High-speed Wi-Fi in every wing", "Table Tennis & Indoor Games Room", "Reverse Osmosis Mineral Water Dispensers", "Warden & Proctor Resident Quarters"],
    relatedQuery: "What are the boys hostel rules, curfew timings, and room facilities?",
  },
  {
    id: "girls-hostel",
    name: "Gargi & Maitreyi Girls Hostels",
    code: "HSTL-GIRLS",
    category: "residential",
    x: 22,
    y: 55,
    description: "Secure, scenic residential complex nestled in landscaped gardens with 24/7 dedicated female security wardens, recreation halls, and reading lounges.",
    walkTimeFromGate: "7 mins (550 meters)",
    timings: "Gate Closes strictly at 8:30 PM",
    rules: ["Biometric logging before 8:30 PM", "Parents/Guardians meet only in visitor lounge", "Outing passes require Amrita MMS approval + SMS confirmation"],
    facilities: ["Private garden quadrangle", "24/7 Resident Matron & Nurse", "Study Lounge on every floor", "Badminton court inside perimeter"],
    relatedQuery: "Explain the girls hostel security, warden protocol, and outing pass system",
  },
  {
    id: "annapoorna-mess",
    name: "Annapoorna Central Dining Hall",
    code: "MESS-ANNAPOORNA",
    category: "dining",
    x: 52,
    y: 65,
    description: "Sprawling two-level pure vegetarian dining facility serving hygienic, hot Satvik South & North Indian meals prepared in steam-jacketed automated kettles.",
    walkTimeFromGate: "6 mins (450 meters)",
    timings: "Breakfast: 7:30–8:45 AM | Lunch: 12:20–1:30 PM | Snacks: 4:30–5:30 PM | Dinner: 7:30–8:45 PM",
    rules: ["No food wastage tolerated — clean plate policy", "Dining limited to designated meal windows", "Footwear racks used before hand-wash area"],
    facilities: ["Steam cooking hygiene standards", "Separate North Indian Phulka counter", "Filtered RO Drinking Fountains", "Attached Amrita Night Canteen (8:00–10:30 PM)"],
    relatedQuery: "Show me the complete Satvik mess menu, timings, and night canteen options",
  },
  {
    id: "sports-complex",
    name: "Sports Complex & Athletic Grounds",
    code: "SPORTS-ARENA",
    category: "sports",
    x: 78,
    y: 20,
    description: "Expansive recreational arena featuring full-sized synthetic basketball courts, volleyball courts, cricket pitch, 400m running track, and gym.",
    walkTimeFromGate: "10 mins (750 meters)",
    timings: "Morning: 6:00 AM – 8:00 AM | Evening: 4:30 PM – 7:30 PM",
    rules: ["Proper sports shoes and kit required", "Equipment issued against university ID", "Lights off at 7:45 PM"],
    facilities: ["Floodlit Basketball & Volleyball Courts", "Full-length Cricket Practice Nets", "Multi-station Gymnasium & Weight Room", "Annual Amrita Sports League"],
    relatedQuery: "What sports facilities and gymnasium equipment are available on campus?",
  },
  {
    id: "prayer-hall",
    name: "Sri Mata Amritanandamayi Prayer Hall",
    code: "SHRINE-MEDITATION",
    category: "spiritual",
    x: 32,
    y: 22,
    description: "Architectural sanctum devoted to quiet introspection, daily evening bhajans, universal spiritual values, and mindfulness sessions.",
    walkTimeFromGate: "5 mins (350 meters)",
    timings: "Open 5:30 AM – 8:30 PM | Evening Bhajans: 6:30 PM – 7:15 PM",
    rules: ["Footwear removed outside marble entrance", "Silence preserved at all times", "Phones strictly switched off"],
    facilities: ["Marble meditation platform", "Traditional Indian instruments", "Weekly guided mindfulness sessions", "Cultural festival celebrations"],
    relatedQuery: "Are there meditation or yoga sessions at the prayer hall?",
  },
  {
    id: "transit-gate",
    name: "Main Archway Gate & Bus Transit Bay",
    code: "GATE-TRANSIT",
    category: "utility",
    x: 48,
    y: 92,
    description: "The grand gateway along Vengal main road featuring 24/7 security checkpoint, visitor registration desk, and the terminal depot for 20+ college buses.",
    walkTimeFromGate: "0 mins (Entry point)",
    timings: "24/7 Security Desk | Visitor Entry: 8:30 AM – 6:00 PM",
    rules: ["All non-residents must register at visitor desk", "Helmet mandatory for two-wheelers", "Speed limit 15 km/h inside campus perimeter"],
    facilities: ["College Bus Terminal (Anna Nagar, Avadi, Koyambedu)", "Parent & Visitor Parking Pavilion", "Security Command & CCTV Center", "Auto & Cab Pickup Stand"],
    relatedQuery: "How do college buses operate and what are the main pickup points in Chennai?",
  },
  {
    id: "clinic-health",
    name: "Health Clinic & Medical Center",
    code: "MED-CLINIC",
    category: "utility",
    x: 38,
    y: 72,
    description: "Round-the-clock emergency medical facility with resident medical officers, emergency nursing staff, observation beds, and tie-up with Tiruvallur Gov & Private Hospitals.",
    walkTimeFromGate: "5 mins (380 meters)",
    timings: "24 Hours (Resident Doctor on Duty)",
    rules: ["Free consultation and first-aid for students", "Prescriptions logged in digital health record", "Ambulance on 24/7 standby for hospital transfers"],
    facilities: ["Emergency Ambulance on standby", "Basic pharmacy dispensary", "Rest and observation ward (6 beds)", "Regular health & immunization checkups"],
    relatedQuery: "What medical and doctor facilities are available if a student gets sick?",
  },
];

export const WEEKLY_MESS_MENU: MessDayMenu[] = [
  {
    day: "Monday",
    breakfast: {
      time: "7:30 – 8:45 AM",
      items: ["Soft Steamed Idli (3 pcs)", "Crispy Medu Vada (1 pc)", "Fresh Drumstick Sambar", "Coconut & Tomato Chutneys"],
      beverage: "Madras Filter Coffee / Fresh Milk / Hot Tea",
    },
    lunch: {
      time: "12:20 – 1:30 PM",
      items: ["Steamed Ponni White Rice", "Arachuvitta Sambar", "Milagu (Pepper) Rasam", "Beans & Carrot Poriyal", "Pasi Paruppu Kootu", "Warm Phulkas (2 pcs)", "Appalam (Papad)", "Chilled Curd"],
      specials: "Fresh Lemon Pickle & Ghee",
    },
    snacks: {
      time: "4:30 – 5:30 PM",
      items: ["Crispy Onion Pakoda", "White Chana Sundal"],
      beverage: "Hot Masala Chai / Filter Coffee",
    },
    dinner: {
      time: "7:30 – 8:45 PM",
      items: ["Fresh Phulkas with Paneer Butter Masala", "Jeera Pulao Rice", "Tomato Dal Fry", "Steamed Rice with Tomato Rasam", "Curd Rice with Pomegranate"],
      sweetOrFruit: "Sweet Kesari & Robusta Banana",
    },
  },
  {
    day: "Tuesday",
    breakfast: {
      time: "7:30 – 8:45 AM",
      items: ["Ghee Ven Pongal with Cashews", "Crispy Medu Vada", "Brinjal Gosthu / Tiffin Sambar", "Coriander Mint Chutney"],
      beverage: "Madras Filter Coffee / Fresh Milk / Tea",
    },
    lunch: {
      time: "12:20 – 1:30 PM",
      items: ["Steamed Rice", "Vendakkai (Okra) Mor Kuzhambu (Buttermilk Curry)", "Thakkali (Tomato) Rasam", "Aloo Gobi Dry Sabzi", "Keerai (Spinach) Kootu", "Chapati", "Crunchy Fryums", "Fresh Moru (Buttermilk)"],
      specials: "Green Mango Pickle",
    },
    snacks: {
      time: "4:30 – 5:30 PM",
      items: ["Warm Vegetable Samosa (1 pc)", "Green Chutney & Tomato Dip"],
      beverage: "Hot Cardamom Tea / Filter Coffee",
    },
    dinner: {
      time: "7:30 – 8:45 PM",
      items: ["Crispy Kal Dosa (2 pcs)", "Poondu (Garlic) Kara Chutney", "Mixed Veg Kadai Gravy", "Steamed Rice with Paruppu (Dal) & Ghee", "Curd Rice"],
      sweetOrFruit: "Semiya Payasam & Fresh Fruit",
    },
  },
  {
    day: "Wednesday",
    breakfast: {
      time: "7:30 – 8:45 AM",
      items: ["Golden Masala Dosa / Plain Roast", "Potato Masala Filling", "Madras Hotel Sambar", "Spicy Red Coconut Chutney"],
      beverage: "Filter Coffee / Milk / Tea",
    },
    lunch: {
      time: "12:20 – 1:30 PM",
      items: ["Steamed Rice", "Kathirikai (Brinjal) Kara Kuzhambu", "Poondu Rasam", "Cabbage Green Peas Poriyal", "Channa Dal Kootu", "Fresh Phulkas", "Crispy Papad", "Thick Curd"],
      specials: "Ginger Inji Puli Pickle",
    },
    snacks: {
      time: "4:30 – 5:30 PM",
      items: ["Spiced Sweet Corn / Moong Dal Sundal", "Sweet Biscuit / Rusk"],
      beverage: "Ginger Tea / Madras Coffee",
    },
    dinner: {
      time: "7:30 – 8:45 PM",
      items: ["Soft Chapati", "Aloo Mattar Gravy", "Veg Biryani with Golden Onion Raitha", "Plain Rice with Pepper Rasam", "Thick Buttermilk"],
      sweetOrFruit: "Gulab Jamun (1 pc) & Warm Turmeric Milk",
    },
  },
  {
    day: "Thursday",
    breakfast: {
      time: "7:30 – 8:45 AM",
      items: ["Rava Upma with Cashews & Vegetables", "Golden Medu Vada", "Coconut Chutney", "Tangy Tomato Sambar"],
      beverage: "Madras Filter Coffee / Fresh Milk / Hot Tea",
    },
    lunch: {
      time: "12:20 – 1:30 PM",
      items: ["Steamed Rice", "Murungakkai (Drumstick) Sambar", "Mysore Rasam", "Vazhaikkai (Raw Banana) Varuval", "Snake Gourd Kootu", "Chapati", "Appalam", "Spiced Buttermilk with Curry Leaves"],
      specials: "Crispy Papad & Lime Pickle",
    },
    snacks: {
      time: "4:30 – 5:30 PM",
      items: ["Mysore Bonda / Medu Pakoda", "Coconut Chutney"],
      beverage: "Filter Coffee / Tea",
    },
    dinner: {
      time: "7:30 – 8:45 PM",
      items: ["Soft Wheat Phulkas (3 pcs)", "Dal Makhani (Pure Veg)", "Veg Pulao with Mixed Veggie Raitha", "Steamed Rice with Tomato Rasam", "Curd Rice with Pickle"],
      sweetOrFruit: "Carrot Halwa & Banana",
    },
  },
  {
    day: "Friday",
    breakfast: {
      time: "7:30 – 8:45 AM",
      items: ["Puffy Poori (3 pcs)", "Rich Potato Sagu / Masala", "Coconut Chutney"],
      beverage: "Madras Filter Coffee / Fresh Milk / Tea",
    },
    lunch: {
      time: "12:20 – 1:30 PM",
      items: ["Amrita Special Festive Feast: Steamed Rice", "Pinnacle Arachuvitta Sambar", "Pineapple Sweet-Tangy Rasam", "Urulaikizhangu (Potato) Roast", "Avial (Kerala style with Coconut)", "Phulka", "Appalam", "Sweet Payasam", "Thick Curd"],
      specials: "Authentic Mango Avakkai Pickle & Ghee",
    },
    snacks: {
      time: "4:30 – 5:30 PM",
      items: ["Karamani (Cowpea) Sundal", "Hot Veg Cutlet with Mint Dip"],
      beverage: "Masala Chai / Filter Coffee",
    },
    dinner: {
      time: "7:30 – 8:45 PM",
      items: ["South Indian Uthappam / Idiyappam", "Vegetable Kurma / Coconut Milk Stew", "Steamed Rice", "Jeera Rasam", "Thick Curd Rice with Mor Milagai (Fried Curd Chillies)"],
      sweetOrFruit: "Seasonal Fruit Salad",
    },
  },
  {
    day: "Saturday",
    breakfast: {
      time: "7:30 – 8:45 AM",
      items: ["Semiya Upma / Kichadi", "Coconut Chutney", "Sambar", "Bread & Jam Counter"],
      beverage: "Madras Filter Coffee / Fresh Milk / Tea",
    },
    lunch: {
      time: "12:20 – 1:30 PM",
      items: ["Steamed Rice", "Ennai Kathirikai (Stuffed Brinjal) Curry", "Kollu (Horsegram) Rasam", "Beetroot Poriyal", "Dal Tadka", "Warm Chapati", "Crispy Fryums", "Curd"],
      specials: "Garlic Pickle & Ghee",
    },
    snacks: {
      time: "4:30 – 5:30 PM",
      items: ["Crispy Masala Vada / Veg Puff", "Mint Dip"],
      beverage: "Hot Tea / Filter Coffee",
    },
    dinner: {
      time: "7:30 – 8:45 PM",
      items: ["Pav Bhaji (Satvik Amul butter style with toasted buns)", "Steamed Rice with Dal Fry", "Tomato Rasam", "Curd Rice with Pomegranate"],
      sweetOrFruit: "Vanilla Ice Cream Cup or Sweet Boondi",
    },
  },
  {
    day: "Sunday",
    breakfast: {
      time: "8:00 – 9:30 AM (Extended Sunday Weekend)",
      items: ["Crispy Ghee Podi Dosa", "Special Tomato Chutney & Coconut Chutney", "Vada", "Hotel Sambar"],
      beverage: "Madras Filter Coffee / Milk / Tea",
    },
    lunch: {
      time: "12:30 – 2:00 PM",
      items: ["Special Hyderabadi Veg Dum Biryani with Fried Onions", "Paneer Tikka Masala Gravy", "Mirchi Ka Salan (Mild)", "Cucumber Onion Raitha", "Steamed Rice & Garlic Rasam", "Appalam", "Sweet Gulab Jamun"],
      specials: "Sunday Grand Feast Dessert",
    },
    snacks: {
      time: "4:30 – 5:30 PM",
      items: ["Corn Cheese Balls / Veg Fingers", "Tea & Coffee"],
      beverage: "Special Filter Coffee / Tea",
    },
    dinner: {
      time: "7:30 – 8:45 PM",
      items: ["Phulka (3 pcs)", "Yellow Moong Dal Tadka", "Aloo Jeera Dry", "Steamed Rice with Rasam", "Creamy Curd Rice with Fresh Mango Pickle"],
      sweetOrFruit: "Banana & Warm Badam Milk",
    },
  },
];

export const BUS_ROUTES = [
  { id: "R1", route: "Anna Nagar Roundtana -> Thirumangalam -> Ambattur OT -> Vengal Campus", time: "6:45 AM", distance: "38 km", buses: 3 },
  { id: "R2", route: "Koyambedu Metro Station -> Maduravoyal -> Poonamallee -> Thirumazhisai -> Campus", time: "6:40 AM", distance: "42 km", buses: 4 },
  { id: "R3", route: "Avadi Railway Station -> Mittanamalli -> Thamaraipakkam -> Vengal Campus", time: "7:10 AM", distance: "22 km", buses: 4 },
  { id: "R4", route: "Tiruvallur Railway Station & Bus Stand -> Sevvapet -> Vengal Campus", time: "7:25 AM", distance: "14 km", buses: 3 },
  { id: "R5", route: "Red Hills -> Karanodai -> Periyapalayam -> Vengal Campus", time: "7:00 AM", distance: "28 km", buses: 2 },
  { id: "R6", route: "Tambaram -> Porur Bypass -> Poonamallee -> Vengal Campus", time: "6:25 AM", distance: "49 km", buses: 3 },
];

export const FRESHER_PACKING_CHECKLIST = [
  { id: "p1", category: "Documents", item: "Original 10th & 12th Marksheets + 5 self-attested photocopies", critical: true },
  { id: "p2", category: "Documents", item: "AEEE / JEE Score Card & Amrita Provisional Seat Allotment Letter", critical: true },
  { id: "p3", category: "Documents", item: "Transfer Certificate (TC), Migration Certificate & Conduct Certificate", critical: true },
  { id: "p4", category: "Documents", item: "Medical Fitness Certificate & Immunization Records (signed by MBBS doctor)", critical: true },
  { id: "p5", category: "Documents", item: "12 recent passport-size color photographs (white background)", critical: true },
  { id: "p6", category: "Hostel Essentials", item: "Single mattress (approx 72 x 36 inches), 2 bedsheets & pillow covers", critical: true },
  { id: "p7", category: "Hostel Essentials", item: "Sturdy padlock with 3 duplicate keys (for room door & wardrobe)", critical: true },
  { id: "p8", category: "Hostel Essentials", item: "Water bottle (stainless steel/BPA free) & personal umbrella/raincoat", critical: false },
  { id: "p9", category: "Hostel Essentials", item: "Bucket, mug, detergent tub, and clothes-drying clips", critical: false },
  { id: "p10", category: "Dress Code", item: "Formal collared shirts (tucked in) & formal trousers (Boys)", critical: true },
  { id: "p11", category: "Dress Code", item: "Formal Salwar Kameez / Churidar with pinned dupatta (Girls)", critical: true },
  { id: "p12", category: "Tech & Academics", item: "Laptop (Core i5/i7 or Apple Silicon M2/M3, 16GB RAM recommended for CSE/AI)", critical: true },
  { id: "p13", category: "Tech & Academics", item: "LAN Cable (Cat 6, 3-5 meters) & Surge-protected Extension Cord", critical: false },
  { id: "p14", category: "Health", item: "Personal first aid pouch (paracetamol, band-aids, antacid, personal meds)", critical: false },
];


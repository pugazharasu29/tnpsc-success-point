export const tnpscExamTests = [
  {
    id: "test-gr4-full-01",
    title: "TNPSC Group 4 & VAO Full Mock Exam #01",
    examType: "Group 4 & VAO",
    durationMinutes: 45, // condensed for online practice
    totalMarks: 300,
    passingMarks: 90,
    sections: ["பொதுத்தமிழ் (General Tamil)", "பொது அறிவு (General Studies)", "திறனறிவு (Aptitude)"],
    description: "Full-length standard test following the latest TNPSC Group 4 revised syllabus pattern (100 Tamil + 75 GS + 25 Aptitude ratio sample).",
    difficulty: "Medium - High"
  },
  {
    id: "test-tamil-ilakkiyam",
    title: "பொதுத்தமிழ் - இலக்கியம் & திருக்குறள் சிறப்புத் தேர்வு",
    examType: "Subject Special",
    durationMinutes: 25,
    totalMarks: 100,
    passingMarks: 40,
    sections: ["தமிழ் இலக்கியம் (Tamil Literature)"],
    description: "Focuses on சங்க இலக்கியம், திருக்குறள் (அதிகாரங்கள்), ஐம்பெருங்காப்பியங்கள், பக்தி இலக்கியம் & சிற்றிலக்கியங்கள்.",
    difficulty: "High"
  },
  {
    id: "test-aptitude-shortcuts",
    title: "Aptitude & Mental Ability - Speed & Accuracy Test",
    examType: "Aptitude Special",
    durationMinutes: 20,
    totalMarks: 75,
    passingMarks: 30,
    sections: ["திறனறிவு (Aptitude)"],
    description: "Covers HCF & LCM, Ratio & Proportion, Simple & Compound Interest, Time & Work, and Puzzles with step-by-step shortcuts.",
    difficulty: "Medium"
  },
  {
    id: "test-polity-tn-admin",
    title: "Indian Polity & Tamil Nadu Administration (Unit 8 & 9)",
    examType: "General Studies",
    durationMinutes: 30,
    totalMarks: 100,
    passingMarks: 35,
    sections: ["பொது அறிவு (General Studies)"],
    description: "Essential for Group 1 & Group 2 aspirants covering Constitutional Articles, Amendments, and TN Social Welfare Schemes.",
    difficulty: "High"
  }
];

export const sampleQuestions = [
  // SECTION 1: GENERAL TAMIL (தமிழ் இலக்கியம் & இலக்கணம்)
  {
    id: "q1",
    testId: "test-gr4-full-01",
    section: "பொதுத்தமிழ் (General Tamil)",
    subject: "தமிழ் இலக்கியம்",
    question: "‘கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக’ — இக்குறட்பாவில் பயின்று வந்துள்ள அணி எது?",
    questionEn: "Which poetic figure of speech (Ani) is employed in the Thirukkural: 'Karka Kasadarak Karpavai Katrapin Nirka Atharkuth Thaga'?",
    options: [
      "சொற்பொருள் பின்வருநிலையணி (Sol Porul Pinvarunilai Ani)",
      "வேற்றுமையணி (Vetrumai Ani)",
      "உவமையணி (Uvamai Ani)",
      "எடுத்துக்காட்டு உவமையணி (Eduthukaattu Uvamai Ani)"
    ],
    correctAnswer: 0,
    explanation: "பாடலில் வந்த சொல்லே மீண்டும் மீண்டும் வந்து, ஒரே பொருளைத் தருவது 'சொற்பொருள் பின்வருநிலையணி' ஆகும். இக்குறளில் 'கற்க', 'கற்பவை', 'கற்றபின்' என்று 'கல்' எனும் சொல் கற்றல் எனும் ஒரே பொருளில் மீண்டும் மீண்டும் வந்துள்ளது.",
    reference: "6-ஆம் வகுப்பு தமிழ் பாடப்புத்தகம் - திருக்குறள் அணி இலக்கணம்"
  },
  {
    id: "q2",
    testId: "test-gr4-full-01",
    section: "பொதுத்தமிழ் (General Tamil)",
    subject: "தமிழ் இலக்கியம்",
    question: "‘திராவிட மொழிகளின் ஒப்பிலக்கணம்’ (A Comparative Grammar of the Dravidian Languages) என்ற நூலை எழுதியவர் யார்?",
    questionEn: "Who authored the pioneering scholarly work 'A Comparative Grammar of the Dravidian Languages'?",
    options: [
      "ஜி.யு. போப் (G.U. Pope)",
      "ராபர்ட் கால்டுவெல் (Robert Caldwell)",
      "வீரமாமுனிவர் (Constanzo Beschi)",
      "பேராசிரியர் சுந்தரம்பிள்ளை (Prof. Sundaram Pillai)"
    ],
    correctAnswer: 1,
    explanation: "ராபர்ட் கால்டுவெல் (Robert Caldwell) 1856-ஆம் ஆண்டு 'திராவிட மொழிகளின் ஒப்பிலக்கணம்' என்ற நூலை எழுதி வெளியிட்டார். திராவிட மொழிகள் ஆரிய மொழிக் குடும்பத்திலிருந்து தனித்தன்மை வாய்ந்தவை என்பதை மெய்ப்பித்தார்.",
    reference: "9-ஆம் வகுப்பு தமிழ் - இயல் 1: திராவிட மொழிக்குடும்பம்"
  },
  {
    id: "q3",
    testId: "test-gr4-full-01",
    section: "பொதுத்தமிழ் (General Tamil)",
    subject: "தமிழ் அறிஞர்கள்",
    question: "‘பைந்தமிழ்த்தேர்ப்பாகன்’, ‘செந்தமிழ்த் தேனீ’, ‘சிந்துக்குத் தந்தை’ என பாரதியாரைப் போற்றிய கவிஞர் யார்?",
    questionEn: "Which poet praised Subramanya Bharathi with the titles 'Paithamizh Therpaagan', 'Senthamizh Thenee', and 'Sindhukku Thanthai'?",
    options: [
      "பாரதிதாசன் (Bharathidasan)",
      "நாமக்கல் கவிஞர் வெ. இராமலிங்கம் (Namakkal Kavignar)",
      "கவிமணி தேசிக விநாயகம் பிள்ளை (Kavimani)",
      "வாணிதாசன் (Vanidasan)"
    ],
    correctAnswer: 0,
    explanation: "பாரதியாரின் சீடரும் புரட்சிக் கவிஞருமான பாரதிதாசன், பாரதியாரை 'பைந்தமிழ்த்தேர்ப்பாகன், செந்தமிழ்த்தேனீ, புதிய அறம்பாட வந்த அறிஞன், நாட்டுக் கவிஞன், சிந்துக்குத் தந்தை' என்று புகழ்ந்து பாடியுள்ளார்.",
    reference: "10-ஆம் வகுப்பு தமிழ் - இயல் 1: தமிழ்ச்சொல் வளம் & குறிப்புகள்"
  },
  {
    id: "q4",
    testId: "test-gr4-full-01",
    section: "பொதுத்தமிழ் (General Tamil)",
    subject: "இலக்கணம்",
    question: "‘முக்காலம் உணர்ந்தவர்’ — இச்சொல்லின் சரியான இலக்கணக்குறிப்பு யாது?",
    questionEn: "What is the grammatical classification (Ilakkanak Kurippu) of the term 'Mukkalam Unarnthavar'?",
    options: [
      "வினையாலணையும் பெயர் (Vinaiyaalanaiyum Peyar)",
      "தொழிற்பெயர் (Thozhirpeyar)",
      "பெயரெச்சம் (Peyarecham)",
      "இரண்டாம் வேற்றுமைத் தொகை (Second Case Compound)"
    ],
    correctAnswer: 0,
    explanation: "ஒரு வினை அல்லது செயலைச் செய்த நபரைக் குறிக்கும் பெயர் 'வினையாலணையும் பெயர்' ஆகும். உணர்ந்தவர் என்பது உணர்தல் என்ற வினையைச் செய்தவரைக் குறிப்பதால் வினையாலணையும் பெயர் ஆகும்.",
    reference: "8-ஆம் வகுப்பு சமச்சீர் தமிழ் - இலக்கணப் பகுதி"
  },

  // SECTION 2: GENERAL STUDIES (POLITY, HISTORY, TN ADMIN)
  {
    id: "q5",
    testId: "test-gr4-full-01",
    section: "பொது அறிவு (General Studies)",
    subject: "இந்திய அரசியலமைப்பு (Indian Polity)",
    question: "இந்திய அரசியலமைப்பின் எந்த உறுப்பு (Article) ‘அரசியலமைப்புப் பரிகாரம் காணும் உரிமை’ (Right to Constitutional Remedies) பற்றி கூறுகிறது?",
    questionEn: "Which Article of the Indian Constitution guarantees the 'Right to Constitutional Remedies', described by Dr. B.R. Ambedkar as the Heart and Soul of the Constitution?",
    options: [
      "Article 19",
      "Article 21",
      "Article 32",
      "Article 44"
    ],
    correctAnswer: 2,
    explanation: "சரத்து 32 (Article 32) அடிப்படை உரிமைகள் மீறப்படும்போது உச்ச நீதிமன்றத்தை அணுகி ரிட் (Writs - ஆட்கொணர்வு, கட்டளையிடு, தடை, ஆவணக்கேட்பு, தகுதிமுறை வினவல்) மனுக்கள் மூலம் தீர்வு பெற வழிசெய்கிறது. டாக்டர் அம்பேத்கர் இதை 'அரசியலமைப்பின் இதயம் மற்றும் ஆன்மா' என்றார்.",
    reference: "10-ஆம் வகுப்பு குடிமையியல் - பாடம் 1: இந்திய அரசியலமைப்பு"
  },
  {
    id: "q6",
    testId: "test-gr4-full-01",
    section: "பொது அறிவு (General Studies)",
    subject: "தமிழ்நாடு வரலாறு & பண்பாடு (Unit 8)",
    question: "1806-ஆம் ஆண்டு நடைபெற்ற வரலாற்றுச் சிறப்புமிக்க வேலூர் புரட்சியின் போது சென்னையின் ஆளுநராக இருந்தவர் யார்?",
    questionEn: "Who was the Governor of Madras during the historic Vellore Mutiny of 1806?",
    options: [
      "வில்லியம் பெண்டிங் பிரபு (William Bentinck)",
      "எட்வர்ட் கிளைவ் (Edward Clive)",
      "தாமஸ் மன்றோ (Thomas Munro)",
      "வெல்லெஸ்லி பிரபு (Lord Wellesley)"
    ],
    correctAnswer: 0,
    explanation: "1806 வேலூர் புரட்சியின்போது சென்னை கவர்னராக வில்லியம் பெண்டிங் பிரபு (Lord William Bentinck) இருந்தார். தலைப்பாகை மற்றும் புதிய இராணுவ விதிகளால் ஏற்பட்ட இப்பேரெழுச்சிக்குப் பின் அவர் கவர்னர் பதவியிலிருந்து திரும்ப அழைக்கப்பட்டார்.",
    reference: "11-ஆம் வகுப்பு வரலாறு - தமிழ்நாட்டின் தொடக்ககால கிளர்ச்சிகள்"
  },
  {
    id: "q7",
    testId: "test-gr4-full-01",
    section: "பொது அறிவு (General Studies)",
    subject: "தமிழ்நாடு வளர்ச்சி நிர்வாகம் (Unit 9)",
    question: "தமிழ்நாட்டில் அரசுப் பள்ளிகளில் பயிலும் மாணவிகள் உயர்கல்வி பயில உதவும் ‘மூவலூர் இராமாமிர்தம் அம்மையார் புதுமைப் பெண் திட்டம்’ மூலம் மாதம் தோறும் வழங்கப்படும் உதவித்தொகை எவ்வளவு?",
    questionEn: "Under the 'Pudhumaipen Scheme' (Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme), what monthly financial assistance is given to girl students who studied in Govt schools?",
    options: [
      "₹500",
      "₹1,000",
      "₹1,500",
      "₹2,000"
    ],
    correctAnswer: 1,
    explanation: "அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை பயின்று கல்லூரி செல்லும் மாணவிகளின் சேர்க்கையை உயர்த்த மாதம் ₹1,000 அவர்களின் வங்கிக் கணக்கில் நேரடியாகச் செலுத்தப்படுகிறது.",
    reference: "TN Social Welfare & Women Empowerment Policy Note 2023-24"
  },
  {
    id: "q8",
    testId: "test-gr4-full-01",
    section: "பொது அறிவு (General Studies)",
    subject: "இந்தியப் பொருளாதாரம்",
    question: "நிதி ஆயோக் (NITI Aayog) எந்த நாளில் இருந்து செயல்பாட்டுக்கு வந்தது?",
    questionEn: "On which date did NITI Aayog (National Institution for Transforming India) officially come into effect replacing the Planning Commission?",
    options: [
      "January 1, 2014",
      "January 1, 2015",
      "August 15, 2015",
      "April 1, 2016"
    ],
    correctAnswer: 1,
    explanation: "திட்டக்குழுவுக்கு மாற்றாக 2015 ஜனவரி 1 அன்று நிதி ஆயோக் (NITI Aayog - National Institution for Transforming India) தோற்றுவிக்கப்பட்டது. இதன் தலைவர் இந்தியப் பிரதமர் ஆவார்.",
    reference: "11-ஆம் வகுப்பு இந்தியப் பொருளாதாரம் - திட்டமிடலும் வளர்ச்சியும்"
  },

  // SECTION 3: APTITUDE & MENTAL ABILITY
  {
    id: "q9",
    testId: "test-gr4-full-01",
    section: "திறனறிவு (Aptitude)",
    subject: "மீ.பொ.வ & மீ.சி.ம (HCF & LCM)",
    question: "இரு எண்களின் மீ.சி.ம (LCM) 48 மற்றும் அவற்றின் விகிதம் 2 : 3 எனில், அந்த எண்களின் கூட்டுத்தொகை யாது?",
    questionEn: "The LCM of two numbers is 48 and they are in the ratio 2 : 3. What is the sum of these two numbers?",
    options: [
      "28",
      "40",
      "36",
      "42"
    ],
    correctAnswer: 1,
    explanation: "எண்கள் 2x, 3x என்க. அவற்றின் LCM = 2 × 3 × x = 6x. கொடுக்கப்பட்ட LCM = 48. எனவே 6x = 48 => x = 8. எண்கள் 2(8) = 16, 3(8) = 24. எண்களின் கூட்டுத்தொகை = 16 + 24 = 40.",
    reference: "10-ஆம் வகுப்பு கணிதம் - எண்களும் தொடர்வரிசைகளும் & TNPSC PYQ 2022"
  },
  {
    id: "q10",
    testId: "test-gr4-full-01",
    section: "திறனறிவு (Aptitude)",
    subject: "காலமும் வேலையும் (Time & Work)",
    question: "A ஒரு வேலையை 12 நாட்களில் செய்து முடிப்பார். B அதே வேலையை 24 நாட்களில் செய்து முடிப்பார். இருவரும் சேர்ந்து அந்த வேலையை எத்தனை நாட்களில் முடிப்பர்?",
    questionEn: "A alone can complete a work in 12 days. B alone can complete the same work in 24 days. In how many days can they complete the work working together?",
    options: [
      "6 நாட்கள் (6 Days)",
      "8 நாட்கள் (8 Days)",
      "10 நாட்கள் (10 Days)",
      "9 நாட்கள் (9 Days)"
    ],
    correctAnswer: 1,
    explanation: "Shortcut Formula: (A × B) / (A + B) = (12 × 24) / (12 + 24) = 288 / 36 = 8 நாட்கள். இருவரும் சேர்ந்து 8 நாட்களில் வேலையை முடிப்பர்.",
    reference: "8-ஆம் வகுப்பு கணிதம் - வாழ்வியல் கணிதம்"
  },
  {
    id: "q11",
    testId: "test-tamil-ilakkiyam",
    section: "தமிழ் இலக்கியம் (Tamil Literature)",
    subject: "ஐம்பெருங்காப்பியங்கள்",
    question: "சிலப்பதிகாரத்திற்கும் மணிமேகலைக்கும் உள்ள பொதுவான தொடர்பு எது?",
    questionEn: "What is the primary literary connection between Silapathikaram and Manimekalai?",
    options: [
      "இரண்டும் இரட்டைக் காப்பியங்கள் என அழைக்கப்படுகின்றன (Double Epics)",
      "இரண்டையும் இளங்கோவடிகளே இயற்றினார்",
      "இரண்டும் சமண மதக் கருத்துக்களை மட்டுமே கூறுகின்றன",
      "இரண்டும் சோழ நாட்டை மட்டுமே மையமாகக் கொண்டவை"
    ],
    correctAnswer: 0,
    explanation: "கதைத்தொடர்பு மற்றும் கால அமைப்பால் சிலப்பதிகாரமும் மணிமேகலையும் 'இரட்டைக் காப்பியங்கள்' என்று போற்றப்படுகின்றன. சிலப்பதிகாரத்தின் தொடர்ச்சியாக மணிமேகலையின் கதை அமைகிறது.",
    reference: "9-ஆம் வகுப்பு தமிழ் - மணிமேகலை பாடல் & குறிப்புகள்"
  },
  {
    id: "q12",
    testId: "test-aptitude-shortcuts",
    section: "திறனறிவு (Aptitude)",
    subject: "தனிவட்டி (Simple Interest)",
    question: "ஒரு குறிப்பிட்ட அசலானது 5 ஆண்டுகளில் இரட்டிப்பாகிறது எனில், அதன் தனிவட்டி வீதம் (Rate of Interest) என்ன?",
    questionEn: "A certain sum of money doubles itself in 5 years at simple interest. What is the annual rate of interest?",
    options: [
      "15%",
      "20%",
      "25%",
      "10%"
    ],
    correctAnswer: 1,
    explanation: "Shortcut: R = (n - 1) × 100 / T. இங்கு n = 2 (இரட்டிப்பு), T = 5 ஆண்டுகள். R = (2 - 1) × 100 / 5 = 100 / 5 = 20%.",
    reference: "7-ஆம் வகுப்பு கணிதம் - தனிவட்டி சூத்திரங்கள்"
  }
];

export const dailyQuizQuestions = [
  {
    id: "dq-1",
    subject: "பொதுத்தமிழ்",
    question: "‘உண்டால் அம்ம இவ்வுலகம்...’ என்ற புறநானூற்றுப் பாடலை இயற்றிய மன்னர் யார்?",
    options: [
      "கடலுள் மாய்ந்த இளம்பெருவழுதி",
      "பாண்டியன் நெடுஞ்செழியன்",
      "சேரன் செங்குட்டுவன்",
      "சோழன் கரிகாலன்"
    ],
    correctAnswer: 0,
    explanation: "தமக்கென வாழாமல் பிறர்க்கென வாழும் பெருந்தகையாளரால் தான் உலகம் இயங்குகிறது என்று உணர்த்தும் பாடல் இயற்றியவர் கடலுள் மாய்ந்த இளம்பெருவழுதி."
  },
  {
    id: "dq-2",
    subject: "Indian Polity",
    question: "Which Constitutional Amendment added the Fundamental Duties (Part IV-A) under Article 51A?",
    options: [
      "42nd Amendment Act, 1976",
      "44th Amendment Act, 1978",
      "86th Amendment Act, 2002",
      "73rd Amendment Act, 1992"
    ],
    correctAnswer: 0,
    explanation: "The 42nd Constitutional Amendment Act of 1976, recommended by the Swaran Singh Committee, inserted Part IV-A and Article 51A into the Constitution."
  },
  {
    id: "dq-3",
    subject: "Aptitude",
    question: "What is 15% of 240 plus 25% of 120?",
    options: [
      "56",
      "66",
      "72",
      "60"
    ],
    correctAnswer: 1,
    explanation: "15% of 240 = 36. 25% of 120 = 30. Total = 36 + 30 = 66."
  },
  {
    id: "dq-4",
    subject: "Unit 8 - Tamil History",
    question: "Where did the Archaeological Survey of India find Sangam-age gold ornaments, ring wells, and inscribed potsherds in Sivagangai district?",
    options: [
      "Keeladi (கீழடி)",
      "Adichanallur (ஆதிச்சநல்லூர்)",
      "Kodumanal (கொடுமணல்)",
      "Poompuhar (பூம்புகார்)"
    ],
    correctAnswer: 0,
    explanation: "Keeladi (கீழடி) in Sivagangai district proved the existence of an urbanized Sangam civilization along the Vaigai river basin dating back to 6th century BCE."
  },
  {
    id: "dq-5",
    subject: "Current Affairs",
    question: "Which district in Tamil Nadu is famous for the geographical indication (GI) tagged Chedi Butta saree?",
    options: [
      "Tirunelveli (Veeravanallur)",
      "Madurai",
      "Kanchipuram",
      "Salem"
    ],
    correctAnswer: 0,
    explanation: "Chedi Butta sarees are hand-woven in the Veeravanallur region of Tirunelveli district and received the prestigious GI tag."
  }
];

export const initialDiscussions = [
  {
    id: "disc-1",
    author: "Kavitha R.",
    avatar: "KR",
    role: "Aspirant",
    targetExam: "Group 4 (Rank Aspirant)",
    timeAgo: "2 hours ago",
    title: "திருக்குறளில் 25 அதிகாரங்கள் மட்டும் படித்தால் போதுமா அல்லது சமச்சீர் புத்தகத்தில் உள்ள அனைத்தையும் படிக்க வேண்டுமா?",
    content: "குரூப் 4 தேர்வுக்கு பாடத்திட்டத்தில் 25 அதிகாரங்கள் தெளிவாகக் கொடுக்கப்பட்டுள்ளன. ஆனால் சமச்சீர் 6 முதல் 12-ஆம் வகுப்பு புத்தகங்களில் வேறு அதிகாரங்களும் உள்ளன. TNPSC வினாக்கள் பாடத்திட்ட அதிகாரங்களிலிருந்து மட்டுமே வருகிறதா? தயவுசெய்து தெளிவுபடுத்தவும்.",
    tags: ["#திருக்குறள்", "#பொதுத்தமிழ்", "#Group4"],
    upvotes: 38,
    isUpvoted: false,
    replies: [
      {
        id: "rep-1-1",
        author: "Dr. K. Ramanathan",
        avatar: "KR",
        role: "Faculty",
        timeAgo: "1 hour ago",
        verified: true,
        content: "பாடத்திட்டத்தில் குறிப்பிடப்பட்டுள்ள 25 அதிகாரங்களுக்கு (அன்புடைமை, செய்ந்நன்றி அறிதல், காலமறிதல் போன்றவை) முதலிடம் கொடுத்து முழுப் பொருளையும் படிக்கவும். அதன் பின் சமச்சீர் 6-12 புத்தகங்களில் 'பாக்ஸ்' மற்றும் செய்யுள் பகுதியில் கொடுக்கப்பட்டுள்ள பிற குறள்களின் ஆசிரியரின் சிறப்புத் தொடர்களை மேலோட்டமாகப் பார்த்துக்கொண்டால் போதுமானது."
      },
      {
        id: "rep-1-2",
        author: "Senthil Nathan",
        avatar: "SN",
        role: "Aspirant",
        timeAgo: "45 mins ago",
        verified: false,
        content: "மிக்க நன்றி ஐயா! 2022 மற்றும் 2024 வினாத்தாளைப் பார்த்தபோது 90% வினாக்கள் இந்த 25 அதிகாரங்களில் இருந்தே நேரடியாகக் கேட்கப்பட்டிருந்தது."
      }
    ]
  },
  {
    id: "disc-2",
    author: "Pugazharasu A.",
    avatar: "PA",
    role: "Admin",
    targetExam: "Admin & Lead Developer",
    timeAgo: "5 hours ago",
    title: "Aptitude Time & Work: Efficiency method vs Traditional LCM method discussion",
    content: "When solving 3-person pipe and cistern or time & work problems with people leaving midway, which technique saves the most time under exam pressure? We just uploaded new shortcut notes in the Study Material Hub.",
    tags: ["#Aptitude", "#TimeAndWork", "#Shortcuts"],
    upvotes: 54,
    isUpvoted: true,
    replies: [
      {
        id: "rep-2-1",
        author: "Meenakshi Sundaram",
        avatar: "MS",
        role: "Aspirant",
        timeAgo: "3 hours ago",
        verified: false,
        content: "LCM-based Total Unit method is 100% foolproof! Instead of fractions like 1/12 and 1/24, assuming total work as LCM 24 units makes the daily efficiency 2 units and 1 unit. Cuts calculation time by half!"
      }
    ]
  },
  {
    id: "disc-3",
    author: "Dinesh Kumar",
    avatar: "DK",
    role: "Aspirant",
    targetExam: "Group 2 Prelims",
    timeAgo: "1 day ago",
    title: "Unit 8 & Unit 9: Which government reports and websites to refer to for latest data?",
    content: "For Tamil Nadu HDI, SDG rankings, and women empowerment statistics, are TN State Planning Commission reports sufficient or should we also read NITI Aayog SDG Index?",
    tags: ["#Unit8", "#Unit9", "#TNGovernance"],
    upvotes: 29,
    isUpvoted: false,
    replies: [
      {
        id: "rep-3-1",
        author: "Admin Desk",
        avatar: "SP",
        role: "Admin",
        verified: true,
        timeAgo: "18 hours ago",
        content: "Refer to both: TN Policy Notes 2024-25 (Social Welfare Dept) for state-specific schemes, and NITI Aayog India SDG Index for comparative ranks (TN consistently ranks in the Top 3 states)."
      }
    ]
  }
];

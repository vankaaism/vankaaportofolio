// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE — all your portfolio content lives here.
//  Empty strings ("") are simply hidden on the page.
//  Search for "TODO" to find what still needs your real data.
// ─────────────────────────────────────────────────────────────

window.PORTFOLIO = {
  name: "Vankaa",
  fullName: "Muchamad Zovanka Al-Maizani",
  tagline: "Philosophy student building at the intersection of psychology, philosophy and AI.",

  // ── Hero ── "Hi, I'm [avatar] Vankaa!" / "I'm a <role> at" / "<org>." [status]
  hero: {
    avatar: "", // TODO: "img/me.jpg" (square photo) — shows "V" until then
    role: "Philosophy Student",
    org: "Universitas Indonesia.",
    status: "Open to collaborate",
    ctaLabel: "Get in touch",
    ctaHref: "#contact",
    ctaText: "Feel free to explore my portfolio and reach out\n— I'd love to connect!",
  },

  // ── Hero cards ── (placeholders — change the insides later)
  // "My Experience" card is filled automatically from `experience` below.
  playlist: {
    title: "Playlist Title", // TODO
    url: "", // TODO: Spotify link
    covers: ["", "", ""], // TODO: 3 square album images, center one is index 1
  },
  reading: {
    title: "Book Title", // TODO
    author: "Author Name", // TODO
    cover: "", // TODO: "img/book.jpg"
  },
  map: {
    city: "Depok",
    country: "Indonesia",
    coords: "6.36° S, 106.83° E",
  },
  howIWork: [
    { title: "Start from a question", text: "Every project begins with a real human question: how people learn, connect or make sense of things." },
    { title: "Read the theory", text: "I look at what philosophy and psychology already say, so the build rests on more than intuition." },
    { title: "Build the smallest version", text: "A focused prototype in Python or on the web, small enough that the logic stays visible." },
    { title: "Test with real data", text: "I check the idea against real people and real data, including my own, before trusting it." },
    { title: "Reflect and write", text: "I write up what worked, what didn't and what it says about the original question." },
  ],

  // ── My Expertise ──
  // icon: "code" | "layout" | "mobile" | "data" | "design" | "server" | "book"
  expertise: [
    {
      icon: "code",
      title: "Software Development",
      sub: "Python",
      body: "I write Python from first principles: data structures, algorithms and clean CLI programs, often without external libraries so the logic stays visible.",
    },
    {
      icon: "layout",
      title: "Web Prototyping",
      sub: "PWA, AI-assisted development",
      body: "I design and ship web prototypes with AI coding tools, focusing on features people would actually use every day.",
    },
    {
      icon: "book",
      title: "Research and Writing",
      sub: "Philosophy, Psychology",
      body: "I study epistemology, philosophy of mind and human behavior, and write essays on identity, freedom and agency.",
    },
  ],

  // ── My Work ──
  workIntro:
    "I build small, focused tools that start from a real human question: how people learn, connect and make sense of things. My projects range from Python programs and data experiments to research essays on AI and society. Next, I want to work on language technology for underrepresented languages and on tools informed by how people actually think.",

  featured: {
    label: "Featured Project",
    title: "Tarseekh App",
    description:
      "A daily Quran companion for the Musabaqah Desain Aplikasi Al-Qur'an competition. Features a tajwid reading mode, highlight-to-ask AI tafsir, a recitation tracker, spaced-repetition memorization (SM-2) and daily quests.",
    // Phone screen is exactly 390×844 pt — use a 1170×2532 px (@3x) screenshot so it maps 1:1.
    image: "img/tarseekh-live.png",
    url: "https://tarseekh.vercel.app/",
  },

  // Filter order. "All" is added automatically.
  categories: ["Software", "Research", "Writing"],

  // status: "completed" | "in progress" | "published"
  // image: leave "" to get an auto-generated text cover
  projects: [
    {
      title: "Temu",
      category: "Software",
      description:
        "Python CLI that recommends campus student clubs from interest ratings, with vote percentages and consent-based member matching. Built around the idea of social capital.",
      url: "https://github.com/vankaaism/ukmrecommender",
      image: "", // TODO
      status: "completed",
    },
    {
      title: "Calibry",
      category: "Software",
      description: "CLI that derives calorie formulas from the Fitbit Kaggle dataset and tests them against my own Garmin data.",
      url: "https://github.com/vankaaism/colibry",
      image: "", // TODO
      status: "in progress",
    },
    {
      title: "LesTari", // lestari (preserved) + tari (dance)
      category: "Software",
      description:
        "A demonstration of how technology can support cultural preservation: computer-vision motion capture that turns traditional dance movement into animation.",
      url: "https://github.com/vankaaism/motion_capture_humdig", // repo name: motion_capture_humdig
      image: "", // TODO
      status: "in progress",
    },
    {
      title: "Matrices in EEG Emotion Recognition",
      category: "Research",
      description:
        "Analysis of how SPD matrices are used in Wang et al. (2021), a Pattern Recognition paper on EEG emotion recognition.",
      url: "", // TODO
      image: "", // TODO
      status: "completed",
    },
    {
      title: "AI for Regional Languages",
      category: "Research",
      description:
        "Proposal essay on using AI for low-resource Indonesian regional languages to widen access to opportunity in 3T areas.",
      url: "", // TODO
      image: "", // TODO
      status: "in progress",
    },
    {
      title: "I've killed some versions of myself to be this calm.",
      category: "Writing",
      description: "A personal essay on freedom, agency and following an imposed direction.",
      url: "", // TODO: Medium link
      image: "", // TODO
      status: "published",
    },
  ],

  // ── Professional Experience ──
  experienceTitle: "Professional Experience",
  // First entry opens by default. logo: "img/x.png" or "" to show `initials`.
  // award: optional { title, text } shown as a highlighted callout.
  experience: [
    {
      role: "Program Management Staff",
      company: "Pemimpin.id",
      type: "Internship",
      period: "Mar 2026 - Jul 2026",
      location: "Indonesia · Hybrid",
      website: "", // TODO: e.g. "pemimpin.id"
      description: "", // TODO: one or two sentences on what you did in the program team
      award: {
        title: "Best Program Development Staff",
        text: "Recognized for outstanding contributions to the development and management of Negarawan.id programs.",
      },
      tags: ["Program Management", "Program Development"],
      logo: "img/pemimpin.jpg",
      initials: "P",
    },
    {
      role: "Audience Sustainability Manager",
      company: "TEDxTelkom University",
      type: "Volunteer · Social Services",
      period: "Dec 2024 - Jul 2025",
      location: "", // TODO: e.g. "Bandung · On-site"
      website: "", // TODO
      description:
        "TEDx Telkom University Volunteer, driving innovation and community impact. Facilitated interdisciplinary discussions, empowering students and fostering creative, sustainable solutions.",
      tags: ["Community Engagement", "Facilitation", "Event Management"],
      logo: "img/tedx.png",
      initials: "TX",
    },
    {
      role: "Practicum Assistant Trainee",
      company: "Enterprise System Engineering Laboratory",
      type: "Internship",
      period: "Feb 2025 - Jun 2025",
      location: "Bandung · On-site",
      website: "", // TODO
      description:
        "Facilitating hands-on learning in ERP, Information Systems, and Decision Analysis to bridge theory with real-world applications.",
      tags: ["Curriculum Design and Adaptation", "Problem-Solving in Complex Teams"], // TODO: + the other 2 skills from LinkedIn
      logo: "img/ensyse.jpg",
      logoFit: "contain", // "contain" adds padding for wide logos; omit to fill the circle
      initials: "ES",
    },
  ],

  // ── Contact ──
  contact: {
    status: "Open to collaborations, research projects and hackathon teams",
    heading: "Working on something at the edge of people and technology?",
    text: "Send me an email or reach out on any of these.",
    email: "", // TODO
    links: [
      { label: "LinkedIn", url: "" }, // TODO
      { label: "Instagram", url: "" }, // TODO
      { label: "Github", url: "https://github.com/vankaaism" },
      { label: "Medium", url: "" }, // TODO
    ],
  },

  // ── Recommendations ── (1–3; layout adapts to how many you have)
  testimonials: [
    {
      quote:
        "I highly recommend Zovanka. As an intern, he demonstrates strong self-leadership and rapid learning agility in response to dynamic project demands. His solid time management makes him a reliable asset to any team.",
      name: "Khusnul Fatonah",
      title: "Impact Strategy, Advisory & Delivery | Education, Innovation & Sustainability",
      photo: "img/khusnul.jpg",
      initials: "KF",
    },
  ],
};

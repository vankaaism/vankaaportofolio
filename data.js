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

  // ── Hero cards ──
  // Volunteering highlights (scrolling timeline card in the hero). Newest first.
  volunteering: [
    { role: "Project Management Intern", org: "Youth Ranger Indonesia", period: "Mar 2026 - Jul 2026", cause: "Education" },
    { role: "Secretary, Psychology Class of 2025", org: "International Open University", period: "Sep 2025 - Present", cause: "Education" },
    { role: "RnD Apprentice", org: "DPM FIB UI", period: "Sep 2025 - Nov 2025", cause: "Civil Rights and Social Action" },
    { role: "Audience Sustainability Manager", org: "TEDxTelkom University", period: "Dec 2024 - Jul 2025", cause: "Social Services" },
    { role: "Volunteer Teacher, Rural Education Program", org: "Universitas Persatuan Islam", period: "Sep 2023 - Jan 2024", cause: "Education" },
    { role: "Vice President of Education Affairs", org: "OSIS", period: "Jun 2022 - May 2023", cause: "Education" },
  ],
  // "How I work": the scientific method as I apply it. label = tab text.
  howIWork: [
    {
      label: "Observe",
      title: "Observation and research question",
      text: "I start from an observed pattern in how people learn, connect or make sense of things, and narrow it into a precise, answerable research question with a defined scope.",
    },
    {
      label: "Review",
      title: "Literature review",
      text: "I survey what epistemology, psychology and prior studies already establish, so the work builds on existing evidence and identifies a real gap rather than relying on intuition.",
    },
    {
      label: "Hypothesize",
      title: "Falsifiable hypothesis",
      text: "I state a testable hypothesis, operationalize each variable and decide in advance what result would count as evidence against it.",
    },
    {
      label: "Experiment",
      title: "Method and experiment",
      text: "I build the minimal instrument needed to test it: a Python program, prototype or data pipeline. Calibry, for example, tests calorie formulas derived from the Fitbit Kaggle dataset against my own Garmin data.",
    },
    {
      label: "Conclude",
      title: "Analysis and conclusion",
      text: "I compare the results with the hypothesis, report limitations and possible confounds, and document the process so others can replicate or refute it.",
    },
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

  // Shown in the "Selected Works" explorer, grouped by status (or by `year` if you add one to every project).
  // status: "completed" | "in progress" | "published"
  // image: leave "" to get an auto-generated text cover
  projects: [
    {
      title: "Temu",
      context: "Python CLI", // small label above the title
      category: "Software",
      description:
        "Python CLI that recommends campus student clubs from interest ratings, with vote percentages and consent-based member matching. Built around the idea of social capital.",
      url: "https://github.com/vankaaism/ukmrecommender",
      image: "", // TODO
      status: "completed",
    },
    {
      title: "Calibry",
      context: "Data experiment", // small label above the title
      category: "Software",
      description: "CLI that derives calorie formulas from the Fitbit Kaggle dataset and tests them against my own Garmin data.",
      url: "https://github.com/vankaaism/colibry",
      image: "", // TODO
      status: "in progress",
    },
    {
      title: "LesTari", // lestari (preserved) + tari (dance)
      context: "Computer vision", // small label above the title
      category: "Software",
      description:
        "A demonstration of how technology can support cultural preservation: computer-vision motion capture that turns traditional dance movement into animation.",
      url: "https://github.com/vankaaism/motion_capture_humdig", // repo name: motion_capture_humdig
      image: "", // TODO
      status: "in progress",
    },
    {
      title: "Matrices in EEG Emotion Recognition",
      context: "Paper analysis", // small label above the title
      category: "Research",
      description:
        "Analysis of how SPD matrices are used in Wang et al. (2021), a Pattern Recognition paper on EEG emotion recognition.",
      url: "", // TODO
      image: "", // TODO
      status: "completed",
    },
    {
      title: "AI for Regional Languages",
      context: "Proposal essay", // small label above the title
      category: "Research",
      description:
        "Proposal essay on using AI for low-resource Indonesian regional languages to widen access to opportunity in 3T areas.",
      url: "", // TODO
      image: "", // TODO
      status: "in progress",
    },
    {
      title: "I've killed some versions of myself to be this calm.",
      context: "Personal essay", // small label above the title
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

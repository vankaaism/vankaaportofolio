// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE — all your portfolio content lives here.
//  index.html / script.js render it; you shouldn't need to touch them.
// ─────────────────────────────────────────────────────────────

window.PORTFOLIO = {
  name: "Your Name",

  // ── My Expertise ── (3 cards look best; 2–6 also work)
  // icon: "code" | "layout" | "mobile" | "data" | "design" | "server"
  expertise: [
    {
      icon: "code",
      title: "Software Development",
      body: "Write a sentence about the languages and paradigms you're strongest in.",
    },
    {
      icon: "layout",
      title: "Frontend Dev",
      sub: "React, Next.js",
      body: "Describe your frontend experience: years, frameworks, what you care about.",
    },
    {
      icon: "design",
      title: "UI / UX Design",
      sub: "Figma",
      body: "A third area of expertise. Swap the icon and text to match what you do.",
    },
  ],

  // ── My Work ──
  workIntro:
    "A short paragraph about the kind of work you've shipped, who you've worked with, and what you're interested in next.",

  featured: {
    label: "Featured Project",
    title: "Tarseekh App",
    // Phone screen is exactly 390×844 pt — use a 1170×2532 px (@3x) or 390×844 px screenshot
    // so it maps 1:1 with no crop/stretch. Captured from https://tarseekh.vercel.app
    image: "img/tarseekh-live.png",
    url: "https://tarseekh.vercel.app",
  },

  // category must match one of the filters below (case-sensitive)
  projects: [
    { title: "Project One", category: "Web Development", image: "", url: "#" },
    { title: "Project Two", category: "Web Development", image: "", url: "#" },
    { title: "Project Three", category: "UI/UX Design", image: "", url: "#" },
    { title: "Project Four", category: "Web Development", image: "", url: "#" },
    { title: "Project Five", category: "Data Visualization", image: "", url: "#" },
    { title: "Project Six", category: "UI/UX Design", image: "", url: "#" },
  ],

  // ── Professional Experience ── (first one opens by default)
  // logo: "img/company.png" — leave empty to show the company's initials
  experience: [
    {
      role: "Job Title",
      company: "Company Name",
      period: "2023 - Present",
      location: "City, Country",
      website: "company.com",
      description: "One or two sentences on what you built or led here and the impact it had.",
      tags: ["React", "Next.js", "TypeScript"],
      logo: "",
    },
    {
      role: "Previous Role",
      company: "Previous Company",
      period: "2021 - 2023",
      location: "Remote",
      website: "previous.com",
      description: "What you were responsible for, and something you're proud of.",
      tags: ["Figma", "UI/UX", "CSS"],
      logo: "",
    },
    {
      role: "Freelance Developer",
      company: "Self-employed",
      period: "2019 - Present",
      location: "Remote",
      website: "",
      description: "The kinds of clients and projects you take on as a freelancer.",
      tags: ["Web", "Mobile"],
      logo: "",
    },
  ],

  // ── Contact / Available for freelance ──
  contact: {
    heading: "Available for select freelance opportunities",
    text: "Have an exciting project you need help with?\nSend me an email or contact me via instant message!",
    email: "you@example.com",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/" },
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "Github", url: "https://github.com/" },
      { label: "WhatsApp", url: "https://wa.me/" },
    ],
  },

  // ── Recommendations ── (exactly 3: first is the tall card on the left)
  // photo: "img/person.jpg" — leave empty to show initials
  testimonials: [
    {
      quote:
        "A longer recommendation goes here, since it gets the tall card. Ask a past client or manager what it was like to work with you: how you communicated, how you handled problems, and what impact your work had on their team or business.",
      name: "Person One",
      title: "Founder at Company",
      photo: "",
    },
    {
      quote: "A short, punchy recommendation. One or two lines works best in this card.",
      name: "Person Two",
      title: "Role | Role | Role",
      photo: "",
    },
    {
      quote: "A medium-length recommendation about your skills, communication, and how you plan complex projects.",
      name: "Person Three",
      title: "CEO at Company",
      photo: "",
    },
  ],
};

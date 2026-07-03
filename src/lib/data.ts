export const personal = {
  name: "Rehan Shaikh",
  title: "Full-Stack Developer · DevOps · Cloud",
  tagline: "Building immersive software at the edge of design and engineering.",
  email: "rehansk0610@gmail.com",
  phone: "8291057033",
  linkedin: "https://www.linkedin.com/in/rehan-shaikh-590b2128a/",
  github: "https://github.com/Rehanshaikh0610",
};

export const education = [
  {
    school: "A.P. Shah Institute of Technology (Mumbai University)",
    degree: "B.E. in Information Technology",
    detail: "SGPA 8.86",
    period: "Jul 2023 — Present",
  },
  {
    school: "S.M. Shetty College",
    degree: "HSC",
    detail: "67%",
    period: "Jun 2022 — Mar 2023",
  },
];

export type Project = {
  title: string;
  stack: string[];
  description: string;
  github?: string;
  demo?: string;
  accent: "violet" | "cyan" | "magenta";
};

export const projects: Project[] = [
  {
    title: "Silver Jewellery E-Commerce",
    stack: ["HTML", "CSS", "JavaScript"],
    description:
      "Boutique e-commerce storefront with product galleries, cart and checkout flow.",
    github: "https://github.com/Rehanshaikh0610",
    accent: "violet",
  },
  {
    title: "SpaceY",
    stack: ["Python", "JavaScript", "Three.js", "APIs"],
    description:
      "Interactive 3D space exploration app pulling live NASA data into a WebGL universe.",
    github: "https://github.com/Rehanshaikh0610",
    accent: "cyan",
  },
  {
    title: "Career-Pulse",
    stack: ["Python", "Flask", "SQL"],
    description:
      "Career analytics platform that recommends roles based on skills, market demand and trends.",
    github: "https://github.com/Rehanshaikh0610",
    accent: "magenta",
  },
  {
    title: "Neurodiverse Assistance System",
    stack: ["React", "Node.js", "MongoDB"],
    description:
      "Accessibility-first assistant designed for neurodiverse users with adaptive UI.",
    github: "https://github.com/Rehanshaikh0610",
    demo: "https://youtu.be/L2FD3MVx0UA?si=Om6AvivZSpDSjo7t",
    accent: "violet",
  },
  {
    title: "Marriage Invitation Website",
    stack: ["React", "Firebase"],
    description:
      "Elegant wedding invitation website with RSVP and event details.",
    github: "https://github.com/Rehanshaikh0610",
    demo: "https://wedding-invite-alpha-green.vercel.app/",
    accent: "cyan",
  },
  {
    title: "AIOps Log Anomaly Detection",
    stack: ["Kafka", "Flink", "ML"],
    description:
      "Streaming pipeline that ingests logs and flags anomalies in near real-time.",
    github: "https://github.com/Rehanshaikh0610",
    accent: "magenta",
  },
];

export const skills = {
  Languages: ["Java", "Python", "C / C++", "JavaScript"],
  Frameworks: ["React", "Node.js", "FastAPI"],
  DevOps: ["Docker", "Jenkins", "Ansible", "Git"],
  Databases: ["MySQL", "MongoDB", "PostgreSQL"],
  Cloud: ["AWS", "Vercel", "Netlify"],
  "Networking & Security": ["Wireshark", "Nmap"],
};

export type Achievement = {
  title: string;
  org: string;
  detail?: string;
  image?: string; // path under /public/certificates/
  link?: string;
  isPDF?: boolean;
  category?: string; // Added category property to match the usage in certifications.tsx
};

export const achievements: Achievement[] = [
  {
    title: "2nd Prize — Prakalpa 26",
    org: "KJ Somaiya",
    image: "certificates/somaiya certificate .pdf",
    link: "/certificates/somaiya certificate .pdf",
    isPDF: true,
  },
  {
    title: "GDG Solution Challenge",
    org: "Google Developer Groups",
    image: "certificates/Gdg certificate.jpeg",
    link: "/certificates/Gdg certificate.jpeg",
    isPDF: false,
  },
  {
    title: "Top 10 — Webathon",
    org: "National Hackathon",
    image: "certificates/webath certificate.pdf",
    link: "/certificates/webath certificate.pdf",
    isPDF: true,
  },
  {
    title: "Top 10 — SIES Innovation Challenge",
    org: "SIES",
    image: "certificates/Rehan Shaikh Sies.pdf",
    link: "/certificates/Rehan Shaikh Sies.pdf",
    isPDF: true,
  },
];

export const experience = [
  {
    role: "Publicity Head",
    org: "DevOps Club, APSIT",
    detail: "Led publicity & branding for technical events and workshops.",
  },
  {
    role: "Technical Speaker — React",
    org: "APSIT",
    detail: "Delivered hands-on React sessions to 100+ students.",
  },
  {
    role: "Event Organizer",
    org: "Multiple Tech Events",
    detail: "Organized hackathons, talks and bootcamps end-to-end.",
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  category:
  | "Cloud & Data Engineering"
  | "Programming & Development"
  | "Networking & Cybersecurity"
  | "Process Mining"
  | "Courses";
  image?: string; // path under /public/certificates/
  link?: string;
  isPDF?: boolean; // Indicates if the file is a PDF
};

// Drop image/PDF files into public/certificates/ and reference them here.
export const certificates: Certificate[] = [
  {
    title: "AWS Cloud Foundation",
    issuer: "Amazon Web Services",
    category: "Cloud & Data Engineering",
    link: "https://drive.google.com/file/d/1tYftdVIsXc5QakD9oxZeD90er_G62n0K/view",
    image: "certificates/aws-cloud-foundation.pdf",
    isPDF: true,
  },
  {
    title: "AWS Data Engineering",
    issuer: "Amazon Web Services",
    category: "Cloud & Data Engineering",
    link: "https://drive.google.com/file/d/1--NGOjCGlbXXj1PBs8d1dv2wK2Qp_IOO/view",
    image: "certificates/aws-data-engineering.pdf",
    isPDF: true,
  },
  {
    title: "Juniper Networks Certified Associate",
    issuer: "Juniper",
    category: "Networking & Cybersecurity",
    link: "https://drive.google.com/file/d/1F0JL9d2OAhd7jLe2jd7Rx8fRtfefh_6j/view?usp=drive_link",
    image: "certificates/juniper-networks-certified-associate.pdf",
    isPDF: true,
  },
  {
    title: "Palo Alto Cybersecurity Foundation",
    issuer: "Palo Alto Networks",
    category: "Networking & Cybersecurity",
    link: "https://drive.google.com/file/d/1bqKiFt3u33D3FEp_ZLevBIE8n2GfpZzj/view?usp=drive_link",
    image: "certificates/palo-alto-cybersecurity-foundation.pdf",
    isPDF: true,
  },
  {
    title: "AWS Data Engineering Virtual Internship",
    issuer: "Amazon Web Services",
    category: "Cloud & Data Engineering",
    link: "https://drive.google.com/file/d/1pGUlp-e378mTGquh5Aod_P8cWSr5DcGJ/view?usp=drive_link",
    image: "certificates/aws-data-engineering-virtual-internship.pdf",
    isPDF: true,
  },
  {
    title: "Oracle Java Foundations Certification",
    issuer: "Oracle",
    category: "Programming & Development",
    link: "https://drive.google.com/file/d/1OKzbqhUOX8JPrsh69UI3ro3Lo1C6_gE8/view?usp=drive_link",
    image: "certificates/oracle-java-foundations-certification.pdf",
    isPDF: true,
  },
  {
    title: "Oracle Database Foundations Certification",
    issuer: "Oracle",
    category: "Programming & Development",
    link: "https://drive.google.com/file/d/16CyfSdB4v8Ltx6ap057B-oTGyyMWFAtj/view?usp=drive_link",
    image: "certificates/oracle-database-foundations-certification.pdf",
    isPDF: true,
  },
  {
    title: "Google Android Developer Virtual Internship",
    issuer: "Google",
    category: "Programming & Development",
    link: "https://drive.google.com/file/d/1FX7xDF-TJlvE0C_TUfsUlJnWt23pJt1L/view?usp=drive_link",
    image: "certificates/google-android-developer-virtual-internship.pdf",
    isPDF: true,
  },
  {
    title: "Google AI/ML Virtual Internship",
    issuer: "Google",
    category: "Programming & Development",
    link: "https://drive.google.com/file/d/1NbLIV_SMvQgwt7TTN9KfQ24A2nmVRNE7/view?usp=drive_link",
    image: "certificates/google-ai-ml-virtual-internship.pdf",
    isPDF: true,
  },
  {
    title: "HackerRank Certification (Problem Solving Python)",
    issuer: "HackerRank",
    category: "Programming & Development",
    link: "https://drive.google.com/file/d/1Im_9sbc6vw2ORjeXmPeQgOCIHV9aMqid/view?usp=drive_link",
    image: "certificates/hackerrank-problem-solving-python.pdf",
    isPDF: true,
  },
  {
    title: "Cisco Linux Essentials Certification",
    issuer: "Cisco",
    category: "Networking & Cybersecurity",
    link: "https://drive.google.com/file/d/1Fv86f3bDg2jFoHMmCOeGkNvXuqKzM34Y/view?usp=drive_link",
    image: "certificates/cisco-linux-essentials-certification.pdf",
    isPDF: true,
  },
  {
    title: "Celonis Process Mining Fundamentals",
    issuer: "Celonis",
    category: "Process Mining",
    link: "https://drive.google.com/file/d/1TzrpM0rmqdJOey8hv64oHXxSbdXhv0Yb/view?usp=drive_link",
    image: "certificates/celonis-process-mining-fundamentals.pdf",
    isPDF: true,
  },
  {
    title: "Celonis PQL (Process Query Language) Certification",
    issuer: "Celonis",
    category: "Process Mining",
    link: "https://drive.google.com/file/d/1mhDacIz44jPhBHGgS0e1hSNm7AyLQLDR/view?usp=drive_link",
    image: "certificates/celonis-pql-certification.pdf",
    isPDF: true,
  },
  {
    title: "Celonis Data Integration (Get Data into System) Certification",
    issuer: "Celonis",
    category: "Process Mining",
    link: "https://drive.google.com/file/d/1-ewBotB6K8PmyzcGGFVRAltik6Pousm2/view?usp=drive_link",
    image: "certificates/celonis-data-integration-certification.pdf",
    isPDF: true,
  },
  {
    title: "Python Course – Spoken Tutorial, IIT Bombay",
    issuer: "IIT Bombay",
    category: "Courses",
    link: "https://drive.google.com/file/d/1hwnpV3IUQ_dRWUc8MqfbiXvcgwmsfrqv/view?usp=drive_link",
    image: "certificates/python-course-iit-bombay.pdf",
    isPDF: true,
  },
  {
    title: "Java Training – Spoken Tutorial, IIT Bombay",
    issuer: "IIT Bombay",
    category: "Courses",
    link: "https://drive.google.com/file/d/1Evwp4I3ACIJaTPP9LJaW3705IfdUtDU_/view?usp=drive_link",
    image: "certificates/java-training-iit-bombay.pdf",
    isPDF: true,
  },
];

export const navSections = [
  { to: "/", label: "Home", hint: "Start here", anchor: "hero" },
  { to: "/projects", label: "Projects", hint: "Things I've built", anchor: "projects" },
  { to: "/skills", label: "Skills", hint: "My toolbox", anchor: "skills" },
  { to: "/experience", label: "Experience", hint: "Where I've grown", anchor: "experience" },
  { to: "/certifications", label: "Certifications", hint: "Trophy room", anchor: "certifications" },
  { to: "/contact", label: "Contact", hint: "Let's talk", anchor: "contact" },
] as const;

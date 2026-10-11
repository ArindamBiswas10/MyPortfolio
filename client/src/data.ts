export const PROJECTS = [
  {
    id: "01",
    title: "Crypto Price Monitor",
    category: "Full-Stack · Real-time",
    categoryColor: "#4ade80",
    gradient: "linear-gradient(135deg, #0d1f17 0%, #0a0a0a 100%)",
    description:
      "Live crypto prices over WebSockets with JWT auth, email verification and custom price alerts sent by email. Redis caches CoinGecko calls to stay within rate limits.",
    tags: ["TypeScript", "React", "Node.js", "MongoDB", "Redis", "Socket.IO"],
    githubUrl: "https://github.com/ArindamBiswas10/crypto-price-monitor",
    liveUrl: "",
  },
  {
    id: "02",
    title: "Smart Task Analyzer",
    category: "Algorithms · REST API",
    categoryColor: "#60a5fa",
    gradient: "linear-gradient(135deg, #0d1626 0%, #0a0a0a 100%)",
    description:
      "Ranks tasks with a weighted score across urgency, importance, effort and dependencies. Four strategies, DFS circular-dependency detection and 17 unit tests.",
    tags: ["Python", "Django REST", "JavaScript", "SQLite"],
    githubUrl: "https://github.com/ArindamBiswas10/smart-task-analyzer",
    liveUrl: "",
  },
  {
    id: "03",
    title: "Geofence Event Service",
    category: "Backend · Geospatial",
    categoryColor: "#fb923c",
    gradient: "linear-gradient(135deg, #26150d 0%, #0a0a0a 100%)",
    description:
      "Processes vehicle GPS events, detects zone entry, exit and direct transitions, and serves status and history APIs with validation, logging and tests.",
    tags: ["Python", "Flask", "REST API", "pytest"],
    githubUrl: "https://github.com/ArindamBiswas10/geofence-service",
    liveUrl: "",
  },
  {
    id: "04",
    title: "Deployr",
    description: "Self-hosted PaaS for indie devs. Git-push deploys to Docker clusters. Supports auto-scaling and custom domains.",
    tags: ["TypeScript", "Docker", "Nginx"],
    gradient: "linear-gradient(135deg,#1a0a0a 0%,#2d1515 50%,#0f1a2e 100%)",
    category: "DevOps / Platform",
    categoryColor: "#f87171",
    githubUrl: "",
    liveUrl: "",
  },
];

export const BLOG_POSTS = [
  {
    id: "first-post",
    date: "May 2025",
    readTime: "5 min read",
    title: "What I learned from my first month as a software engineering intern",
    tags: ["Career", "Web Dev"],
    url: "https://sdejourneyfirststeps.hashnode.dev/what-i-learned-from-my-first-month-as-a-software-engineering-intern",
  },
];

export const EXPERIENCES = [
  {
    id: "nezuware",
    role: "Full-Stack Developer Intern",
    company: "Nezuware",
    type: "Remote",
    period: "Oct 2024 – Nov 2024",
    description:
      "Built and shipped production features independently across the full stack, from architecture design to AWS deployment.",
    bullets: [
      "Built a full-stack CMS using React.js, Node.js, and MongoDB with JWT authentication supporting 100+ concurrent users",
      "Optimized database queries and indexing strategies reducing API response time by 25%",
      "Deployed serverless application on AWS (Lambda, DynamoDB) using CI/CD pipelines",
    ],
    logoLabel: "NZ",
  },
];

export const TECH_STACK = [
  { icon: "SiTypescript",  title: "TypeScript",  color: "#3178c6", bg: "#0a1628" },
  { icon: "SiJavascript",  title: "JavaScript",  color: "#f7df1e", bg: "#1a1400" },
  { icon: "SiPython",      title: "Python",      color: "#3776ab", bg: "#0a1020" },
  { icon: "SiReact",       title: "React",       color: "#61dafb", bg: "#001a1e" },
  { icon: "SiNodedotjs",   title: "Node.js",     color: "#339933", bg: "#001a05" },
  { icon: "SiExpress",     title: "Express",     color: "#e8e8e8", bg: "#111"    },
  { icon: "SiMongodb",     title: "MongoDB",     color: "#47a248", bg: "#001a00" },
  { icon: "SiAmazonwebservices", title: "AWS",   color: "#ff9900", bg: "#1a0e00" },
  { icon: "SiPostgresql",  title: "PostgreSQL",  color: "#4169e1", bg: "#000e1e" },
  { icon: "SiGit",         title: "Git",         color: "#f05032", bg: "#1a0800" },
  { icon: "SiGithub",      title: "GitHub",      color: "#e8e8e8", bg: "#111"    },
  { icon: "SiDocker",      title: "Docker",      color: "#2496ed", bg: "#001628" },
];
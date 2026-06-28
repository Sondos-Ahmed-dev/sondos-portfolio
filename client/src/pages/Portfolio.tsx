import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Download, Mail, Github, Linkedin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

// ─── Constellation Logo ───────────────────────────────────────────────────────
const ConstellationLogo: React.FC<{ size: number; delay?: number }> = ({ size, delay = 0 }) => {
  const dots = [
    { cx: 27, cy: 30 }, { cx: 50, cy: 22 }, { cx: 73, cy: 31 },
    { cx: 22, cy: 50 }, { cx: 50, cy: 50 }, { cx: 76, cy: 54 },
    { cx: 30, cy: 67 }, { cx: 50, cy: 75 }, { cx: 70, cy: 68 },
  ];
  const lines: [number, number][] = [
    [0,1],[1,2],[0,3],[3,4],[4,5],[4,7],[7,8],[6,7],[2,5],
  ];
  const radii = [4, 3, 3.5, 3, 6, 3, 3, 4, 2.5];
  const colors = [
    '#6366f1','#6366f1','#a855f7',
    '#6366f1','#7c3aed','#a855f7',
    '#6366f1','#6366f1','#a855f7',
  ];
  const fontSize = size > 60 ? 28 : 13;
  const letterSpacing = size > 60 ? '3' : '1';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {lines.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={dots[a].cx} y1={dots[a].cy}
          x2={dots[b].cx} y2={dots[b].cy}
          stroke="#6366f1"
          strokeWidth="0.9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: delay + 0.5 + i * 0.07, duration: 0.3 }}
        />
      ))}

      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.cx} cy={d.cy}
          r={radii[i]}
          fill={i === 4 ? 'url(#cg)' : colors[i]}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.1 + i * 0.09, duration: 0.3, type: 'spring' }}
        />
      ))}

      <motion.text
        x="50" y="57"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize={fontSize}
        fill="url(#cg)"
        letterSpacing={letterSpacing}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1.2, duration: 0.5 }}
      >
        SI
      </motion.text>
    </svg>
  );
};

// ─── Navigation ───────────────────────────────────────────────────────────────
const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero',         label: 'Home' },
    { id: 'about',        label: 'About' },
    { id: 'education',    label: 'Education' },
    { id: 'skills',       label: 'Skills' },
    { id: 'experience',   label: 'Experience' },
    { id: 'projects',     label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact',      label: 'Contact' },
  ];

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setIsOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const ids = sections.map(s => s.id);
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) setActiveSection(id);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer flex-shrink-0"
          onClick={() => handleScroll('hero')}
        >
          <ConstellationLogo size={42} delay={0.2} />
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-t border-border"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => (
  <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4 bg-gradient-to-b from-background via-background to-muted/20">
    <div className="container mx-auto max-w-4xl text-center">

      {/* Animated constellation logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-4 flex justify-center"
      >
        <ConstellationLogo size={100} delay={0.3} />
      </motion.div>

      {/* Name appears after logo finishes */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="text-lg font-semibold tracking-[0.25em] text-foreground/50 mb-6"
      >
        Sondos Ibrahim
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.1 }}
        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
      >
        Frontend Developer
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.3 }}
        className="text-xl md:text-2xl text-muted-foreground mb-4"
      >
        Angular Specialist & UI Enthusiast
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto"
      >
        Crafting elegant, responsive web experiences with modern technologies. Specialized in Angular, React, and full-stack development with a passion for clean code and exceptional user interfaces.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
      >
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/cv.pdf';
            link.download = 'Sondos_Ibrahim_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          <Download size={20} />
          Download CV
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="gap-2"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get in Touch
        </Button>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex justify-center cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={32} className="text-primary" />
      </motion.div>
    </div>
  </section>
);

// ─── About ────────────────────────────────────────────────────────────────────
const AboutSection: React.FC = () => (
  <section id="about" className="py-20 px-4 bg-background">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-foreground/80">
            <p className="text-lg leading-relaxed">
              I am a passionate Frontend Developer with expertise in Angular and modern web technologies. Currently pursuing a Bachelor's degree in Computer Science at Helwan University, I combine academic knowledge with practical experience in building scalable, responsive applications.
            </p>
            <p className="text-lg leading-relaxed">
              My journey in web development has equipped me with strong skills in component-based architecture, REST API integration, and user-centered design. I thrive in collaborative environments and am committed to writing clean, maintainable code.
            </p>
            <p className="text-lg leading-relaxed">
              I'm actively seeking internship and junior developer opportunities where I can contribute my technical skills and continue growing as a developer.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">Expertise</h4>
              <p className="text-foreground/70">Angular, React, TypeScript, Full-Stack Development</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">Focus</h4>
              <p className="text-foreground/70">Responsive Design, Component Architecture, REST APIs</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">Goal</h4>
              <p className="text-foreground/70">Building elegant solutions that solve real-world problems</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Education ────────────────────────────────────────────────────────────────
const EducationSection: React.FC = () => (
  <section id="education" className="py-20 px-4 bg-muted/20">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Education</h2>
        <Card className="p-8 border-2 border-primary/20 hover:border-primary/40 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold flex-shrink-0 text-xl">
              🎓
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Bachelor of Science in Computer Science</h3>
              <p className="text-lg text-primary font-semibold mb-2">Helwan University</p>
              <p className="text-foreground/70 mb-4">Faculty of Computers and Artificial Intelligence</p>
              <Badge className="bg-primary/20 text-primary">Expected Graduation: June 2027</Badge>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  </section>
);

// ─── Skills ───────────────────────────────────────────────────────────────────
const SkillsSection: React.FC = () => {
  const skillCategories = [
    { name: 'Frontend',          skills: ['HTML5','CSS3','JavaScript','TypeScript','React','Angular','Bootstrap','RxJS'] },
    { name: 'Backend',           skills: ['Spring Boot','.NET','REST API','Node.js'] },
    { name: 'Database',          skills: ['MySQL','Relational Design','JPA/Hibernate'] },
    { name: 'Tools & Practices', skills: ['Git','GitHub','Figma','Agile/Scrum','UI/UX Design'] },
  ];
  const softSkills = [
    { icon: '🤝', title: 'Teamwork',        description: 'Collaborative problem-solving' },
    { icon: '💬', title: 'Communication',   description: 'Clear technical documentation' },
    { icon: '👥', title: 'Pair Programming',description: 'Knowledge sharing' },
    { icon: '🔍', title: 'Code Review',     description: 'Quality assurance' },
    { icon: '⚡', title: 'Agile/Scrum',     description: 'Sprint-based development' },
    { icon: '🎯', title: 'Problem Solving', description: 'Creative solutions' },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{cat.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <Badge key={skill} className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center">Soft Skills</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {softSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 text-center border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="text-4xl mb-3">{skill.icon}</div>
                <h4 className="font-bold mb-2">{skill.title}</h4>
                <p className="text-sm text-foreground/70">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Experience ───────────────────────────────────────────────────────────────
const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      role: 'Frontend Developer Trainee',
      company: 'ITI (Information Technology Institute)',
      period: 'Feb 2025 – Jul 2025',
      type: 'Remote • Angular Internship',
      achievements: [
        'Engineered 5+ responsive SPAs using Angular, HTML5, CSS3, and JavaScript',
        'Connected Angular components to RESTful APIs using HttpClient',
        'Built a reusable UI component library following Angular best practices',
        'Participated in Agile sprints, code reviews, and pair-programming sessions',
      ],
    },
    {
      role: 'Web Developer Trainee',
      company: 'NTI (National Telecommunication Institute)',
      period: 'Aug 2024 – Sep 2024',
      type: 'Remote',
      achievements: [
        'Designed and coded 10+ mobile-first web pages using HTML5, CSS3, JavaScript, and jQuery',
        'Implemented responsive layouts using CSS Flexbox and Grid',
        'Contributed to a shared codebase with 4 teammates using Git version control',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-lg text-primary font-semibold">{exp.company}</p>
                      <p className="text-sm text-foreground/60">{exp.type}</p>
                    </div>
                    <Badge className="bg-secondary/20 text-secondary">{exp.period}</Badge>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="flex gap-3 text-foreground/80">
                        <span className="text-primary font-bold">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Projects ─────────────────────────────────────────────────────────────────
const ProjectsSection: React.FC = () => {
  const projects = [
    {
      name: 'Bibliotheca',
      subtitle: 'Library Management System',
      description: 'Full-stack SPA with role-based access control supporting User, Admin, and Librarian roles.',
      technologies: ['React','Spring Boot','MySQL','REST API'],
      achievements: ['Architected RBAC system with protected routes','Implemented real-time inventory management','Modeled relational database schema'],
      github: 'https://github.com/Sondos-Ahmed-dev/library-management-system',
    },
    {
      name: 'PetAdopt',
      subtitle: 'Pet Adoption Platform',
      description: 'Responsive SPA allowing users to browse, filter, and adopt pets with live availability updates.',
      technologies: ['React','.NET','REST API'],
      achievements: ['Built dynamic filtering system','Integrated location-based search','Implemented real-time pet availability'],
      github: 'https://github.com/Sondos-Ahmed-dev',
    },
    {
      name: 'Shopify Clone',
      subtitle: 'E-Commerce Platform',
      description: 'Fully responsive e-commerce SPA with product listing, search, and dynamic shopping cart.',
      technologies: ['Angular','REST API','Bootstrap','RxJS'],
      achievements: ['Implemented advanced product filtering','Built dynamic shopping cart with real-time calculations','Integrated public REST APIs for product data'],
      github: 'https://github.com/Sondos-Ahmed-dev/angular-ecommerce',
    },
    {
      name: '3D Tic-Tac-Toe',
      subtitle: 'AI Game (4×4×4)',
      description: 'AI agent using Minimax algorithm with Alpha-Beta pruning for optimal decision-making.',
      technologies: ['Python','Minimax','Alpha-Beta Pruning'],
      achievements: ['Implemented heuristic evaluation strategies','Optimized move generation and win-condition detection','Built complete 4×4×4 game board logic'],
      github: 'https://github.com/Sondos-Ahmed-dev/4-4-4-Tic-Tac-Toe',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full p-8 border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg">
                  <h3 className="text-2xl font-bold mb-1">{project.name}</h3>
                  <p className="text-primary font-semibold mb-4">{project.subtitle}</p>
                  <p className="text-foreground/70 mb-6">{project.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-sm">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <Badge key={tech} className="bg-accent/20 text-accent">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6 space-y-2">
                    {project.achievements.map((a, i) => (
                      <div key={i} className="flex gap-2 text-sm text-foreground/70">
                        <span className="text-primary">✓</span>
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full gap-2" onClick={() => window.open(project.github, '_blank')}>
                    <Github size={18} />
                    View on GitHub
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Certificates ─────────────────────────────────────────────────────────────
const CertificatesSection: React.FC = () => {
  const certificates = [
    { name: 'Front-End Development with Angular', issuer: 'ITI (Information Technology Institute)', date: '2025', icon: '🏆' },
    { name: 'UI/UX Design',                       issuer: 'NTI (National Telecommunication Institute)', date: '2025', icon: '🎨' },
    { name: 'Web Designer',                        issuer: 'NTI (National Telecommunication Institute)', date: '2024', icon: '💻' },
  ];

  return (
    <section id="certificates" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Certifications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 text-center border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
                  <div className="text-5xl mb-4">{cert.icon}</div>
                  <h3 className="font-bold mb-2">{cert.name}</h3>
                  <p className="text-sm text-foreground/70 mb-3">{cert.issuer}</p>
                  <Badge className="bg-secondary/20 text-secondary">{cert.date}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const ContactSection: React.FC = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitContactMutation = trpc.contact.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactMutation.mutateAsync(formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Message sent successfully!');
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
                <p className="text-foreground/70 mb-8">I'm always interested in hearing about new projects and opportunities. Feel free to reach out!</p>
              </div>
              <div className="space-y-4">
                {[
                  { href: 'mailto:sondosibrahim246@gmail.com', Icon: Mail,     label: 'Email',    value: 'sondosibrahim246@gmail.com' },
                  { href: 'https://linkedin.com/in/sondos-ibrahim-629342312', Icon: Linkedin, label: 'LinkedIn', value: 'Sondos Ibrahim' },
                  { href: 'https://github.com/Sondos-Ahmed-dev', Icon: Github,  label: 'GitHub',  value: 'github.com/Sondos-Ahmed-dev' },
                ].map(({ href, Icon, label, value }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">{label}</p>
                      <p className="text-foreground/70">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {(['name','email','subject'] as const).map(field => (
                <div key={field}>
                  <label className="block text-sm font-semibold mb-2 capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder={field === 'email' ? 'your@email.com' : `Your ${field}`}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer className="bg-muted/50 border-t border-border py-8 px-4">
    <div className="container mx-auto text-center text-foreground/70">
      <p>© 2025 Sondos Ibrahim. All rights reserved.</p>
      <p className="text-sm mt-2">Crafted with passion and modern web technologies</p>
    </div>
  </footer>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from '../../contexts/MobileContext';
import { 
  ExternalLink, 
  Github, 
  Eye,
  Filter,
  X,
  Users,
  Zap,
  TrendingUp
} from 'lucide-react';

const Projects = ({ onSectionChange }) => {
  const { isMobile } = useMobile();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Projects data with MERN stack properly defined and same URLs
  const projects = [
    {
      id: 1,
      title: 'TraderJournal',
      description: 'Full-stack trade tracking application with Node.js/MongoDB backend and React dashboard',
      detailedDescription: 'A comprehensive trading journal that helps traders log, analyze, and optimize their trading strategies. Features real-time data synchronization, performance analytics, and secure user authentication. Acquired 30+ users in first 3 days with optimized query performance.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
      category: 'fullstack',
      featured: true,
      githubUrl: 'https://github.com/yamukelanintimbane/traderjournal',
      liveUrl: 'https://traderjournal.onrender.com/',
      metrics: {
        users: 30,
        satisfaction: 95,
        performance: 90
      }
    },
    {
      id: 2,
      title: 'K53 Quiz App',
      description: 'Full-stack educational tool with quiz APIs, progress tracking, and PDF generation',
      detailedDescription: 'An educational tool that helps users prepare for their K53 driver\'s license test. Features quiz APIs, progress tracking, and PDF certificate generation. Handles 1,000+ monthly sessions with optimized database performance.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'jsPDF'],
      category: 'fullstack',
      featured: true,
      githubUrl: 'https://github.com/yamukelanintimbane/k53-quiz',
      liveUrl: 'https://k53-quiz-app.netlify.app/',
      metrics: {
        users: 1000,
        satisfaction: 92,
        performance: 88
      }
    },
    {
      id: 3,
      title: 'AstuteFX',
      description: 'Financial platform offering tools for forex trading and real-time market analysis',
      detailedDescription: 'Fintech-inspired API platform providing real-time trading data and secure transaction processing. Enhanced reliability by 25% through optimized backend architecture.',
      techStack: ['Node.js', 'Express', 'MongoDB', 'WebSocket', 'API Integration'],
      category: 'backend',
      featured: false,
      githubUrl: 'https://github.com/yamukelanintimbane/astutefx',
      liveUrl: 'https://astutefx.ct.ws/?i=1',
      metrics: {
        users: 150,
        satisfaction: 94,
        performance: 95
      }
    },
    {
      id: 4,
      title: 'FNB Revision App',
      description: 'Interactive revision app for students with quizzes and progress tracking',
      detailedDescription: 'A comprehensive revision platform offering structured courses and quizzes for programming fundamentals. Features progress tracking and interactive coding exercises.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      category: 'fullstack',
      featured: false,
      githubUrl: 'https://github.com/yamukelanintimbane/fnb-revision',
      liveUrl: 'https://fnbappoftheyear.netlify.app/',
      metrics: {
        users: 500,
        satisfaction: 90,
        performance: 85
      }
    },
    {
      id: 5,
      title: 'LuxAura Scents',
      description: 'Shopify e-commerce store making luxury perfumes accessible at affordable prices',
      detailedDescription: 'A complete e-commerce solution built on Shopify platform offering luxury fragrances at competitive prices. Features seamless checkout experience, product catalog management, and integrated payment processing.',
      techStack: ['Shopify', 'UI/UX Design', 'E-Commerce', 'Payment Gateway'],
      category: 'ecommerce',
      featured: true,
      githubUrl: null,
      liveUrl: '#',
      metrics: {
        users: 500,
        satisfaction: 92,
        performance: 88
      }
    },
    {
      id: 6,
      title: 'BeatsbyHezel',
      description: 'Professional beauty portfolio with WhatsApp booking integration',
      detailedDescription: 'A comprehensive portfolio website for a beauty professional featuring service showcases, gallery displays, and integrated WhatsApp booking system for client appointments.',
      techStack: ['Portfolio Design', 'WhatsApp API', 'Booking System', 'Firebase'],
      category: 'frontend',
      featured: false,
      githubUrl: null,
      liveUrl: 'https://beatsbyhezel.web.app/',
      metrics: {
        users: 200,
        satisfaction: 94,
        performance: 85
      }
    },
    {
      id: 7,
      title: 'Playball Catch',
      description: 'Engaging web-based game with increasing difficulty and leaderboards',
      detailedDescription: 'An interactive web game where players catch falling balls with progressive difficulty levels. Features real-time scoring, leaderboard system, and responsive gameplay mechanics.',
      techStack: ['HTML5', 'JavaScript', 'Canvas API', 'Firebase'],
      category: 'frontend',
      featured: false,
      githubUrl: null,
      liveUrl: 'https://playtimebounce.netlify.app/',
      metrics: {
        users: 1500,
        satisfaction: 89,
        performance: 82
      }
    },
    {
      id: 8,
      title: 'Yamudrive',
      description: 'PDF resource platform for matriculants with study materials',
      detailedDescription: 'Educational platform providing PDF resources, study guides, and past papers for high school students. Features organized content library and easy document access.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'PDF.js'],
      category: 'fullstack',
      featured: false,
      githubUrl: null,
      liveUrl: '#',
      metrics: {
        users: 800,
        satisfaction: 91,
        performance: 87
      }
    },
    {
      id: 9,
      title: 'KasiFoodie',
      description: 'Multi-vendor restaurant platform where each seller manages their own store',
      detailedDescription: 'Complete food ordering system with vendor dashboards and customer interfaces. Multi-vendor restaurant platform where each seller manages their own store with complete ordering system.',
      techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT Auth'],
      category: 'fullstack',
      featured: true,
      githubUrl: null,
      liveUrl: '#',
      metrics: {
        users: 1200,
        satisfaction: 93,
        performance: 89
      }
    },
    {
      id: 10,
      title: 'Hope Revival Church',
      description: 'Church website with event management and community features',
      detailedDescription: 'Church website with event management, sermon archives, donation system, and community engagement features. Built to connect members and share spiritual content.',
      techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Payment Integration'],
      category: 'fullstack',
      featured: false,
      githubUrl: null,
      liveUrl: '#',
      metrics: {
        users: 400,
        satisfaction: 96,
        performance: 84
      }
    },
    {
      id: 11,
      title: 'EduRide Vehicle Solution',
      description: 'Vehicle management and booking platform with real-time tracking',
      detailedDescription: 'Transportation management platform that streamlines vehicle logistics with real-time tracking, scheduling features, and booking management for educational institutions.',
      techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Real-time Tracking'],
      category: 'fullstack',
      featured: false,
      githubUrl: null,
      liveUrl: 'https://eduridevehiclesolution.onrender.com/',
      metrics: {
        users: 300,
        satisfaction: 90,
        performance: 86
      }
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'ecommerce', label: 'E-Commerce' },
    { key: 'featured', label: 'Featured' }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.category === activeFilter;
  });

  const ProjectModal = ({ project, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-dark-400 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Detailed Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">About this project</h4>
            <p className="text-gray-300 leading-relaxed">{project.detailedDescription}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 glass rounded-xl">
              <Users className="w-8 h-8 text-accent-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{project.metrics.users}+</div>
              <div className="text-gray-400 text-sm">Users</div>
            </div>
            <div className="text-center p-4 glass rounded-xl">
              <TrendingUp className="w-8 h-8 text-accent-purple mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{project.metrics.satisfaction}%</div>
              <div className="text-gray-400 text-sm">Satisfaction</div>
            </div>
            <div className="text-center p-4 glass rounded-xl">
              <Zap className="w-8 h-8 text-accent-teal mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{project.metrics.performance}%</div>
              <div className="text-gray-400 text-sm">Performance</div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex space-x-4">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-accent-purple text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:border-accent-purple hover:bg-accent-purple/10 transition-colors"
              >
                <Github size={18} />
                <span>View Code</span>
              </a>
            )}
            {(!project.liveUrl || project.liveUrl === '#') && !project.githubUrl && (
              <button
                disabled
                className="flex items-center space-x-2 bg-gray-600 text-gray-400 px-6 py-3 rounded-xl font-semibold cursor-not-allowed"
              >
                <ExternalLink size={18} />
                <span>Coming Soon</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-dark-500 to-dark-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Featured <span className="text-accent-purple">Projects</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-accent-purple mx-auto"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 mt-4 max-w-2xl mx-auto"
          >
            Here are some of my recent projects that showcase my skills and experience.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-accent-purple text-white shadow-lg shadow-purple-500/25'
                  : 'glass text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="max-w-4xl mx-auto"
        >
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    {project.featured && (
                      <span className="px-2 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-dark-400 text-gray-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-dark-400 text-gray-400 rounded text-xs">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{project.metrics.users}+ users</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap size={14} />
                      <span>{project.metrics.performance}% perf</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 bg-accent-purple/20 text-accent-purple py-2 rounded-lg hover:bg-accent-purple/30 transition-colors"
                    >
                      <Eye size={16} />
                      <span className="text-sm font-medium">View Details</span>
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 flex items-center justify-center glass rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Github size={16} className="text-gray-400" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => onSectionChange('contact')}
            className="bg-accent-purple text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Project With Me
          </button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

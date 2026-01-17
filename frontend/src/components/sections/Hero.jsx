import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, ExternalLink, Star, Code2, Database, Server, Globe } from 'lucide-react';
import { useMobile } from '../../contexts/MobileContext';

const Hero = ({ onSectionChange }) => {
  const { isMobile } = useMobile();
  const [currentRole, setCurrentRole] = useState(0);
  const canvasRef = useRef(null);

  const roles = [
    'Full-Stack Developer',
    'Node.js Specialist',
    'React Enthusiast',
    'MongoDB Expert',
    'Freelance Developer',
    'Tech Entrepreneur'
  ];

  const stats = [
    { number: '15+', label: 'Projects Delivered', icon: Code2 },
    { number: '30+', label: 'Happy Users', icon: Star },
    { number: '99%', label: 'Uptime', icon: Server },
    { number: '1Y+', label: 'Experience', icon: Star }
  ];

  const techIcons = [
    { icon: Code2, name: 'React' },
    { icon: Database, name: 'MongoDB' },
    { icon: Server, name: 'Node.js' },
    { icon: Globe, name: 'Express' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const updateCanvasSize = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        canvas.width = heroSection.clientWidth;
        canvas.height = heroSection.clientHeight;
      }
    };

    updateCanvasSize();

    const codeSnippets = ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript', 'API', 'FullStack'];
    
    class CodeParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.speed = 1 + Math.random() * 2;
        this.opacity = 0.1 + Math.random() * 0.3;
        this.size = 12 + Math.random() * 6;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.reset();
          this.y = -20;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#8b5cf6';
        ctx.font = `${this.size}px "Fira Code", monospace`;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }

    const particles = Array(20).fill().map(() => new CodeParticle());
    let animationId;

    function animate() {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => updateCanvasSize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    onSectionChange('projects');
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden gradient-bg">
      {/* Network Nodes Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Enhanced Hero Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Profile Image & Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative inline-block"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-r from-accent-purple to-accent-pink p-1">
                <div className="w-full h-full rounded-full bg-dark-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/profile/Yamdev.jpg"
                    alt="Yamukelani's Profile Photo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Online Status Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-dark-500"
              />
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl md:text-7xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Yamukelani{' '}
                <span className="gradient-text">Ntimbane</span>
              </motion.h1>
              
              <motion.div
                className="h-16 md:h-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={currentRole}
                    className="text-xl md:text-3xl text-gray-300 font-light"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {roles[currentRole]}
                  </motion.h2>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Building scalable web applications with <span className="text-accent-purple font-semibold">Node.js</span>, 
              <span className="text-accent-blue font-semibold"> React</span>, and 
              <span className="text-accent-teal font-semibold"> MongoDB</span>. 
              Founder of ZenoLaunch with 15+ production apps that drive real user growth.
            </motion.p>

            {/* Tech Stack Icons */}
            <motion.div
              className="flex justify-center items-center space-x-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {techIcons.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex flex-col items-center space-y-2"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-dark-400 rounded-xl flex items-center justify-center border border-gray-700">
                    <tech.icon size={24} className="text-accent-purple" />
                  </div>
                  <span className="text-xs text-gray-400">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <motion.button
                onClick={scrollToProjects}
                className="bg-accent-purple text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-lg shadow-purple-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
                <ExternalLink size={20} />
              </motion.button>
              
              <motion.button
                onClick={() => onSectionChange('contact')}
                className="border-2 border-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:border-accent-purple hover:bg-accent-purple/10 transition-all duration-300 flex items-center space-x-3 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Hire Me</span>
                <Download size={20} />
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl glass hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm flex items-center justify-center space-x-1">
                    <stat.icon size={14} />
                    <span>{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator - MOVED BELOW QUICK STATS */}
            <motion.div
              className="mt-8 mx-auto" // 👈 Relative positioning, centered
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              role="button" // 👈 Accessibility
              aria-label="Scroll to projects section"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center space-y-2 text-gray-400 cursor-pointer"
                onClick={scrollToProjects}
              >
                <span className="text-sm">Scroll to explore</span>
                <ChevronDown size={20} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
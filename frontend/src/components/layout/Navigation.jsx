import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, User, Briefcase, Mail, Star, Settings } from 'lucide-react';
import { useMobile } from '../../contexts/MobileContext';

const Navigation = ({ currentSection }) => {
  const { isMobile } = useMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', icon: User },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Star },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsOpen(false);
    
    // Check if it's a hash link or a route
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // It's a route, navigate to it
      window.location.href = href;
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-accent-purple rounded-xl flex items-center justify-center">
              <Code2 size={24} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">Yamukelani Ntimbane</span>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors relative ${
                    currentSection === item.name.toLowerCase()
                      ? 'text-accent-purple'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  {currentSection === item.name.toLowerCase() && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent-purple rounded-full"
                      layoutId="underline"
                    />
                  )}
                </motion.button>
              ))}
              
              {/* Admin Button */}
              <motion.button
                onClick={() => window.open('/admin/login', '_blank')}
                className="text-sm text-gray-400 hover:text-white flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Settings size={16} />
                <span>Admin</span>
              </motion.button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl border border-gray-700 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
                      currentSection === item.name.toLowerCase()
                        ? 'bg-accent-purple/20 text-accent-purple'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.name}</span>
                  </motion.button>
                ))}
                
                {/* Admin Link */}
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    window.open('/admin/login', '_blank');
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl text-left text-gray-300 hover:bg-white/5 hover:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Settings size={18} />
                  <span className="font-medium">Admin Panel</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
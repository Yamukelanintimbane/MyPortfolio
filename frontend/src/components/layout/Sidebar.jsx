import { motion } from 'framer-motion';
import { 
  User, 
  Star, 
  Briefcase, 
  Mail, 
  Code2,
  Home,
  FileText,
  DollarSign,
  Settings,
  X
} from 'lucide-react';
import { useMobile } from '../../contexts/MobileContext';

const Sidebar = ({ isOpen, onClose, currentSection, onSectionChange }) => {
  const { isMobile } = useMobile();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'skills', label: 'Skills', icon: Star, href: '#skills' },
    { id: 'projects', label: 'Projects', icon: Briefcase, href: '#projects' },
    { id: 'experience', label: 'Experience', icon: FileText, href: '#experience' },
    { id: 'hire', label: 'Hire Me', icon: DollarSign, href: '#hire' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onSectionChange(href.replace('#', ''));
    }
    if (isMobile) {
      onClose();
    }
  };

  const sidebarContent = (
    <motion.div
      initial={isMobile ? { x: -300 } : false}
      animate={isMobile ? { x: 0 } : false}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-purple rounded-xl flex items-center justify-center">
            <Code2 size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Yamukelani</h2>
            <p className="text-gray-400 text-sm">Full-Stack Developer</p>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="ml-auto text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.href)}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-all duration-300 group ${
              currentSection === item.id
                ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon 
              size={20} 
              className={`transition-colors ${
                currentSection === item.id ? 'text-accent-purple' : 'text-gray-400 group-hover:text-white'
              }`} 
            />
            <span className="font-medium">{item.label}</span>
            
            {currentSection === item.id && (
              <motion.div
                className="ml-auto w-2 h-2 bg-accent-purple rounded-full"
                layoutId="activeDot"
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="space-y-3">
          {/* Admin Link */}
          <motion.a
            href="/admin/login"
            target="_blank"
            className="flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300 group"
            whileHover={{ x: 4 }}
          >
            <Settings size={18} />
            <span className="font-medium">Admin Panel</span>
          </motion.a>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Available for work</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}

        {/* Mobile Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: isOpen ? 0 : -300 }}
          transition={{ type: "spring", damping: 30 }}
          className="fixed left-0 top-0 h-full w-80 bg-dark-400 border-r border-gray-700 z-50 lg:hidden shadow-2xl"
        >
          {sidebarContent}
        </motion.div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 lg:z-30"
    >
      <div className="flex flex-col flex-1 min-h-0 bg-dark-400 border-r border-gray-700">
        {sidebarContent}
      </div>
    </motion.div>
  );
};

export default Sidebar;
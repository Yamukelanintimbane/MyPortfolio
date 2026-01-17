import { motion } from 'framer-motion';
import { useMobile } from '../../contexts/MobileContext';
import { 
  User, 
  MapPin, 
  Calendar, 
  Award, 
  BookOpen,
  GraduationCap,
  Target,
  Heart
} from 'lucide-react';

const About = ({ onSectionChange }) => {
  const { isMobile } = useMobile();

  const stats = [
    { icon: Award, number: '15+', label: 'Projects Completed' },
    { icon: User, number: '30+', label: 'Happy Users' },
    { icon: Calendar, number: '1+', label: 'Years Experience' },
    { icon: BookOpen, number: '100%', label: 'Client Satisfaction' }
  ];

  const education = [
    {
      degree: 'Certificate in Full Stack Development',
      institution: 'FNB App Academy via IT Varsity',
      year: '2025',
      icon: GraduationCap
    },
    {
      degree: 'Bachelor of Social Science',
      institution: 'University of KwaZulu Natal',
      year: '2021-2024',
      icon: BookOpen
    },
    {
      degree: 'Grade 12 National Certificate',
      institution: 'Umfolozi High School',
      year: '2020',
      icon: Award
    }
  ];

  const passions = [
    {
      icon: Target,
      title: 'Problem Solving',
      description: 'Love tackling complex challenges and creating elegant solutions'
    },
    {
      icon: Heart,
      title: 'User Experience',
      description: 'Passionate about creating intuitive and engaging user interfaces'
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and best practices'
    }
  ];

  return (
    <section id="about" className="py-20 bg-dark-400">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate full-stack developer from Durban, South Africa, 
            building the future one line of code at a time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Introduction */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Hi, I'm Yamukelani Ntimbane - a passionate full-stack developer with expertise in 
                Node.js, React, and MongoDB. I founded ZenoLaunch where I've shipped 15+ production 
                applications that drive real user growth.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My journey started with self-teaching through freeCodeCamp and MDN Web Docs, 
                then formalized through FNB App Academy. I'm deeply involved in SDLC, RESTful APIs, 
                and agile delivery, passionate about building secure, scalable systems.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <stat.icon className="w-8 h-8 text-accent-purple mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Location & Details */}
            <div className="glass rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-4">Details</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin size={20} className="text-accent-purple" />
                  <span>Durban, KwaZulu-Natal, South Africa</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <User size={20} className="text-accent-purple" />
                  <span>Full-Stack Web Developer</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Calendar size={20} className="text-accent-purple" />
                  <span>Available for freelance projects</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Education & Passions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Education */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <edu.icon size={24} className="text-accent-purple" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{edu.degree}</h4>
                      <p className="text-accent-purple">{edu.institution}</p>
                      <p className="text-gray-400 text-sm">{edu.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Passions */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">My Passions</h3>
              <div className="space-y-4">
                {passions.map((passion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center">
                      <passion.icon size={20} className="text-accent-purple" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{passion.title}</h4>
                      <p className="text-gray-400 text-sm">{passion.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <button
                onClick={() => onSectionChange('contact')}
                className="bg-accent-purple text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Let's Work Together
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
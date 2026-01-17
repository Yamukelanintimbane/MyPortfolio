import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, Award, Users, Code, Globe, TrendingUp, Target } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';
import { useExperience } from '../../hooks/UseExperience';
import ExperienceCard from '../ui/ExperienceCard';
import ExperienceTimeline from '../ui/ExperienceTimeline';

const Experience = () => {
  const [experiences, setExperiences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('work');
  // Analytics tracking is handled through direct imports
  const { experienceData, levels, getExperienceProgression, error: experienceError } = useExperience();

  useEffect(() => {
    // Mock data for experience
    const mockExperiences = {
      work: [
        {
          id: 1,
          title: 'Senior Front-End Developer',
          company: 'TechCorp Solutions',
          period: '2022 - Present',
          description: 'Lead front-end development for enterprise applications, mentoring junior developers and implementing modern React architectures.',
          technologies: ['React', 'TypeScript', 'Redux', 'Tailwind CSS', 'Node.js'],
          achievements: [
            'Reduced page load time by 40% through optimization techniques',
            'Implemented design system used across 15+ applications',
            'Led migration from class components to hooks'
          ]
        },
        {
          id: 2,
          title: 'Front-End Developer',
          company: 'Creative Agency',
          period: '2019 - 2022',
          description: 'Developed responsive websites and web applications for clients across various industries.',
          technologies: ['React', 'Vue.js', 'JavaScript', 'CSS3', 'WordPress'],
          achievements: [
            'Delivered 50+ client projects on time and within budget',
            'Improved client satisfaction scores by 35%',
            'Implemented accessibility standards across all projects'
          ]
        },
        {
          id: 3,
          title: 'Junior Developer',
          company: 'Startup XYZ',
          period: '2017 - 2019',
          description: 'Assisted in building and maintaining web applications, learning modern development practices.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'PHP'],
          achievements: [
            'Contributed to successful product launch with 10k+ users',
            'Learned and implemented modern development workflows',
            'Collaborated with cross-functional teams'
          ]
        }
      ],
      education: [
        {
          id: 1,
          title: 'Bachelor of Science in Computer Science',
          institution: 'University of Technology',
          period: '2013 - 2017',
          description: 'Graduated with honors, focusing on web development and human-computer interaction.',
          achievements: [
            'Dean\'s List for 3 consecutive years',
            'Completed capstone project on responsive web design',
            'Participated in coding competitions and hackathons'
          ]
        },
        {
          id: 2,
          title: 'Front-End Development Certification',
          institution: 'Code Academy',
          period: '2016 - 2017',
          description: 'Intensive program covering modern front-end technologies and best practices.',
          achievements: [
            'Mastered React, Vue.js, and modern CSS frameworks',
            'Built 10+ portfolio projects',
            'Learned industry-standard development workflows'
          ]
        }
      ],
      certifications: [
        {
          id: 1,
          title: 'AWS Certified Developer - Associate',
          issuer: 'Amazon Web Services',
          date: '2023',
          description: 'Demonstrates proficiency in developing and maintaining AWS-based applications.'
        },
        {
          id: 2,
          title: 'Google Analytics Individual Qualification',
          issuer: 'Google',
          date: '2022',
          description: 'Certified in Google Analytics implementation and analysis.'
        },
        {
          id: 3,
          title: 'Responsive Web Design Certification',
          issuer: 'freeCodeCamp',
          date: '2020',
          description: 'Comprehensive certification covering responsive design principles and techniques.'
        }
      ]
    };

    setTimeout(() => {
      setExperiences(mockExperiences);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    trackEvent('experience_tab_change', { tab });
  };

  const getIcon = (tab) => {
    switch (tab) {
      case 'work': return <Briefcase className="w-6 h-6" />;
      case 'education': return <Award className="w-6 h-6" />;
      case 'certifications': return <Users className="w-6 h-6" />;
      case 'intelligent': return <Target className="w-6 h-6" />;
      default: return <Code className="w-6 h-6" />;
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-dark-500 to-dark-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience & Education</h2>
            <div className="w-24 h-1 bg-accent-purple mx-auto"></div>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-purple"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!experiences) {
    return (
      <section className="py-20 bg-gradient-to-br from-dark-500 to-dark-600">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience & Education</h2>
            <p className="text-gray-400">Unable to load experience data. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-dark-500 to-dark-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent-cyan rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-purple rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Experience & Education
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
            A journey of continuous learning and professional growth in the world of web development.
          </motion.p>
        </div>

        {/* Intelligent Experience Overview */}
        {experienceData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-accent-purple to-accent-cyan rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold">Intelligent Experience Calculation</h3>
                    <p className="text-purple-200">Auto-calculated based on professional timeline</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{(experienceData.years || 0).toFixed(1)} years</div>
                  <div className="text-sm text-purple-200">Total Experience</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ExperienceCard years={experienceData.years} showProgress={true} />
                <ExperienceTimeline />
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Experience Error Handling */}
        {experienceError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 bg-red-500/20 border border-red-500/30 rounded-xl"
          >
            <p className="text-red-400">Error loading experience data: {experienceError}</p>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['work', 'education', 'certifications', 'intelligent'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/25'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {getIcon(tab)}
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'work' && (
                <div className="space-y-8">
                  {experiences.work.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white">{exp.title}</h3>
                          <p className="text-accent-purple font-semibold">{exp.company}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 mt-2 md:mt-0">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{exp.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400 font-semibold">Key Achievements:</p>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-gray-300 text-sm flex items-start">
                              <span className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-8">
                  {experiences.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white">{edu.title}</h3>
                          <p className="text-accent-cyan font-semibold">{edu.institution}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 mt-2 md:mt-0">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{edu.description}</p>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400 font-semibold">Achievements:</p>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i} className="text-gray-300 text-sm flex items-start">
                              <span className="w-2 h-2 bg-accent-cyan rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'certifications' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {experiences.certifications.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Award className="w-8 h-8 text-accent-purple" />
                        <span className="text-sm text-gray-400">{cert.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                      <p className="text-accent-cyan font-semibold mb-2">{cert.issuer}</p>
                      <p className="text-gray-300 text-sm">{cert.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'intelligent' && (
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">Smart Experience System</h3>
                    <p className="text-gray-300 mb-6">
                      Our intelligent system automatically calculates your professional experience level based on your career timeline. 
                      Experience levels are dynamically updated as you gain more experience, ensuring your profile always reflects your current expertise.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-lg p-6">
                        <h4 className="font-semibold text-white mb-3">How It Works</h4>
                        <ul className="text-sm text-gray-300 space-y-2">
                          <li>• Automatic calculation based on start date</li>
                          <li>• Configurable thresholds for each level</li>
                          <li>• Real-time updates as experience grows</li>
                          <li>• Professional level descriptions</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-6">
                        <h4 className="font-semibold text-white mb-3">Benefits</h4>
                        <ul className="text-sm text-gray-300 space-y-2">
                          <li>• Eliminates manual level management</li>
                          <li>• Accurate reflection of professional growth</li>
                          <li>• Consistent experience representation</li>
                          <li>• Enhanced credibility with clients</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Experience Levels Display */}
                  {levels.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {levels.map((level, index) => (
                        <motion.div
                          key={level._id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${level.color} 0%, ${level.color}cc 100%)`
                          }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: level.color }}
                              >
                                {level.icon}
                              </div>
                              <div>
                                <h4 className="font-bold text-white">{level.level}</h4>
                                <p className="text-sm text-white/80">{level.minYears} - {level.maxYears} years</p>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-white/90">{level.description}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
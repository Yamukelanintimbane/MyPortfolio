import { motion } from 'framer-motion';
import { useMobile } from '../../contexts/MobileContext';
import { 
  Code2, 
  Database, 
  Server, 
  Globe,
  GitBranch,
  Cloud,
  Settings,
  Zap
} from 'lucide-react';

const Skills = ({ onSectionChange }) => {
  const { isMobile } = useMobile();

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code2,
      color: 'text-accent-blue',
      bgColor: 'bg-blue-500/20',
      skills: [
        { name: 'React', level: 90 },
        { name: 'HTML/CSS/JS', level: 95 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Framer Motion', level: 80 }
      ]
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'text-accent-purple',
      bgColor: 'bg-purple-500/20',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Express.js', level: 85 },
        { name: 'RESTful APIs', level: 90 },
        { name: 'JWT Authentication', level: 85 }
      ]
    },
    {
      title: 'Database',
      icon: Database,
      color: 'text-accent-teal',
      bgColor: 'bg-teal-500/20',
      skills: [
        { name: 'MongoDB', level: 87 },
        { name: 'MongoDB Aggregation', level: 82 },
        { name: 'Indexing & Optimization', level: 85 },
        { name: 'NoSQL Design', level: 80 }
      ]
    },
    {
      title: 'Tools & DevOps',
      icon: Cloud,
      color: 'text-accent-amber',
      bgColor: 'bg-amber-500/20',
      skills: [
        { name: 'Git & GitHub', level: 88 },
        { name: 'Docker', level: 70 },
        { name: 'Render/Netlify', level: 85 },
        { name: 'Agile/Scrum', level: 82 }
      ]
    }
  ];

  const learningSkills = [
    { name: 'Java', progress: 60 },
    { name: 'AWS', progress: 40 },
    { name: 'Kubernetes', progress: 30 },
    { name: 'Python', progress: 80 }
  ];

  return (
    <section id="skills" className="py-20 bg-dark-500">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                  <category.icon size={24} className={category.color} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full mt-1"></div>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-accent-purple text-sm font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Zap size={24} className="text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Currently Learning</h3>
              <p className="text-gray-400">Skills I'm actively developing</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {learningSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-3">
                  <div className="w-16 h-16 bg-dark-400 rounded-2xl flex items-center justify-center border border-gray-600 group-hover:border-accent-purple transition-colors">
                    <span className="text-white font-bold text-lg">{skill.progress}%</span>
                  </div>
                  <motion.div
                    className="absolute inset-0 border-2 border-accent-purple rounded-2xl"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
                <span className="text-gray-300 font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
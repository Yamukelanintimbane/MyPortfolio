import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-500 to-dark-700 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-accent-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-accent-purple/30"
        >
          <Code2 size={32} className="text-accent-purple" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Yamukelani Ntimbane
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400"
        >
          Full-Stack Developer
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-8 h-8 border-2 border-accent-purple border-t-transparent rounded-full animate-spin mx-auto mt-6"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
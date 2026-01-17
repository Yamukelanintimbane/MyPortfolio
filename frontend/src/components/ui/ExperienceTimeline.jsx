import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '../../hooks/UseExperience';
import { Calendar, TrendingUp, Target, Award } from 'lucide-react';

const ExperienceTimeline = () => {
  const { timeline, loading, error } = useExperience();
  const [selectedYear, setSelectedYear] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'grid'

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-red-400">
        <p>Error loading experience timeline: {error}</p>
      </div>
    );
  }

  if (!timeline || timeline.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">No experience data available</p>
      </div>
    );
  }

  const getLevelColor = (level) => {
    return level?.color || '#667eea';
  };

  const getLevelIcon = (levelName) => {
    switch (levelName) {
      case 'Intern': return 'User';
      case 'Junior': return 'User';
      case 'Mid-Level': return 'Briefcase';
      case 'Senior': return 'Briefcase';
      case 'Lead': return 'Shield';
      case 'Principal': return 'Crown';
      case 'Architect': return 'Building';
      default: return 'Briefcase';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-accent-purple" />
          <h3 className="text-xl font-bold text-white">Experience Journey</h3>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              viewMode === 'timeline'
                ? 'bg-accent-purple text-white'
                : 'bg-white/20 text-gray-300 hover:bg-white/30'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-accent-cyan text-white'
                : 'bg-white/20 text-gray-300 hover:bg-white/30'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-purple to-accent-cyan opacity-50"></div>
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline node */}
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full border-4 border-white bg-gradient-to-r from-accent-purple to-accent-cyan shadow-lg"></div>
                
                {/* Content */}
                <div className="ml-16 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">{item.year}</h4>
                    <span className="text-sm text-gray-400">{item.years.toFixed(1)} years</span>
                  </div>
                  
                  {item.level ? (
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                        style={{ backgroundColor: getLevelColor(item.level) }}
                      >
                        {getLevelIcon(item.level.level)}
                      </div>
                      <div>
                        <h5 className="font-medium text-white">{item.level.level}</h5>
                        <p className="text-sm text-gray-300">{item.level.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400">No level data available</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 border border-white/20 cursor-pointer"
              onClick={() => setSelectedYear(selectedYear === item.year ? null : item.year)}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{item.year}</div>
                <div className="text-sm text-gray-400 mb-2">{item.years.toFixed(1)}y</div>
                
                {item.level ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundColor: getLevelColor(item.level) }}
                    >
                      {getLevelIcon(item.level.level)}
                    </div>
                    <div className="text-xs text-center">
                      <div className="font-medium text-white">{item.level.level}</div>
                      {selectedYear === item.year && (
                        <div className="text-gray-300 mt-1 text-xs">{item.level.description}</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-xs">No level</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="mt-8 flex items-center justify-between text-sm text-gray-400 border-t border-white/20 pt-4">
        <span>Total years tracked: {timeline.length}</span>
        <div className="flex items-center space-x-4">
          <span><Target className="w-4 h-4 inline mr-1" /> Auto-calculated levels</span>
          <span><Award className="w-4 h-4 inline mr-1" /> Real-time updates</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
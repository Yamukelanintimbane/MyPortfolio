import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useExperience } from '../../hooks/UseExperience';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const ExperienceLevelManager = () => {
  const { user } = useAuth();
  const { levels, updateExperienceLevels, loading } = useExperience();
  const [editingLevel, setEditingLevel] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);

  const defaultLevels = [
    { level: 'Intern', minYears: 0, maxYears: 0.5, color: '#94a3b8', icon: 'User', description: 'Entry-level position with basic understanding of industry practices' },
    { level: 'Junior', minYears: 0.6, maxYears: 2, color: '#3b82f6', icon: 'User', description: 'Developing technical skills with guidance from senior team members' },
    { level: 'Mid-Level', minYears: 2.1, maxYears: 5, color: '#22c55e', icon: 'Briefcase', description: 'Independent contributor with solid technical expertise and problem-solving skills' },
    { level: 'Senior', minYears: 5.1, maxYears: 10, color: '#f59e0b', icon: 'Briefcase', description: 'Experienced professional who mentors others and drives technical decisions' },
    { level: 'Lead', minYears: 10.1, maxYears: 15, color: '#ef4444', icon: 'Shield', description: 'Technical leader who shapes architecture and guides team direction' },
    { level: 'Principal', minYears: 15.1, maxYears: 25, color: '#a855f7', icon: 'Crown', description: 'Industry expert who influences technology strategy and innovation' },
    { level: 'Architect', minYears: 25.1, maxYears: 999, color: '#06b6d4', icon: 'Building', description: 'Visionary leader who designs complex systems and drives organizational change' }
  ];

  const handleEdit = (level) => {
    setEditingLevel(level._id);
    setFormData({ ...level });
    setErrors([]);
  };

  const handleSave = async () => {
    try {
      // Validate form data
      const validationErrors = [];
      
      if (!formData.level) validationErrors.push('Level name is required');
      if (formData.minYears < 0) validationErrors.push('Minimum years must be 0 or greater');
      if (formData.maxYears < formData.minYears) validationErrors.push('Maximum years must be greater than minimum years');
      if (!formData.color) validationErrors.push('Color is required');
      if (!formData.description) validationErrors.push('Description is required');

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Update the levels array with the edited level
      const updatedLevels = levels.map(level => 
        level._id === editingLevel ? { ...formData } : level
      );

      await updateExperienceLevels(updatedLevels);
      setEditingLevel(null);
      setFormData({});
      setErrors([]);
    } catch (err) {
      setErrors([err.message || 'Failed to update experience level']);
    }
  };

  const handleCancel = () => {
    setEditingLevel(null);
    setFormData({});
    setErrors([]);
  };

  const handleResetToDefault = async () => {
    try {
      await updateExperienceLevels(defaultLevels);
      setErrors([]);
    } catch (err) {
      setErrors([err.message || 'Failed to reset to default levels']);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
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

  if (!user) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-red-400">
        <p>You must be logged in to manage experience levels.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Experience Level Management</h2>
          <p className="text-gray-400">Configure experience level thresholds and descriptions</p>
        </div>
        <button
          onClick={handleResetToDefault}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Reset to Default
        </button>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mb-4 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          {errors.map((error, index) => (
            <p key={index} className="text-red-400 text-sm">{error}</p>
          ))}
        </div>
      )}

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level) => (
          <motion.div
            key={level._id}
            className="bg-white/5 rounded-lg p-4 border border-white/20 hover:bg-white/10 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {editingLevel === level._id ? (
              /* Edit Mode */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Edit {level.level}</h3>
                  <div className="flex space-x-2">
                    <button onClick={handleSave} className="p-1 text-green-400 hover:text-green-300">
                      <Save className="w-5 h-5" />
                    </button>
                    <button onClick={handleCancel} className="p-1 text-red-400 hover:text-red-300">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Min Years</label>
                    <input
                      type="number"
                      value={formData.minYears || ''}
                      onChange={(e) => handleChange('minYears', parseFloat(e.target.value))}
                      className="w-full px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-sm"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Max Years</label>
                    <input
                      type="number"
                      value={formData.maxYears || ''}
                      onChange={(e) => handleChange('maxYears', parseFloat(e.target.value))}
                      className="w-full px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-sm"
                      step="0.1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Color</label>
                  <input
                    type="color"
                    value={formData.color || '#667eea'}
                    onChange={(e) => handleChange('color', e.target.value)}
                    className="w-full h-8 rounded border border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-sm"
                    rows="3"
                  />
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundColor: level.color }}
                    >
                      {getLevelIcon(level.level)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{level.level}</h3>
                      <p className="text-xs text-gray-400">{level.minYears} - {level.maxYears} years</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(level)}
                      className="p-1 text-blue-400 hover:text-blue-300"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300">{level.description}</p>
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Color: {level.color}</span>
                  <span>Icon: {level.icon}</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <h4 className="font-semibold text-blue-400 mb-2">Configuration Guidelines:</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Ensure no overlapping year ranges between levels</li>
          <li>• Use descriptive level names that reflect professional growth</li>
          <li>• Choose colors that represent the level's significance</li>
          <li>• Provide clear descriptions of what each level represents</li>
          <li>• Changes are applied automatically and affect all users</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceLevelManager;
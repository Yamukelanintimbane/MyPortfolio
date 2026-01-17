import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Send, 
  User, 
  Briefcase,
  Building,
  CheckCircle,
  X
} from 'lucide-react';

const TestimonialForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    project: '',
    rating: 0,
    testimonial: '',
    website: '',
    linkedin: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRating = (rating) => {
    setFormData({
      ...formData,
      rating
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit(formData);
      }
    }, 2000);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => handleRating(index + 1)}
        className={`text-2xl transition-colors ${
          index < formData.rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-600 hover:text-yellow-300'
        }`}
      >
        <Star size={28} />
      </button>
    ));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-400 mb-6">
          Your testimonial has been submitted successfully. I truly appreciate you taking the time to share your experience.
        </p>
        <button
          onClick={onClose}
          className="bg-accent-purple text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors"
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Share Your Experience</h3>
          <p className="text-gray-400">Help others by sharing your feedback</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Your Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-dark-400 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Your Position *
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full bg-dark-400 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="e.g., CEO, Project Manager"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Company/Organization
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-dark-400 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="Your company name"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Project We Worked On *
            </label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
              className="w-full bg-dark-400 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
              placeholder="e.g., Website Redesign, App Development"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-4">
            How would you rate your experience? *
          </label>
          <div className="flex justify-center space-x-2">
            {renderStars()}
          </div>
          <div className="text-center text-gray-400 text-sm mt-2">
            {formData.rating > 0 ? `${formData.rating}.0/5.0` : 'Select your rating'}
          </div>
        </div>

        {/* Testimonial */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Your Testimonial *
          </label>
          <textarea
            name="testimonial"
            value={formData.testimonial}
            onChange={handleChange}
            required
            rows="6"
            className="w-full bg-dark-400 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors resize-none"
            placeholder="Tell us about your experience working together. What did you appreciate most? What were the results?"
          />
        </div>

        {/* Optional Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Website (Optional)
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full bg-dark-400 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              LinkedIn (Optional)
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full bg-dark-400 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || formData.rating === 0}
          className="w-full bg-accent-purple text-white py-4 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Submit Testimonial</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default TestimonialForm;
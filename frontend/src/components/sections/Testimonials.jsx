import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        setTestimonials(data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const handleTestimonialClick = (testimonial) => {
    trackEvent('testimonial_interaction', {
      testimonial_id: testimonial._id,
      client_name: testimonial.clientName
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-dark-600 to-dark-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Client Testimonials</h2>
            <div className="w-24 h-1 bg-accent-purple mx-auto"></div>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-purple"></div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-dark-600 to-dark-700">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Client Testimonials</h2>
            <p className="text-gray-400">No testimonials yet. Be the first to share your experience!</p>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials.length > 0 ? testimonials[currentIndex] : null;

  return (
    <section className="py-20 bg-gradient-to-br from-dark-600 to-dark-700 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-purple rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-cyan rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Client Testimonials
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
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {currentTestimonial ? (
            <motion.div
              key={currentTestimonial._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20"
              onClick={() => handleTestimonialClick(currentTestimonial)}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {currentTestimonial.clientName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{currentTestimonial.clientName}</h3>
                    <p className="text-gray-300">{currentTestimonial.company}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-accent-purple/50 absolute -top-2 -left-2" />
                <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed pl-6 border-l-4 border-accent-purple/50">
                  "{currentTestimonial.content}"
                </blockquote>
              </div>

              <div className="mt-6 text-sm text-gray-400">
                {currentTestimonial.createdAt ? new Date(currentTestimonial.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Date not available'}
              </div>
            </motion.div>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 text-center">
              <p className="text-gray-400">No testimonials available at the moment.</p>
            </div>
          )}

          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <>
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-accent-purple w-8' : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {isAutoPlaying ? 'Pause' : 'Resume'} Auto-Play
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
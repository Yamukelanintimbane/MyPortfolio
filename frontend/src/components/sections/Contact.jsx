import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '../../contexts/MobileContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  CheckCircle,
  Clock,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

const Contact = ({ onSectionChange }) => {
  const { isMobile } = useMobile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Me',
      value: 'yamukelanintimbane@gmail.com',
      action: 'mailto:yamukelanintimbane@gmail.com',
      description: 'I\'ll respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Me',
      value: '+27 71 737 7666',
      action: 'tel:+27717377666',
      description: 'Mon-Fri from 9am-6pm'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Durban, South Africa',
      action: '#',
      description: 'Available for remote work worldwide'
    }
  ];

  const contactTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'hire', label: 'Hire Me' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'support', label: 'Support' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-dark-400">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8"
          >
            <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Message Sent Successfully!
            </h3>
            <p className="text-gray-400 mb-6">
              Thank you for reaching out! I've received your message and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-accent-purple text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-dark-400">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to start your project? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.action}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 glass rounded-2xl hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center group-hover:bg-accent-purple/30 transition-colors">
                    <method.icon size={24} className="text-accent-purple" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{method.title}</h4>
                    <p className="text-accent-purple font-medium">{method.value}</p>
                    <p className="text-gray-400 text-sm">{method.description}</p>
                  </div>
                  <ExternalLink size={18} className="text-gray-400" />
                </motion.a>
              ))}
            </div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Clock size={24} className="text-accent-purple" />
                <h4 className="text-white font-semibold">Quick Response Time</h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                I typically respond to all inquiries within 24 hours. For urgent matters, 
                feel free to call me directly at +27 71 737 7666.
              </p>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle size={24} className="text-green-400" />
                <h4 className="text-white font-semibold">Currently Available</h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                I'm currently available for new projects and would love to hear about your ideas. 
                Let's schedule a call to discuss how we can work together.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-500 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-500 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Subject & Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-500 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-dark-500 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple transition-colors"
                  >
                    {contactTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full bg-dark-500 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors resize-none"
                  placeholder="Tell me about your project, timeline, and budget..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-purple text-white py-4 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-gray-400 text-sm text-center">
                Your information is secure and will only be used to respond to your inquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
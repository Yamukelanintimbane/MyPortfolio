import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '../../contexts/MobileContext';
import { hireAPI } from '../../utils/api';
import {
  Check,
  Star,
  Clock,
  MessageCircle,
  Zap,
  Shield,
  TrendingUp,
  Calculator,
  Calendar,
  DollarSign,
  Users,
  Award,
  Code2,
  Rocket,
  Send,
  CheckCircle
} from 'lucide-react';

const HireMe = ({ onSectionChange }) => {
  const { isMobile } = useMobile();
  const [selectedPackage, setSelectedPackage] = useState('pro');
  const [budget, setBudget] = useState('5000-15000');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'R5,000 - R15,000',
      description: 'Perfect for small projects and MVPs',
      features: [
        'Up to 5 pages',
        'Mobile-responsive design',
        'Contact form integration',
        'Basic SEO optimization',
        '2 rounds of revisions',
        '2-week delivery',
        '1 month support',
        'Google Analytics setup'
      ],
      bestFor: 'Startups, Personal brands, Small businesses',
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 'R15,000 - R45,000',
      description: 'Ideal for growing businesses and web applications',
      features: [
        'Up to 15 pages',
        'Advanced responsive design',
        'Database integration',
        'User authentication system',
        'Payment gateway setup',
        '5 rounds of revisions',
        '3-4 weeks delivery',
        '3 months support',
        'Advanced SEO',
        'Performance optimization',
        'Admin dashboard'
      ],
      bestFor: 'E-commerce, SMEs, Web Applications',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'R45,000 - R150,000+',
      description: 'Complete solutions for large-scale applications',
      features: [
        'Unlimited pages & features',
        'Custom web application',
        'Advanced database architecture',
        'REST API development',
        'Real-time features',
        'Multi-user systems',
        'Unlimited revisions',
        '6-8 weeks delivery',
        '6 months support',
        'Full-stack development',
        'DevOps & Deployment',
        'Third-party integrations',
        'Advanced security features'
      ],
      bestFor: 'Corporates, Complex web apps, Scalable startups',
      popular: false
    }
  ];

  const services = [
    {
      icon: Zap,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      features: ['React/Next.js', 'Node.js/Express', 'MongoDB/PostgreSQL', 'Responsive Design']
    },
    {
      icon: TrendingUp,
      title: 'E-commerce Solutions',
      description: 'Online stores with secure payment processing and inventory management',
      features: ['Product catalogs', 'Payment integration', 'Order management', 'Admin dashboard']
    },
    {
      icon: Users,
      title: 'Business Websites',
      description: 'Professional websites designed to grow your business online',
      features: ['SEO optimized', 'Fast loading', 'Mobile-friendly', 'Easy to manage']
    },
    {
      icon: Shield,
      title: 'API & Backend',
      description: 'Secure and scalable backend systems for your applications',
      features: ['RESTful APIs', 'Authentication', 'Database design', 'Cloud deployment']
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Discovery Call',
      description: 'Free consultation to understand your needs and project scope',
      icon: MessageCircle
    },
    {
      step: 2,
      title: 'Project Planning',
      description: 'Detailed proposal, timeline, and cost breakdown',
      icon: Calendar
    },
    {
      step: 3,
      title: 'Development',
      description: 'Agile development with regular updates and feedback sessions',
      icon: Code2
    },
    {
      step: 4,
      title: 'Launch & Support',
      description: 'Deployment, training, and ongoing maintenance support',
      icon: Rocket
    }
  ];

  const budgetOptions = [
    { value: '5000-15000', label: 'R5k - R15k' },
    { value: '15000-45000', label: 'R15k - R45k' },
    { value: '45000-150000', label: 'R45k - R150k' },
    { value: '150000+', label: 'R150k+' },
    { value: 'custom', label: 'Custom Quote' }
  ];

  const successStories = [
    {
      metric: '50+',
      description: 'Projects Completed'
    },
    {
      metric: '100%',
      description: 'Client Satisfaction'
    },
    {
      metric: '98%',
      description: 'On-Time Delivery'
    },
    {
      metric: 'R2M+',
      description: 'Client Revenue Generated'
    }
  ];

  // Function to handle getting a quote
  const handleGetQuote = (packageType = null, customBudget = null) => {
    setIsSubmitting(true);
    
    // Prepare the data to pass to contact form
    const quoteData = {
      budget: customBudget || budget,
      package: packageType || selectedPackage,
      timestamp: new Date().toISOString(),
      type: 'quote'
    };
    
    // Store in localStorage for the contact form to access
    localStorage.setItem('quoteRequest', JSON.stringify(quoteData));
    
    // Navigate to contact section after a brief delay for smooth transition
    setTimeout(() => {
      onSectionChange('contact');
      setIsSubmitting(false);
    }, 500);
  };

  // Function to handle scheduling a call
  const handleScheduleCall = () => {
    setIsSubmitting(true);
    
    const callData = {
      budget: budget,
      package: selectedPackage,
      timestamp: new Date().toISOString(),
      type: 'call'
    };
    
    localStorage.setItem('callRequest', JSON.stringify(callData));
    
    setTimeout(() => {
      onSectionChange('contact');
      setIsSubmitting(false);
    }, 500);
  };

  // Function to get budget label
  const getBudgetLabel = (value) => {
    const option = budgetOptions.find(opt => opt.value === value);
    return option ? option.label : 'Custom Quote';
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const hireData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        budget: formData.budget || budget,
        timeline: formData.timeline || 'ASAP'
      };

      const response = await hireAPI.submit(hireData);
      
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', budget: '', timeline: '' });
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowModal(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting hire request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open modal with package info
  const openHireModal = (packageType = null, packageBudget = null) => {
    setFormData(prev => ({
      ...prev,
      budget: packageBudget || budget,
      message: packageType ? `Interested in the ${packageType} package` : ''
    }));
    setShowModal(true);
  };

  return (
    <section id="hire" className="py-20 bg-dark-500">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Let's Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Affordable web development solutions tailored for South African businesses
          </p>
          
          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-accent-purple mb-1">
                  {story.metric}
                </div>
                <div className="text-gray-400 text-sm">
                  {story.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Services I Offer
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-accent-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-purple/30 transition-colors">
                  <service.icon size={32} className="text-accent-purple" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{service.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <div className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-gray-300 text-sm">
                      <Check size={14} className="text-green-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Packages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Transparent Pricing
          </h3>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
            No hidden costs. All packages include hosting setup, domain configuration, and basic SEO.
          </p>
          
          {/* Package Selector */}
          <div className="flex justify-center mb-8">
            <div className="glass rounded-2xl p-2 flex space-x-2">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedPackage === pkg.id
                      ? 'bg-accent-purple text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {pkg.name}
                </button>
              ))}
            </div>
          </div>

          {/* Package Details */}
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-2xl p-6 relative ${
                  pkg.popular ? 'ring-2 ring-accent-purple transform scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-white mb-2">{pkg.name}</h4>
                  <div className="text-3xl font-bold text-accent-purple mb-2">{pkg.price}</div>
                  <p className="text-gray-400 text-sm">{pkg.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Check size={18} className="text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-4">
                    <strong>Perfect for:</strong> {pkg.bestFor}
                  </p>
                  <button
                    onClick={() => {
                      // Set budget based on package and open modal
                      const packageBudget = pkg.id === 'starter' ? '5000-15000' :
                                            pkg.id === 'pro' ? '15000-45000' : '45000-150000';
                      openHireModal(pkg.id, packageBudget);
                    }}
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                      pkg.popular
                        ? 'bg-accent-purple text-white hover:bg-purple-600 transform hover:scale-105'
                        : 'border border-gray-600 text-white hover:border-accent-purple hover:bg-accent-purple/10'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span>Start Project</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Simple 4-Step Process
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-accent-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-purple/30 transition-colors">
                    <step.icon size={32} className="text-accent-purple" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Budget Calculator CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-2xl p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 opacity-50"></div>
          <div className="relative max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-400 mb-6">
              Get a free project assessment and detailed quote within 24 hours
            </p>
            
            {/* Quick Budget Selector */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-3 text-lg">What's your budget range?</label>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setBudget(option.value)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      budget === option.value
                        ? 'bg-accent-purple text-white shadow-lg shadow-purple-500/25'
                        : 'glass text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {/* Selected Budget Display */}
              {budget && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-accent-purple font-semibold text-sm"
                >
                  ✓ Selected: {getBudgetLabel(budget)}
                </motion.div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openHireModal(null, budget)}
                disabled={isSubmitting}
                className={`bg-accent-purple text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'
                }`}
              >
                <Calculator size={20} />
                <span>Get Free Quote</span>
              </button>
              
              <button
                onClick={() => openHireModal(null, budget)}
                disabled={isSubmitting}
                className={`border border-accent-purple text-accent-purple px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-purple hover:text-white'
                }`}
              >
                <MessageCircle size={20} />
                <span>Schedule Call</span>
              </button>
            </div>
            
            <p className="text-gray-500 text-sm mt-4">
              All quotes include VAT • Flexible payment plans available
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Hire Me Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Hire Me</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            {!submitStatus ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-dark-500 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple"
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
                      onChange={handleInputChange}
                      required
                      className="w-full bg-dark-500 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-dark-500 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple"
                  >
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>{
                        option.label
                      }</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full bg-dark-500 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple"
                  >
                    <option value="ASAP">As soon as possible</option>
                    <option value="1-3 weeks">1-3 weeks</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3+ months">3+ months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full bg-dark-500 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple resize-none"
                    placeholder="Tell me about your project, requirements, and any specific details..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
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
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </form>
            ) : submitStatus === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Request Submitted!</h3>
                <p className="text-gray-400 mb-6">
                  Thank you for your interest! I'll review your request and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-accent-purple text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-red-400 text-2xl">!</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Submission Failed</h3>
                <p className="text-gray-400 mb-6">
                  There was an error submitting your request. Please try again.
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
     </section>
   );
 };

export default HireMe;

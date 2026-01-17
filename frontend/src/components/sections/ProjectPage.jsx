import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../../hooks/UseProjects';
import ProjectModal from '../ui/ProjectModal';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorBoundary from '../ui/ErrorBoundary';
import useSEO from '../../hooks/UseSEO';

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // SEO configuration for the project page
  const seoData = {
    title: projectId 
      ? `${projects.find(p => p._id === projectId)?.title || 'Project'} - Yamukelani Ntimbane` 
      : "Projects - Yamukelani Ntimbane",
    description: projectId 
      ? projects.find(p => p._id === projectId)?.description || "View this project from Yamukelani Ntimbane's portfolio"
      : "Explore Yamukelani Ntimbane's portfolio of web development projects, showcasing expertise in modern web technologies.",
    keywords: "Yamukelani Ntimbane, portfolio, projects, web development, React projects, Node.js projects",
    canonical: projectId 
      ? `https://yamukelanintimbane.com/projects/${projectId}`
      : "https://yamukelanintimbane.com/projects"
  };

  useSEO(seoData);

  useEffect(() => {
    if (projectId && projects.length > 0) {
      const project = projects.find(p => p._id === projectId);
      if (project) {
        setSelectedProject(project);
        setIsModalOpen(true);
      } else {
        // Project not found, redirect to projects list
        navigate('/projects', { replace: true });
      }
    }
  }, [projectId, projects, navigate]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    navigate(`/projects/${project._id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      navigate('/projects', { replace: true });
    }, 300);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Error Loading Projects</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-accent-purple hover:bg-accent-pink text-white px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-dark-500">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-600 via-dark-700 to-dark-800"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6"
              >
                Our <span className="text-accent-purple">Projects</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Explore our portfolio of innovative web solutions and digital experiences crafted with cutting-edge technologies.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="bg-dark-600 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-dark-500">
                      {/* Project Image */}
                      <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                        {project.imageUrl ? (
                          <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <span className="text-4xl">🖼️</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-accent-purple/20 text-accent-purple px-3 py-1 rounded-full text-sm font-medium">
                            {project.category || 'Web Development'}
                          </span>
                          <span className="text-gray-400 text-sm">{project.year}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="bg-dark-500 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies && project.technologies.length > 4 && (
                            <span className="bg-dark-500 text-gray-300 px-2 py-1 rounded text-xs">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        {/* View Project Button */}
                        <div className="mt-6 flex items-center justify-between">
                          <button className="bg-accent-purple hover:bg-accent-pink text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                            View Project
                          </button>
                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-purple hover:text-accent-pink text-sm font-medium transition-colors"
                            >
                              Live Demo →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No projects available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Project Modal */}
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      </div>
    </ErrorBoundary>
  );
};

export default ProjectPage;
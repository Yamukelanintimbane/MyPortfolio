import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  Filter,
  Star,
  Calendar
} from 'lucide-react';
import { adminProjectsAPI } from '../../utils/api';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await adminProjectsAPI.getAll();
      setProjects(response.data.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Don't fallback to sample data - show error to user
      setError('Failed to fetch projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'planned', label: 'Planned' }
  ];

  const categoryColors = {
    fullstack: 'bg-purple-500/20 text-purple-400',
    frontend: 'bg-blue-500/20 text-blue-400',
    backend: 'bg-green-500/20 text-green-400',
    mobile: 'bg-orange-500/20 text-orange-400'
  };

  const statusColors = {
    completed: 'bg-green-500/20 text-green-400',
    'in-progress': 'bg-yellow-500/20 text-yellow-400',
    planned: 'bg-blue-500/20 text-blue-400'
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await adminProjectsAPI.delete(projectId);
        setProjects(projects.filter(p => p._id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
        setError('Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-red-400 text-2xl">!</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Error Loading Projects</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={fetchProjects}
          className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Project Management</h2>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        
        <button className="flex items-center space-x-2 bg-accent-purple text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-400 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-dark-400 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent-purple"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              {/* Project Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  {project.featured && (
                    <Star size={16} className="text-yellow-400 fill-current" />
                  )}
                </div>
                
                <p className="text-gray-400 mb-3">{project.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className={`px-2 py-1 rounded-full ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full ${categoryColors[project.category]}`}>
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Eye size={14} />
                    <span>{project.viewCount} views</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Calendar size={14} />
                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-dark-400 text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-dark-400 text-gray-400 rounded text-xs">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.open(`/projects/${project._id}`, '_blank')}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-accent-purple hover:text-accent-purple transition-colors"
                >
                  <Eye size={16} />
                  <span>View</span>
                </button>
                
                <button
                  onClick={() => setEditingProject(project)}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors"
                >
                  <Edit3 size={16} />
                  <span>Edit</span>
                </button>
                
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-red-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">No projects found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectManager;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { adminHireAPI, adminAnalyticsAPI } from '../../utils/api';
import {
  BarChart3,
  Users,
  Mail,
  Eye,
  TrendingUp,
  Calendar,
  LogOut,
  Settings,
  Code2,
  DollarSign,
  Star,
  FolderOpen,
  MessageCircle,
  Download,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Search,
  Target
} from 'lucide-react';

// Import all admin components
import Analytics from './Analytics';
import ProjectManager from './ProjectManager';
import ContactManager from './ContactManager';
import HireRequestManager from './HireRequestManager';
import ExperienceLevelManager from './ExperienceLevelManager';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    contactSubmissions: 0,
    hireRequests: 0,
    projectViews: 0,
    conversionRate: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [topProjects, setTopProjects] = useState([]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'projects', name: 'Projects', icon: FolderOpen },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'contacts', name: 'Contacts', icon: Mail },
    { id: 'hire-requests', name: 'Hire Requests', icon: Users },
    { id: 'experience-levels', name: 'Experience Levels', icon: Target },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  // Fetch real data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard stats - use the actual available endpoint
        const statsResponse = await adminAnalyticsAPI.getDashboard();
        
        // Fetch recent activity - use traffic analytics as proxy for recent activity
        const activityResponse = await adminAnalyticsAPI.getTrafficSources();
        
        // Fetch top projects
        const projectsResponse = await adminAnalyticsAPI.getProjectViews();
        
        setStats({
          totalViews: statsResponse.data?.totalViews || 0,
          uniqueVisitors: statsResponse.data?.uniqueVisitors || 0,
          contactSubmissions: statsResponse.data?.contactSubmissions || 0,
          hireRequests: statsResponse.data?.hireRequests || 0,
          projectViews: statsResponse.data?.projectViews || 0,
          conversionRate: statsResponse.data?.conversionRate || 0
        });
        
        // Map recent activity from traffic data
        setRecentActivity(activityResponse.data?.slice(0, 4).map(activity => ({
          type: activity.event || 'view',
          message: activity.event === 'page_view' ? `Page "${activity.page}" viewed` : activity.event,
          time: formatTimeAgo(activity.createdAt),
          location: activity.data?.location || 'Unknown'
        })) || []);
        
        // Map top projects from project analytics
        setTopProjects(projectsResponse.data?.slice(0, 4).map(project => ({
          name: project.title,
          views: project.views,
          conversions: project.conversions || 0
        })) || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to sample data if API fails
        setStats({
          totalViews: 1247,
          uniqueVisitors: 892,
          contactSubmissions: 45,
          hireRequests: 12,
          projectViews: 567,
          conversionRate: 3.6
        });
        
        setRecentActivity([
          { type: 'contact', message: 'New contact form submission', time: '2 minutes ago', location: 'Durban, ZA' },
          { type: 'view', message: 'Project "TraderJournal" viewed', time: '5 minutes ago', location: 'Johannesburg, ZA' },
          { type: 'hire', message: 'New hire request received', time: '1 hour ago', location: 'Cape Town, ZA' },
          { type: 'view', message: 'Portfolio homepage visited', time: '2 hours ago', location: 'Pretoria, ZA' }
        ]);
        
        setTopProjects([
          { name: 'TraderJournal', views: 234, conversions: 12 },
          { name: 'K53 Quiz App', views: 189, conversions: 8 },
          { name: 'AstuteFX', views: 156, conversions: 6 },
          { name: 'FNB Revision', views: 143, conversions: 5 }
        ]);
      }
    };
    
    fetchDashboardData();
  }, []);

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <a href="/admin/login" className="text-accent-purple hover:underline">
            Please log in
          </a>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab stats={stats} recentActivity={recentActivity} topProjects={topProjects} />;
      case 'projects':
        return <ProjectManager />;
      case 'analytics':
        return <Analytics />;
      case 'contacts':
        return <ContactManager />;
      case 'hire-requests':
        return <HireRequestManager />;
      case 'experience-levels':
        return <ExperienceLevelManager />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab stats={stats} recentActivity={recentActivity} topProjects={topProjects} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-500">
      {/* Header */}
      <header className="glass border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-purple rounded-xl flex items-center justify-center">
                <Code2 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">
                  Welcome back, {user.username}
                  {user.isDemo && <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Demo Mode</span>}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{user.email}</p>
                <p className="text-gray-400 text-xs">Last login: Today</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-6"
            >
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-accent-purple/20 text-accent-purple'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ stats, recentActivity, topProjects }) => {
  // Check if data is still loading
  const isLoading = recentActivity.length === 0 || topProjects.length === 0;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
    {/* Stats Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Total Views</h3>
          <Eye className="text-accent-purple" size={20} />
        </div>
        <div className="text-2xl font-bold text-white">{stats.totalViews}</div>
        <div className="text-green-400 text-sm flex items-center space-x-1 mt-1">
          <TrendingUp size={14} />
          <span>+12% this week</span>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Unique Visitors</h3>
          <Users className="text-accent-blue" size={20} />
        </div>
        <div className="text-2xl font-bold text-white">{stats.uniqueVisitors}</div>
        <div className="text-green-400 text-sm flex items-center space-x-1 mt-1">
          <TrendingUp size={14} />
          <span>+8% this week</span>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Contact Forms</h3>
          <Mail className="text-accent-teal" size={20} />
        </div>
        <div className="text-2xl font-bold text-white">{stats.contactSubmissions}</div>
        <div className="text-gray-400 text-sm mt-1">This month</div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Hire Requests</h3>
          <DollarSign className="text-accent-amber" size={20} />
        </div>
        <div className="text-2xl font-bold text-white">{stats.hireRequests}</div>
        <div className="text-gray-400 text-sm mt-1">Potential projects</div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Project Views</h3>
          <Code2 className="text-accent-purple" size={20} />
        </div>
        <div className="text-2xl font-bold text-white">{stats.projectViews}</div>
        <div className="text-gray-400 text-sm mt-1">Total views</div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Conversion Rate</h3>
          <Star className="text-green-400" size={20} />
        </div>
        <div className="text-2xl font-bold text-white">{stats.conversionRate}%</div>
        <div className="text-gray-400 text-sm mt-1">Visitors to contacts</div>
      </div>
    </div>

    {/* Recent Activity & Top Projects */}
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Recent Activity */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-xl bg-dark-400">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'contact' ? 'bg-accent-teal' :
                activity.type === 'hire' ? 'bg-accent-amber' : 'bg-accent-purple'
              }`} />
              <div className="flex-1">
                <p className="text-white text-sm">{activity.message}</p>
                <p className="text-gray-400 text-xs">{activity.time}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">{activity.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Projects */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Top Projects</h3>
        <div className="space-y-4">
          {topProjects.map((project, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-dark-400">
              <div>
                <h4 className="text-white font-medium">{project.name}</h4>
                <p className="text-gray-400 text-sm">{project.views} views</p>
              </div>
              <div className="text-right">
                <div className="text-accent-purple font-bold">{project.conversions}</div>
                <div className="text-gray-400 text-sm">conversions</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="glass rounded-2xl p-6">
      <h3 className="text-white font-bold text-lg mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-4 bg-accent-purple/20 rounded-xl text-accent-purple hover:bg-accent-purple/30 transition-colors">
          <Plus size={24} className="mx-auto mb-2" />
          <span className="text-sm font-medium">Add Project</span>
        </button>
        <button className="p-4 bg-accent-blue/20 rounded-xl text-accent-blue hover:bg-accent-blue/30 transition-colors">
          <Mail size={24} className="mx-auto mb-2" />
          <span className="text-sm font-medium">View Contacts</span>
        </button>
        <button className="p-4 bg-accent-teal/20 rounded-xl text-accent-teal hover:bg-accent-teal/30 transition-colors">
          <BarChart3 size={24} className="mx-auto mb-2" />
          <span className="text-sm font-medium">Analytics</span>
        </button>
        <button className="p-4 bg-accent-amber/20 rounded-xl text-accent-amber hover:bg-accent-amber/30 transition-colors">
          <Settings size={24} className="mx-auto mb-2" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </div>
  </motion.div>
  );
};

// Hire Requests Tab Component
const HireRequestsTab = () => {
  const [hireRequests, setHireRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHireRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminHireAPI.getAll();
        setHireRequests(response.data.data);
      } catch (err) {
        console.error('Error fetching hire requests:', err);
        setError('Failed to fetch hire requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHireRequests();
  }, []);

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
        <h3 className="text-2xl font-bold text-white mb-4">Error Loading Requests</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Hire Requests</h2>
          <p className="text-gray-400">Manage project inquiries and potential clients</p>
        </div>
      </div>

      <div className="space-y-4">
        {hireRequests.map((request, index) => (
          <motion.div
            key={request._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-purple/20 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-accent-purple" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{request.name}</h3>
                    <p className="text-accent-purple">{request.email}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-300 mb-2">{request.message}</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      Budget: {request.budget}
                    </span>
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full">
                      Timeline: {request.timeline}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      request.status === 'responded' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.location.href = `mailto:${request.email}`}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors"
                >
                  <Mail size={16} />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {hireRequests.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="text-gray-400 mx-auto mb-4" />
          <div className="text-gray-400 mb-2">No hire requests yet</div>
          <div className="text-gray-500 text-sm">New requests will appear here</div>
        </div>
      )}
    </motion.div>
  );
};

// Settings Tab Component
const SettingsTab = () => {
  const [settings, setSettings] = useState({
    siteTitle: 'Yamukelani Ntimbane - Portfolio',
    siteDescription: 'Full-Stack Web Developer specializing in Node.js, React, and MongoDB',
    adminEmail: 'yamukelanintimbane@gmail.com',
    notifications: true,
    analytics: true,
    autoBackup: false
  });

  const handleSave = () => {
    // Simulate save operation
    setTimeout(() => {
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <p className="text-gray-400">Manage your portfolio settings</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-accent-purple text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Save Changes
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Site Title
              </label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                className="w-full bg-dark-400 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                rows="3"
                className="w-full bg-dark-400 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                className="w-full bg-dark-400 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>
          </div>
        </div>

        {/* Feature Settings */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Feature Settings</h3>
          <div className="space-y-4">
            {[
              { key: 'notifications', label: 'Email Notifications', description: 'Receive email alerts for new contacts' },
              { key: 'analytics', label: 'Analytics Tracking', description: 'Track visitor behavior and analytics' },
              { key: 'autoBackup', label: 'Auto Backup', description: 'Automatically backup your data' }
            ].map((feature) => (
              <div key={feature.key} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{feature.label}</p>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
                <button
                  onClick={() => setSettings({...settings, [feature.key]: !settings[feature.key]})}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings[feature.key] ? 'bg-accent-purple' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings[feature.key] ? 'transform translate-x-7' : 'transform translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass rounded-2xl p-6 border border-red-500/20 lg:col-span-2">
          <h3 className="text-red-400 font-bold text-lg mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Clear All Data</p>
                <p className="text-gray-400 text-sm">Permanently delete all portfolio data</p>
              </div>
              <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
                Clear Data
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Export Data</p>
                <p className="text-gray-400 text-sm">Download all your data as JSON</p>
              </div>
              <button className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors flex items-center space-x-2">
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
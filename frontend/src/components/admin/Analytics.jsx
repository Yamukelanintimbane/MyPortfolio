import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  LineChart, 
  Users, 
  Eye, 
  TrendingUp, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { analyticsAPI, adminAnalyticsAPI } from '../../utils/api';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Fetch real data from admin analytics API using available endpoints
      const [dashboardResponse, trafficResponse, geoResponse, timelineResponse] = await Promise.all([
        adminAnalyticsAPI.getDashboard(),
        adminAnalyticsAPI.getTrafficAnalytics(),
        adminAnalyticsAPI.getGeoAnalytics(),
        adminAnalyticsAPI.getTimelineAnalytics()
      ]);
      
      // Map the response data to the expected format
      setAnalyticsData({
        overview: {
          totalViews: dashboardResponse.data?.totalViews || 0,
          uniqueVisitors: dashboardResponse.data?.uniqueVisitors || 0,
          bounceRate: 42, // This would need to be calculated from actual data
          avgSessionDuration: '2m 34s' // This would need to be calculated from actual data
        },
        pageViews: trafficResponse.data?.map(item => ({
          page: item.page || 'Unknown',
          views: item.count || 0
        })) || [],
        projectViews: dashboardResponse.data?.recentProjects?.map(project => ({
          name: project.title,
          views: project.views || 0
        })) || [],
        trafficSources: geoResponse.data?.map(geo => ({
          source: geo._id || 'Unknown',
          percentage: Math.round((geo.count / (geoResponse.data.reduce((sum, g) => sum + g.count, 0))) * 100)
        })) || [],
        timeline: timelineResponse.data?.map(day => ({
          date: `${day._id.month}/${day._id.day}`,
          views: day.count
        })) || []
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Fallback to sample data if API fails
      setAnalyticsData(sampleData);
    } finally {
      setLoading(false);
    }
  };

  // Sample data structure
  const sampleData = {
    overview: {
      totalViews: 1247,
      uniqueVisitors: 892,
      bounceRate: 42,
      avgSessionDuration: '2m 34s'
    },
    pageViews: [
      { page: 'Home', views: 456 },
      { page: 'Projects', views: 324 },
      { page: 'About', views: 287 },
      { page: 'Contact', views: 180 }
    ],
    projectViews: [
      { name: 'TraderJournal', views: 234 },
      { name: 'K53 Quiz App', views: 189 },
      { name: 'AstuteFX', views: 156 },
      { name: 'FNB Revision', views: 143 }
    ],
    trafficSources: [
      { source: 'Direct', percentage: 45 },
      { source: 'Social', percentage: 25 },
      { source: 'Search', percentage: 20 },
      { source: 'Referral', percentage: 10 }
    ],
    timeline: [
      { date: 'Jan 1', views: 120 },
      { date: 'Jan 2', views: 145 },
      { date: 'Jan 3', views: 132 },
      { date: 'Jan 4', views: 167 },
      { date: 'Jan 5', views: 189 },
      { date: 'Jan 6', views: 156 },
      { date: 'Jan 7', views: 178 }
    ]
  };

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div>
      </div>
    );
  }

  const data = analyticsData || sampleData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-gray-400">Track your portfolio performance</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Time Range Filter */}
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-dark-400 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-purple"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          
          <button className="flex items-center space-x-2 bg-accent-purple text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Total Views</h3>
            <Eye className="text-accent-purple" size={20} />
          </div>
          <div className="text-2xl font-bold text-white">{data.overview.totalViews}</div>
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
          <div className="text-2xl font-bold text-white">{data.overview.uniqueVisitors}</div>
          <div className="text-green-400 text-sm flex items-center space-x-1 mt-1">
            <TrendingUp size={14} />
            <span>+8% this week</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Bounce Rate</h3>
            <BarChart3 className="text-accent-teal" size={20} />
          </div>
          <div className="text-2xl font-bold text-white">{data.overview.bounceRate}%</div>
          <div className="text-red-400 text-sm flex items-center space-x-1 mt-1">
            <span>Need improvement</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Avg. Session</h3>
            <Calendar className="text-accent-amber" size={20} />
          </div>
          <div className="text-2xl font-bold text-white">{data.overview.avgSessionDuration}</div>
          <div className="text-green-400 text-sm flex items-center space-x-1 mt-1">
            <span>Good engagement</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Page Views */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Page Views</h3>
          <div className="space-y-3">
            {data.pageViews.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <span className="text-gray-300">{page.page}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-accent-purple h-2 rounded-full"
                      style={{ width: `${(page.views / data.pageViews[0].views) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{page.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Views */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Project Popularity</h3>
          <div className="space-y-3">
            {data.projectViews.map((project, index) => (
              <div key={project.name} className="flex items-center justify-between">
                <span className="text-gray-300">{project.name}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-accent-blue h-2 rounded-full"
                      style={{ width: `${(project.views / data.projectViews[0].views) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{project.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {data.trafficSources.map((source, index) => (
              <div key={source.source}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">{source.source}</span>
                  <span className="text-white font-medium">{source.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-accent-teal h-2 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Views Timeline</h3>
          <div className="flex items-end justify-between h-32">
            {data.timeline.map((day, index) => (
              <div key={day.date} className="flex flex-col items-center space-y-2">
                <div 
                  className="w-6 bg-accent-purple rounded-t-lg transition-all duration-300 hover:bg-purple-400"
                  style={{ height: `${(day.views / 200) * 100}%` }}
                ></div>
                <span className="text-gray-400 text-xs">{day.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Page View', page: 'Home', time: '2 minutes ago', location: 'Durban, ZA' },
            { action: 'Project View', page: 'TraderJournal', time: '5 minutes ago', location: 'Johannesburg, ZA' },
            { action: 'Contact Form', page: 'Submitted inquiry', time: '1 hour ago', location: 'Cape Town, ZA' },
            { action: 'Page View', page: 'Projects', time: '2 hours ago', location: 'Pretoria, ZA' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-dark-400">
              <div className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
                  activity.action.includes('View') ? 'bg-accent-purple' : 'bg-accent-teal'
                }`} />
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.page}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm">{activity.time}</p>
                <p className="text-gray-400 text-xs">{activity.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
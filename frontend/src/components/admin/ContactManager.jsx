import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Eye,
  Trash2,
  Reply,
  Search,
  Filter,
  Calendar,
  User,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { adminContactsAPI } from '../../utils/api';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      // Use real API
      const response = await adminContactsAPI.getAll();
      setContacts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to fetch contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'read', label: 'Read' },
    { value: 'replied', label: 'Replied' },
    { value: 'archived', label: 'Archived' }
  ];

  const statusColors = {
    new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    read: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    replied: 'bg-green-500/20 text-green-400 border-green-500/30',
    archived: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  };

  const typeColors = {
    general: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    hire: 'bg-green-500/20 text-green-400 border-green-500/30',
    collaboration: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    support: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  };

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      await adminContactsAPI.update(contactId, { status: newStatus });
      setContacts(contacts.map(contact =>
        contact._id === contactId ? { ...contact, status: newStatus } : contact
      ));
    } catch (error) {
      console.error('Error updating contact status:', error);
      setError('Failed to update contact status');
    }
  };

  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await adminContactsAPI.delete(contactId);
        setContacts(contacts.filter(contact => contact._id !== contactId));
      } catch (error) {
        console.error('Error deleting contact:', error);
        setError('Failed to delete contact');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />;
      case 'read': return <Eye size={14} className="text-gray-400" />;
      case 'replied': return <CheckCircle size={14} className="text-green-400" />;
      case 'archived': return <XCircle size={14} className="text-orange-400" />;
      default: return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
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
        <h3 className="text-2xl font-bold text-white mb-4">Error Loading Contacts</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={fetchContacts}
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
          <h2 className="text-2xl font-bold text-white">Contact Management</h2>
          <p className="text-gray-400">Manage contact form submissions ({contacts.length} total)</p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span>New: {contacts.filter(c => c.status === 'new').length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle size={12} className="text-green-400" />
            <span>Replied: {contacts.filter(c => c.status === 'replied').length}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search contacts by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-400 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-dark-400 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent-purple transition-colors"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedContact(contact)}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
              {/* Contact Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-accent-purple" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-semibold truncate">{contact.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[contact.status]}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(contact.status)}
                          <span>{contact.status}</span>
                        </div>
                      </span>
                    </div>
                    <p className="text-accent-purple truncate">{contact.email}</p>
                    <p className="text-white font-medium mt-2">{contact.subject}</p>
                    <p className="text-gray-400 text-sm line-clamp-2 mt-1">{contact.message}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className={`px-2 py-1 rounded-full border ${typeColors[contact.type]}`}>
                    {contact.type}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Calendar size={12} />
                    <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <span>{new Date(contact.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusUpdate(contact._id, contact.status === 'new' ? 'read' : 'new');
                  }}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors text-sm"
                >
                  <Eye size={14} />
                  <span>Mark {contact.status === 'new' ? 'Read' : 'New'}</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusUpdate(contact._id, 'replied');
                  }}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-green-500 hover:text-green-400 transition-colors text-sm"
                >
                  <Reply size={14} />
                  <span>Mark Replied</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(contact._id);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-red-500 hover:text-red-400 transition-colors text-sm"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <Mail size={48} className="text-gray-400 mx-auto mb-4" />
          <div className="text-gray-400 mb-2">
            {contacts.length === 0 ? 'No contacts yet' : 'No contacts match your filters'}
          </div>
          <div className="text-gray-500 text-sm">
            {contacts.length === 0 
              ? 'Contact form submissions will appear here' 
              : 'Try adjusting your search or filters'}
          </div>
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedContact(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-dark-400 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedContact.subject}</h3>
                  <p className="text-gray-400">From: {selectedContact.name}</p>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Type</label>
                    <span className={`px-2 py-1 rounded-full text-sm ${typeColors[selectedContact.type]}`}>
                      {selectedContact.type}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <span className={`px-2 py-1 rounded-full text-sm ${statusColors[selectedContact.status]}`}>
                      {selectedContact.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Received</label>
                    <p className="text-white">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Message</label>
                  <div className="bg-dark-500 rounded-lg p-4 mt-1">
                    <p className="text-white leading-relaxed">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedContact._id, 'replied');
                      setSelectedContact(null);
                    }}
                    className="flex-1 bg-accent-purple text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                  >
                    Mark as Replied
                  </button>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="flex-1 border border-gray-600 text-white py-3 rounded-lg font-semibold hover:border-gray-500 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactManager;
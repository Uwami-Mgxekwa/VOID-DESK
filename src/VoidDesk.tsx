import { useState } from 'react';
import { Search, User, Clock, AlertCircle, CheckCircle, XCircle, MessageSquare, MoreVertical, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';

export default function VoidDesk() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([
    { id: 'TK-1001', title: 'Login page not responding', customer: 'John Smith', priority: 'high', status: 'open', time: '5 min ago', messages: 3 },
    { id: 'TK-1002', title: 'Payment gateway error', customer: 'Sarah Johnson', priority: 'critical', status: 'in-progress', time: '12 min ago', messages: 7 },
    { id: 'TK-1003', title: 'Feature request: Dark mode', customer: 'Mike Chen', priority: 'low', status: 'open', time: '1 hour ago', messages: 2 },
    { id: 'TK-1004', title: 'Cannot upload files', customer: 'Emma Davis', priority: 'medium', status: 'in-progress', time: '2 hours ago', messages: 5 },
    { id: 'TK-1005', title: 'Account settings not saving', customer: 'Alex Rodriguez', priority: 'high', status: 'open', time: '3 hours ago', messages: 1 },
    { id: 'TK-1006', title: 'Email notifications delayed', customer: 'Lisa Anderson', priority: 'medium', status: 'resolved', time: '5 hours ago', messages: 4 },
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [, setSelectedTicket] = useState<{ id: string; title: string; customer: string; priority: string; status: string; time: string; messages: number } | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesFilter = filter === 'all' || ticket.status === filter;
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    total: tickets.length
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return darkMode 
        ? 'bg-red-100 text-red-700 border-red-200' 
        : 'bg-red-100 text-red-700 border-red-200';
      case 'high': return darkMode 
        ? 'bg-orange-100 text-orange-700 border-orange-200' 
        : 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return darkMode 
        ? 'bg-yellow-100 text-yellow-700 border-yellow-200' 
        : 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return darkMode 
        ? 'bg-green-100 text-green-700 border-green-200' 
        : 'bg-green-100 text-green-700 border-green-200';
      default: return darkMode 
        ? 'bg-gray-100 text-gray-700 border-gray-200' 
        : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, status: newStatus } : t
    ));
  };

  // Theme classes
  const bgGradient = darkMode 
    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
    : "bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50";
  
  const headerBg = darkMode 
    ? "border-slate-700 bg-slate-900/50" 
    : "border-gray-200 bg-white/80";
  
  const cardBg = darkMode 
    ? "bg-slate-800/30 border-slate-700 hover:bg-slate-800/50" 
    : "bg-white/60 border-gray-300 hover:bg-white/80";
  
  const textColor = darkMode ? "text-white" : "text-gray-900";
  const textMuted = darkMode ? "text-slate-400" : "text-gray-600";
  
  const inputBg = darkMode 
    ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-400" 
    : "bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500";
  
  const buttonBg = darkMode 
    ? "bg-slate-800/50 text-slate-300 hover:bg-slate-800" 
    : "bg-gray-200/70 text-gray-700 hover:bg-gray-300";

  return (
    <div className={`min-h-screen ${bgGradient} ${textColor} transition-colors duration-300`}>
      {/* Header */}
      <header className={`border-b ${headerBg} backdrop-blur-xl transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg text-white">
              V
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                VOID Desk
              </h1>
              <p className={`text-xs ${textMuted}`}>Support Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <div className={`w-10 h-10 ${darkMode ? 'bg-slate-800' : 'bg-gray-200'} rounded-full flex items-center justify-center transition-colors duration-300`}>
              <User className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`} />
            </div>
            <button
              onClick={() => { logout(); navigate('/login', { replace: true }); }}
              className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition-colors`}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards - Keeping your original translucent design */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className={`${textMuted} text-sm`}>Total Tickets</span>
              <AlertCircle className="w-5 h-5 text-violet-400" />
            </div>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className={`${textMuted} text-sm`}>Open</span>
              <AlertCircle className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold">{stats.open}</p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className={`${textMuted} text-sm`}>In Progress</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-bold">{stats.inProgress}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className={`${textMuted} text-sm`}>Resolved</span>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold">{stats.resolved}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textMuted}`} />
            <input
              type="text"
              placeholder="Search tickets by ID, title, or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-violet-500 transition-colors duration-300`}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-violet-500 text-white' 
                  : `${buttonBg}`
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('open')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                filter === 'open' 
                  ? 'bg-blue-500 text-white' 
                  : `${buttonBg}`
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                filter === 'in-progress' 
                  ? 'bg-amber-500 text-white' 
                  : `${buttonBg}`
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                filter === 'resolved' 
                  ? 'bg-green-500 text-white' 
                  : `${buttonBg}`
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`${cardBg} border rounded-xl p-5 transition-all cursor-pointer backdrop-blur-sm`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`${textMuted} font-mono text-sm`}>{ticket.id}</span>
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                    <div className={`flex items-center gap-1 ${textMuted}`}>
                      {getStatusIcon(ticket.status)}
                      <span className="text-sm capitalize">{ticket.status.replace('-', ' ')}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{ticket.title}</h3>
                  
                  <div className={`flex items-center gap-4 text-sm ${textMuted}`}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{ticket.customer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{ticket.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>{ticket.messages} messages</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button className={`p-2 hover:${darkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-lg transition-colors`}>
                    <MoreVertical className={`w-5 h-5 ${textMuted}`} />
                  </button>
                  
                  {ticket.status !== 'resolved' && (
                    <select
                      value={ticket.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateTicketStatus(ticket.id, e.target.value);
                      }}
                      className={`px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-300'} border rounded-lg text-sm focus:outline-none focus:border-violet-500 transition-colors duration-300`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-16">
            <AlertCircle className={`w-16 h-16 ${darkMode ? 'text-slate-600' : 'text-gray-400'} mx-auto mb-4`} />
            <p className={`${textMuted} text-lg`}>No tickets found</p>
          </div>
        )}
      </div>
    </div>
  );
}
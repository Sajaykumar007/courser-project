import React, { useState, useEffect } from 'react';

function AdminDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState('leads');

  // States for all tabs
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [placementEnquiries, setPlacementEnquiries] = useState([]);
  const [placedStudents, setPlacedStudents] = useState([]);
  const [driveRegistrations, setDriveRegistrations] = useState([]);
  const [hireRequests, setHireRequests] = useState([]);
  const [corporateTrainingRequests, setCorporateTrainingRequests] = useState([]);
  const [courseEnrollments, setCourseEnrollments] = useState([]);
  const [courseEnquiries, setCourseEnquiries] = useState([]);
  const [onlineCourseEnquiries, setOnlineCourseEnquiries] = useState([]); // NEW
  const [referrals, setReferrals] = useState([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab, subscriberSearch]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = '';
      if (activeTab === 'leads') url = 'http://localhost:5000/api/leads/all';
      else if (activeTab === 'contacts') url = 'http://localhost:5000/api/contact/all';
      else if (activeTab === 'placementEnquiries') url = 'http://localhost:5000/api/placement/enquiries';
      else if (activeTab === 'placedStudents') url = 'http://localhost:5000/api/placement/placed-students';
      else if (activeTab === 'driveRegistrations') url = 'http://localhost:5000/api/placement/drive-registrations';
      else if (activeTab === 'hireRequests') url = 'http://localhost:5000/api/placement/hire-requests';
      else if (activeTab === 'corporateTrainingRequests') url = 'http://localhost:5000/api/placement/corporate-training-requests';
      else if (activeTab === 'courseEnrollments') url = 'http://localhost:5000/api/online-courses/enrollments';
      else if (activeTab === 'courseEnquiries') url = 'http://localhost:5000/api/courses/enquiries';
      else if (activeTab === 'onlineCourseEnquiries') url = 'http://localhost:5000/api/online-courses/enquiries'; // NEW
      else if (activeTab === 'referrals') url = 'http://localhost:5000/api/referrals/all';
      else if (activeTab === 'newsletter') url = `http://localhost:5000/api/newsletter/all?search=${encodeURIComponent(subscriberSearch)}`;

      if (url) {
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          if (activeTab === 'leads') setLeads(data.data);
          else if (activeTab === 'contacts') setContacts(data.data);
          else if (activeTab === 'placementEnquiries') setPlacementEnquiries(data.data);
          else if (activeTab === 'placedStudents') setPlacedStudents(data.data);
          else if (activeTab === 'driveRegistrations') setDriveRegistrations(data.data);
          else if (activeTab === 'hireRequests') setHireRequests(data.data);
          else if (activeTab === 'corporateTrainingRequests') setCorporateTrainingRequests(data.data);
          else if (activeTab === 'courseEnrollments') setCourseEnrollments(data.data);
          else if (activeTab === 'courseEnquiries') setCourseEnquiries(data.data);
          else if (activeTab === 'onlineCourseEnquiries') setOnlineCourseEnquiries(data.data); // NEW
          else if (activeTab === 'referrals') setReferrals(data.data);
          else if (activeTab === 'newsletter') setNewsletterSubscribers(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        let url = '';
        if (type === 'leads') url = `http://localhost:5000/api/leads/${id}`;
        else if (type === 'contacts') url = `http://localhost:5000/api/contact/${id}`;
        else if (type === 'driveRegistrations') url = `http://localhost:5000/api/placement/drive-registrations/${id}`;
        else if (type === 'courseEnrollments') url = `http://localhost:5000/api/online-courses/enrollments/${id}`;
        else if (type === 'courseEnquiries') url = `http://localhost:5000/api/courses/enquiries/${id}`;
        else if (type === 'onlineCourseEnquiries') url = `http://localhost:5000/api/online-courses/enquiries/${id}`; // NEW
        else if (type === 'referrals') url = `http://localhost:5000/api/referrals/${id}`;
        else if (type === 'newsletter') url = `http://localhost:5000/api/newsletter/${id}`;

        if (url) {
          await fetch(url, { method: 'DELETE' });
          if (type === 'leads') setLeads(leads.filter(item => item._id !== id));
          else if (type === 'contacts') setContacts(contacts.filter(item => item._id !== id));
          else if (type === 'driveRegistrations') setDriveRegistrations(driveRegistrations.filter(item => item._id !== id));
          else if (type === 'courseEnrollments') setCourseEnrollments(courseEnrollments.filter(item => item._id !== id));
          else if (type === 'courseEnquiries') setCourseEnquiries(courseEnquiries.filter(item => item._id !== id));
          else if (type === 'onlineCourseEnquiries') setOnlineCourseEnquiries(onlineCourseEnquiries.filter(item => item._id !== id)); // NEW
          else if (type === 'referrals') setReferrals(referrals.filter(item => item._id !== id));
          else if (type === 'newsletter') setNewsletterSubscribers(newsletterSubscribers.filter(item => item._id !== id));
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleToggleSubscription = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/newsletter/${id}/toggle`, { method: 'PUT' });
      const data = await res.json();
      if (data.success) {
        setNewsletterSubscribers(prev => prev.map(sub => sub._id === id ? data.data : sub));
      }
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-slate-800/30 rounded-xl border border-slate-700/50 border-dashed">
      <span className="text-5xl mb-4 opacity-50">📭</span>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-medium animate-pulse">Loading data...</p>
        </div>
      );
    }

    if (activeTab === 'leads' && leads.length === 0) return <EmptyState message="No leads found." />;
    if (activeTab === 'contacts' && contacts.length === 0) return <EmptyState message="No contacts found." />;
    if (activeTab === 'placementEnquiries' && placementEnquiries.length === 0) return <EmptyState message="No placement enquiries found." />;
    if (activeTab === 'placedStudents' && placedStudents.length === 0) return <EmptyState message="No placed students found." />;
    if (activeTab === 'driveRegistrations' && driveRegistrations.length === 0) return <EmptyState message="No drive registrations found." />;
    if (activeTab === 'hireRequests' && hireRequests.length === 0) return <EmptyState message="No hire requests found." />;
    if (activeTab === 'corporateTrainingRequests' && corporateTrainingRequests.length === 0) return <EmptyState message="No corporate training requests found." />;
    if (activeTab === 'courseEnrollments' && courseEnrollments.length === 0) return <EmptyState message="No course enrollments found." />;
    if (activeTab === 'courseEnquiries' && courseEnquiries.length === 0) return <EmptyState message="No course enquiries found." />;
    if (activeTab === 'onlineCourseEnquiries' && onlineCourseEnquiries.length === 0) return <EmptyState message="No online course enquiries found." />; // NEW
    if (activeTab === 'referrals' && referrals.length === 0) return <EmptyState message="No referrals found." />;
    if (activeTab === 'newsletter' && newsletterSubscribers.length === 0) return <EmptyState message="No newsletter subscribers found." />;

    const TableWrapper = ({ children }) => (
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            {children}
          </table>
        </div>
      </div>
    );

    const DeleteButton = ({ id, type }) => (
      <button 
        onClick={() => handleDelete(id, type)}
        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
        title="Delete"
      >
        ️
      </button>
    );

    if (activeTab === 'leads') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Mobile</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Mode</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {leads.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    item.type === 'join_now' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}>
                    {item.type === 'join_now' ? ' Join' : '🎯 Demo'}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-200">{item.fullName}</td>
                <td className="px-6 py-4 text-slate-400">{item.mobile}</td>
                <td className="px-6 py-4 text-slate-400">{item.email}</td>
                <td className="px-6 py-4 text-slate-300">{item.course}</td>
                <td className="px-6 py-4 text-slate-400">{item.learningMode || '-'}</td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                <td className="px-6 py-4 text-right"><DeleteButton id={item._id} type="leads" /></td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    if (activeTab === 'contacts') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {contacts.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.name}</td>
                <td className="px-6 py-4 text-slate-400">{item.company || '-'}</td>
                <td className="px-6 py-4 text-slate-400">{item.phone}</td>
                <td className="px-6 py-4 text-slate-400">{item.email}</td>
                <td className="px-6 py-4 text-slate-300">{item.subject}</td>
                <td className="px-6 py-4 text-slate-400 max-w-xs truncate" title={item.message}>
                  {item.message.length > 40 ? item.message.substring(0, 40) + '...' : item.message}
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                <td className="px-6 py-4 text-right"><DeleteButton id={item._id} type="contacts" /></td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    if (activeTab === 'placementEnquiries') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Experience</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {placementEnquiries.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.fullName}</td>
                <td className="px-6 py-4 text-slate-400">{item.phone}</td>
                <td className="px-6 py-4 text-slate-400">{item.email}</td>
                <td className="px-6 py-4 text-slate-300">{item.course || '-'}</td>
                <td className="px-6 py-4 text-slate-400">{item.location || '-'}</td>
                <td className="px-6 py-4 text-slate-400">{item.experience || '-'}</td>
                <td className="px-6 py-4 text-slate-400 max-w-xs truncate" title={item.message}>
                  {item.message ? (item.message.length > 40 ? item.message.substring(0, 40) + '...' : item.message) : '-'}
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    if (activeTab === 'placedStudents') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Package</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Year</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {placedStudents.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.studentName}</td>
                <td className="px-6 py-4 text-slate-300">{item.course}</td>
                <td className="px-6 py-4 text-slate-400">{item.company}</td>
                <td className="px-6 py-4 text-slate-400">{item.jobRole}</td>
                <td className="px-6 py-4 text-emerald-400 font-bold">₹{item.package}</td>
                <td className="px-6 py-4 text-slate-400">{item.location || '-'}</td>
                <td className="px-6 py-4 text-slate-400">{item.year}</td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    if (activeTab === 'driveRegistrations') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Drive Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Registered</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {driveRegistrations.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.fullName}</td>
                <td className="px-6 py-4 text-slate-400">{item.email}</td>
                <td className="px-6 py-4 text-slate-400">{item.phone}</td>
                <td className="px-6 py-4 text-slate-300">{item.course || '-'}</td>
                <td className="px-6 py-4 text-slate-300">{item.companyName}</td>
                <td className="px-6 py-4 text-slate-400">{item.jobRole}</td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{new Date(item.driveDate).toLocaleDateString('en-IN')}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    item.status === 'Selected' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    item.status === 'Rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    item.status === 'Shortlisted' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.registeredAt)}</td>
                <td className="px-6 py-4 text-right"><DeleteButton id={item._id} type="driveRegistrations" /></td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    if (activeTab === 'hireRequests') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Contact Person</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Industry</th>
              <th className="px-6 py-4">Positions</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {hireRequests.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.companyName}</td>
                <td className="px-6 py-4 text-slate-300">{item.contactPerson}</td>
                <td className="px-6 py-4 text-slate-400">{item.email}</td>
                <td className="px-6 py-4 text-slate-400">{item.phone}</td>
                <td className="px-6 py-4 text-slate-400">{item.industry}</td>
                <td className="px-6 py-4 text-slate-400">{item.positions || '-'}</td>
                <td className="px-6 py-4 text-slate-400 max-w-xs truncate" title={item.message}>
                  {item.message ? (item.message.length > 40 ? item.message.substring(0, 40) + '...' : item.message) : '-'}
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    if (activeTab === 'corporateTrainingRequests') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Employees</th>
              <th className="px-6 py-4">Training Type</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {corporateTrainingRequests.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.companyName}</td>
                <td className="px-6 py-4 text-slate-300">{item.contactPerson}</td>
                <td className="px-6 py-4 text-slate-400">{item.email}</td>
                <td className="px-6 py-4 text-slate-400">{item.phone}</td>
                <td className="px-6 py-4 text-slate-400">{item.employees || '-'}</td>
                <td className="px-6 py-4 text-slate-400">{item.trainingType || '-'}</td>
                <td className="px-6 py-4 text-slate-400 max-w-xs truncate" title={item.message}>
                  {item.message ? (item.message.length > 40 ? item.message.substring(0, 40) + '...' : item.message) : '-'}
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    if (activeTab === 'courseEnrollments') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Enrolled Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {courseEnrollments.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.studentName}</td>
                <td className="px-6 py-4 text-slate-400">{item.email}</td>
                <td className="px-6 py-4 text-slate-400">{item.phone}</td>
                <td className="px-6 py-4 text-emerald-400 font-semibold">{item.courseTitle}</td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.enrolledAt || item.createdAt)}</td>
                <td className="px-6 py-4 text-right"><DeleteButton id={item._id} type="courseEnrollments" /></td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    if (activeTab === 'courseEnquiries') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {courseEnquiries.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.studentName}</td>
                <td className="px-6 py-4 text-slate-400">{item.phone}</td>
                <td className="px-6 py-4 text-emerald-400 font-semibold">{item.courseTitle}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    item.status === 'New' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                    item.status === 'Contacted' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    item.status === 'Converted' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    'bg-slate-500/20 text-slate-400 border-slate-500/30'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                <td className="px-6 py-4 text-right"><DeleteButton id={item._id} type="courseEnquiries" /></td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    // NEW - Online Course Enquiries Tab
    if (activeTab === 'onlineCourseEnquiries') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {onlineCourseEnquiries.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.studentName}</td>
                <td className="px-6 py-4 text-slate-400">{item.phone}</td>
                <td className="px-6 py-4 text-emerald-400 font-semibold">{item.courseTitle}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    item.status === 'New' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                    item.status === 'Contacted' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    item.status === 'Converted' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    'bg-slate-500/20 text-slate-400 border-slate-500/30'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                <td className="px-6 py-4 text-right"><DeleteButton id={item._id} type="onlineCourseEnquiries" /></td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    if (activeTab === 'referrals') {
      return (
        <TableWrapper>
          <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">Referrer (You)</th>
              <th className="px-6 py-4">Referred Student</th>
              <th className="px-6 py-4">Course & Fees</th>
              <th className="px-6 py-4">Commission</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {referrals.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4">
                  <strong className="text-slate-200 block">{item.referrerName}</strong>
                  <span className="text-xs text-slate-500">{item.referrerEmail}</span>
                </td>
                <td className="px-6 py-4">
                  <strong className="text-slate-200 block">{item.referredName}</strong>
                  <span className="text-xs text-slate-500">{item.referredEmail}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-300 block">{item.courseName}</span>
                  <span className="text-xs text-slate-500">₹{item.courseFees?.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-emerald-400 font-bold text-base">₹{item.commissionAmount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    item.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    item.status === 'Approved' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                <td className="px-6 py-4 text-right"><DeleteButton id={item._id} type="referrals" /></td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      );
    }

    if (activeTab === 'newsletter') {
      return (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              placeholder="Search by email..." 
              value={subscriberSearch}
              onChange={(e) => setSubscriberSearch(e.target.value)}
              className="w-full sm:w-80 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <TableWrapper>
            <thead className="bg-slate-900/80 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Subscribed Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {newsletterSubscribers.map((item) => (
                <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200">{item.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      item.subscribed ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }`}>
                      {item.subscribed ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleToggleSubscription(item._id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        item.subscribed 
                          ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30' 
                          : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
                      }`}
                    >
                      {item.subscribed ? 'Disable' : 'Enable'}
                    </button>
                    <DeleteButton id={item._id} type="newsletter" />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>
      );
    }

    return null;
  };

  const tabs = [
    { id: 'leads', label: 'Leads', count: leads.length },
    { id: 'contacts', label: 'Contacts', count: contacts.length },
    { id: 'placementEnquiries', label: 'Placement Enq.', count: placementEnquiries.length },
    { id: 'placedStudents', label: 'Placed Students', count: placedStudents.length },
    { id: 'driveRegistrations', label: 'Drive Reg.', count: driveRegistrations.length },
    { id: 'hireRequests', label: ' Hire Requests', count: hireRequests.length },
    { id: 'corporateTrainingRequests', label: 'Corp. Training', count: corporateTrainingRequests.length },
    { id: 'courseEnrollments', label: 'Enrollments', count: courseEnrollments.length },
    { id: 'courseEnquiries', label: 'Course Enq.', count: courseEnquiries.length },
    { id: 'onlineCourseEnquiries', label: 'Online Course Enq.', count: onlineCourseEnquiries.length }, // NEW
    { id: 'referrals', label: 'Referrals', count: referrals.length },
    { id: 'newsletter', label: 'Newsletter', count: newsletterSubscribers.length },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">📊 Admin Dashboard</h2>
          <p className="text-slate-400 mt-1">Manage all your data in one place</p>
        </div>
        <button 
          onClick={onBack} 
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition-all duration-300 hover:border-indigo-500/50 flex items-center justify-center gap-2 w-fit"
        >
          <span>←</span> Back to Website
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-indigo-500'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700'
            }`}
          >
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded text-xs ${
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table Content */}
      <div className="table-container">
        {renderTable()}
      </div>
    </div>
  );
}

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';

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
  const [referrals, setReferrals] = useState([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]); // ✅ NEW
  const [subscriberSearch, setSubscriberSearch] = useState(''); // ✅ NEW
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab, subscriberSearch]); // ✅ Added subscriberSearch to dependency

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = '';
      if (activeTab === 'leads') url = 'https://courser-project.onrender.com/api/leads/all';
      else if (activeTab === 'contacts') url = 'https://courser-project.onrender.com/api/contact/all';
      else if (activeTab === 'placementEnquiries') url = 'https://courser-project.onrender.com/api/placement/enquiries';
      else if (activeTab === 'placedStudents') url = 'https://courser-project.onrender.com/api/placement/placed-students';
      else if (activeTab === 'driveRegistrations') url = 'https://courser-project.onrender.com/api/placement/drive-registrations';
      else if (activeTab === 'hireRequests') url = 'https://courser-project.onrender.com/api/placement/hire-requests';
      else if (activeTab === 'corporateTrainingRequests') url = 'https://courser-project.onrender.com/api/placement/corporate-training-requests';
      else if (activeTab === 'courseEnrollments') url = 'https://courser-project.onrender.com/api/online-courses/enrollments';
      else if (activeTab === 'courseEnquiries') url = 'https://courser-project.onrender.com/api/courses/enquiries';
      else if (activeTab === 'referrals') url = 'https://courser-project.onrender.com/api/referrals/all';
      else if (activeTab === 'newsletter') url = `https://courser-project.onrender.com/api/newsletter/all?search=${encodeURIComponent(subscriberSearch)}`; // ✅ NEW

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
          else if (activeTab === 'referrals') setReferrals(data.data);
          else if (activeTab === 'newsletter') setNewsletterSubscribers(data.data); // ✅ NEW
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
        if (type === 'leads') url = `https://courser-project.onrender.com/api/leads/${id}`;
        else if (type === 'contacts') url = `https://courser-project.onrender.com/api/contact/${id}`;
        else if (type === 'driveRegistrations') url = `https://courser-project.onrender.com/api/placement/drive-registrations/${id}`;
        else if (type === 'courseEnrollments') url = `https://courser-project.onrender.com/api/online-courses/enrollments/${id}`;
        else if (type === 'courseEnquiries') url = `https://courser-project.onrender.com/api/courses/enquiries/${id}`;
        else if (type === 'referrals') url = `https://courser-project.onrender.com/api/referrals/${id}`;
        else if (type === 'newsletter') url = `https://courser-project.onrender.com/api/newsletter/${id}`; // ✅ NEW

        if (url) {
          await fetch(url, { method: 'DELETE' });
          if (type === 'leads') setLeads(leads.filter(item => item._id !== id));
          else if (type === 'contacts') setContacts(contacts.filter(item => item._id !== id));
          else if (type === 'driveRegistrations') setDriveRegistrations(driveRegistrations.filter(item => item._id !== id));
          else if (type === 'courseEnrollments') setCourseEnrollments(courseEnrollments.filter(item => item._id !== id));
          else if (type === 'courseEnquiries') setCourseEnquiries(courseEnquiries.filter(item => item._id !== id));
          else if (type === 'referrals') setReferrals(referrals.filter(item => item._id !== id));
          else if (type === 'newsletter') setNewsletterSubscribers(newsletterSubscribers.filter(item => item._id !== id)); // ✅ NEW
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  // ✅ NEW: Toggle subscription status
  const handleToggleSubscription = async (id) => {
    try {
      const res = await fetch(`https://courser-project.onrender.com/api/newsletter/${id}/toggle`, { method: 'PUT' });
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

  const renderTable = () => {
    if (loading) return <p className="loading-text">Loading data...</p>;

    if (activeTab === 'leads' && leads.length === 0) return <p className="empty-text">No leads found.</p>;
    if (activeTab === 'contacts' && contacts.length === 0) return <p className="empty-text">No contacts found.</p>;
    if (activeTab === 'placementEnquiries' && placementEnquiries.length === 0) return <p className="empty-text">No placement enquiries found.</p>;
    if (activeTab === 'placedStudents' && placedStudents.length === 0) return <p className="empty-text">No placed students found.</p>;
    if (activeTab === 'driveRegistrations' && driveRegistrations.length === 0) return <p className="empty-text">No drive registrations found.</p>;
    if (activeTab === 'hireRequests' && hireRequests.length === 0) return <p className="empty-text">No hire requests found.</p>;
    if (activeTab === 'corporateTrainingRequests' && corporateTrainingRequests.length === 0) return <p className="empty-text">No corporate training requests found.</p>;
    if (activeTab === 'courseEnrollments' && courseEnrollments.length === 0) return <p className="empty-text">No course enrollments found.</p>;
    if (activeTab === 'courseEnquiries' && courseEnquiries.length === 0) return <p className="empty-text">No course enquiries found.</p>;
    if (activeTab === 'referrals' && referrals.length === 0) return <p className="empty-text">No referrals found.</p>;
    if (activeTab === 'newsletter' && newsletterSubscribers.length === 0) return <p className="empty-text">No newsletter subscribers found.</p>; // ✅ NEW

    if (activeTab === 'leads') {
      return (
        <table className="leads-table">
          <thead>
            <tr><th>Type</th><th>Name</th><th>Mobile</th><th>Email</th><th>Course</th><th>Mode</th><th>Date</th><th>Action</th></tr>
          </thead>
          <tbody>
            {leads.map((item) => (
              <tr key={item._id}>
                <td><span className={`badge ${item.type === 'join_now' ? 'join_now' : 'demo_class'}`}>{item.type === 'join_now' ? '🎓 Join' : '🎯 Demo'}</span></td>
                <td>{item.fullName}</td><td>{item.mobile}</td><td>{item.email}</td><td>{item.course}</td><td>{item.learningMode || '-'}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td><button className="delete-btn" onClick={() => handleDelete(item._id, 'leads')}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'contacts') {
      return (
        <table className="leads-table">
          <thead>
            <tr><th>Name</th><th>Company</th><th>Phone</th><th>Email</th><th>Subject</th><th>Message</th><th>Date</th><th>Action</th></tr>
          </thead>
          <tbody>
            {contacts.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.name}</strong></td><td>{item.company || '-'}</td><td>{item.phone}</td><td>{item.email}</td><td>{item.subject}</td>
                <td className="message-cell" title={item.message}>{item.message.length > 40 ? item.message.substring(0, 40) + '...' : item.message}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td><button className="delete-btn" onClick={() => handleDelete(item._id, 'contacts')}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'placementEnquiries') {
      return (
        <table className="leads-table">
          <thead>
            <tr><th>Name</th><th>Phone</th><th>Email</th><th>Course</th><th>Location</th><th>Experience</th><th>Message</th><th>Date</th></tr>
          </thead>
          <tbody>
            {placementEnquiries.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.fullName}</strong></td><td>{item.phone}</td><td>{item.email}</td><td>{item.course || '-'}</td>
                <td>{item.location || '-'}</td><td>{item.experience || '-'}</td>
                <td className="message-cell" title={item.message}>{item.message ? (item.message.length > 40 ? item.message.substring(0, 40) + '...' : item.message) : '-'}</td>
                <td>{formatDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'placedStudents') {
      return (
        <table className="leads-table">
          <thead>
            <tr><th>Name</th><th>Course</th><th>Company</th><th>Role</th><th>Package</th><th>Location</th><th>Year</th></tr>
          </thead>
          <tbody>
            {placedStudents.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.studentName}</strong></td><td>{item.course}</td><td>{item.company}</td><td>{item.jobRole}</td>
                <td style={{ color: '#10b981', fontWeight: 'bold' }}>₹{item.package}</td><td>{item.location || '-'}</td><td>{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'driveRegistrations') {
      return (
        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Course</th>
              <th>Company</th><th>Role</th><th>Drive Date</th><th>Status</th><th>Registered</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {driveRegistrations.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.fullName}</strong></td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.course || '-'}</td>
                <td>{item.companyName}</td>
                <td>{item.jobRole}</td>
                <td>{new Date(item.driveDate).toLocaleDateString('en-IN')}</td>
                <td>
                  <span className={`badge ${item.status === 'Selected' ? 'join_now' : item.status === 'Rejected' ? 'demo_class' : ''}`} style={{
                    background: item.status === 'Registered' ? '#dbeafe' : item.status === 'Shortlisted' ? '#fef3c7' : item.status === 'Selected' ? '#dcfce7' : '#fee2e2',
                    color: item.status === 'Registered' ? '#1d4ed8' : item.status === 'Shortlisted' ? '#92400e' : item.status === 'Selected' ? '#16a34a' : '#dc2626'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td>{formatDate(item.registeredAt)}</td>
                <td><button className="delete-btn" onClick={() => handleDelete(item._id, 'driveRegistrations')}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'hireRequests') {
      return (
        <table className="leads-table">
          <thead>
            <tr>
              <th>Company</th><th>Contact Person</th><th>Email</th><th>Phone</th>
              <th>Industry</th><th>Positions</th><th>Message</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            {hireRequests.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.companyName}</strong></td>
                <td>{item.contactPerson}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.industry}</td>
                <td>{item.positions || '-'}</td>
                <td className="message-cell" title={item.message}>{item.message ? (item.message.length > 40 ? item.message.substring(0, 40) + '...' : item.message) : '-'}</td>
                <td>{formatDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'corporateTrainingRequests') {
      return (
        <table className="leads-table">
          <thead>
            <tr>
              <th>Company</th><th>Contact</th><th>Email</th><th>Phone</th>
              <th>Employees</th><th>Training Type</th><th>Message</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            {corporateTrainingRequests.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.companyName}</strong></td>
                <td>{item.contactPerson}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.employees || '-'}</td>
                <td>{item.trainingType || '-'}</td>
                <td className="message-cell" title={item.message}>
                  {item.message ? (item.message.length > 40 ? item.message.substring(0, 40) + '...' : item.message) : '-'}
                </td>
                <td>{formatDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'courseEnrollments') {
      return (
        <table className="leads-table">
          <thead>
            <tr>
              <th>Student Name</th><th>Email</th><th>Phone</th>
              <th>Course</th><th>Enrolled Date</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courseEnrollments.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.studentName}</strong></td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td style={{ color: '#10b981', fontWeight: '600' }}>{item.courseTitle}</td>
                <td>{formatDate(item.enrolledAt || item.createdAt)}</td>
                <td><button className="delete-btn" onClick={() => handleDelete(item._id, 'courseEnrollments')}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'courseEnquiries') {
      return (
        <table className="leads-table">
          <thead>
            <tr>
              <th>Student Name</th><th>Phone</th><th>Course</th><th>Date</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courseEnquiries.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.studentName}</strong></td>
                <td>{item.phone}</td>
                <td style={{ color: '#10b981', fontWeight: '600' }}>{item.courseTitle}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td><button className="delete-btn" onClick={() => handleDelete(item._id, 'courseEnquiries')}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'referrals') {
      return (
        <table className="leads-table">
          <thead>
            <tr>
              <th>Referrer (You)</th>
              <th>Referred Student</th>
              <th>Course & Fees</th>
              <th>Commission</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((item) => (
              <tr key={item._id}>
                <td>
                  <strong>{item.referrerName}</strong><br/>
                  <small style={{ color: '#64748b' }}>{item.referrerEmail}</small>
                </td>
                <td>
                  <strong>{item.referredName}</strong><br/>
                  <small style={{ color: '#64748b' }}>{item.referredEmail}</small>
                </td>
                <td>
                  {item.courseName}<br/>
                  <small>₹{item.courseFees?.toLocaleString()}</small>
                </td>
                <td style={{ color: '#10b981', fontWeight: '800', fontSize: '1.1rem' }}>
                  ₹{item.commissionAmount}
                </td>
                <td>
                  <span className="badge" style={{
                    background: item.status === 'Paid' ? '#dcfce7' : item.status === 'Approved' ? '#fef3c7' : '#fee2e2',
                    color: item.status === 'Paid' ? '#16a34a' : item.status === 'Approved' ? '#92400e' : '#dc2626',
                    fontWeight: '700'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(item._id, 'referrals')}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    // ✅ NEW: Newsletter Subscribers Table
    if (activeTab === 'newsletter') {
      return (
        <>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Search by email..." 
              value={subscriberSearch}
              onChange={(e) => setSubscriberSearch(e.target.value)}
              style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1, fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
          <table className="leads-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Subscribed Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsletterSubscribers.map((item) => (
                <tr key={item._id}>
                  <td><strong>{item.email}</strong></td>
                  <td>
                    <span className={`badge ${item.subscribed ? 'success' : 'pending'}`}>
                      {item.subscribed ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <button 
                      className="approve-btn" 
                      style={{ marginRight: '0.5rem', background: item.subscribed ? '#fef3c7' : '#dcfce7', color: item.subscribed ? '#92400e' : '#16a34a' }}
                      onClick={() => handleToggleSubscription(item._id)}
                    >
                      {item.subscribed ? 'Disable' : 'Enable'}
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(item._id, 'newsletter')}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    return null;
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h2>📊 Admin Dashboard</h2>
          <p>Manage all your data in one place</p>
        </div>
        <button onClick={onBack} className="back-to-website-btn">← Back to Website</button>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab-btn ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
          📥 Leads <span className="tab-count">{leads.length}</span>
        </button>
        <button className={`admin-tab-btn ${activeTab === 'contacts' ? 'active' : ''}`} onClick={() => setActiveTab('contacts')}>
          ✉️ Contacts <span className="tab-count">{contacts.length}</span>
        </button>
        <button className={`admin-tab-btn ${activeTab === 'placementEnquiries' ? 'active' : ''}`} onClick={() => setActiveTab('placementEnquiries')}>
          🎯 Placement Enquiries <span className="tab-count">{placementEnquiries.length}</span>
        </button>
        <button className={`admin-tab-btn ${activeTab === 'placedStudents' ? 'active' : ''}`} onClick={() => setActiveTab('placedStudents')}>
          🎓 Placed Students <span className="tab-count">{placedStudents.length}</span>
        </button>
        <button className={`admin-tab-btn ${activeTab === 'driveRegistrations' ? 'active' : ''}`} onClick={() => setActiveTab('driveRegistrations')}>
          🎯 Drive Registrations <span className="tab-count">{driveRegistrations.length}</span>
        </button>
        <button className={`admin-tab-btn ${activeTab === 'hireRequests' ? 'active' : ''}`} onClick={() => setActiveTab('hireRequests')}>
          💼 Hire Requests <span className="tab-count">{hireRequests.length}</span>
        </button>
        <button className={`admin-tab-btn ${activeTab === 'corporateTrainingRequests' ? 'active' : ''}`} onClick={() => setActiveTab('corporateTrainingRequests')}>
          🏢 Corp. Training <span className="tab-count">{corporateTrainingRequests.length}</span>
        </button>
        <button className={`admin-tab-btn ${activeTab === 'courseEnrollments' ? 'active' : ''}`} onClick={() => setActiveTab('courseEnrollments')}>
          📚 Course Enrollments <span className="tab-count">{courseEnrollments.length}</span>
        </button>
        <button className={`admin-tab-btn ${activeTab === 'courseEnquiries' ? 'active' : ''}`} onClick={() => setActiveTab('courseEnquiries')}>
          📝 Course Enquiries <span className="tab-count">{courseEnquiries.length}</span>
        </button>
        <button className={`admin-tab-btn ${activeTab === 'referrals' ? 'active' : ''}`} onClick={() => setActiveTab('referrals')}>
          💰 Referrals <span className="tab-count">{referrals.length}</span>
        </button>
        {/* ✅ NEW: Newsletter Tab */}
        <button className={`admin-tab-btn ${activeTab === 'newsletter' ? 'active' : ''}`} onClick={() => setActiveTab('newsletter')}>
          📧 Newsletter <span className="tab-count">{newsletterSubscribers.length}</span>
        </button>
      </div>

      <div className="table-container">
        {renderTable()}
      </div>
    </div>
  );
}

export default AdminDashboard;
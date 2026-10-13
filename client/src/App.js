
import React, { useState, useEffect, useCallback } from 'react';

import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';

import HeroSection from './components/HeroSection';
import GovtJobSection from './components/GovtJobSection';
import CoursesSection from './components/CoursesSection';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import JoinNowPage from './components/JoinNowPage';
import AdminDashboard from './components/AdminDashboard';
import AIChatbot from './components/AIChatbot';

import KeyFeaturesSection from './components/KeyFeaturesSection';
import PlacementSection from './components/PlacementSection';
import TestimonialsSection from './components/TestimonialsSection';
import ReferralSection from './components/ReferralSection';

import AllCoursesPage from './components/AllCoursesPage';
import OnlineCoursesPage from './components/OnlineCoursesPage';
import CorporateTrainingPage from './components/CorporateTrainingPage';
import HireFromUsPage from './components/HireFromUsPage';
import PlacementsPage from './components/PlacementsPage';
import ContactUsPage from './components/ContactUsPage';
import LearningPathsPage from './components/LearningPathsPage';

import AdminLogin from './components/AdminLogin';

const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ADMIN_PATH = '/admin-courser-2024';
const LOGIN_PATH = '/admin/login';

function App() {
  const [showJoinNow, setShowJoinNow] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname
  );

  // Backend session is the source of truth.
  const [isAdminAuthenticated, setIsAdminAuthenticated] =
    useState(false);
  const [isAdminChecking, setIsAdminChecking] = useState(false);

  const [adminError, setAdminError] = useState('');

  // Verify the HttpOnly cookie with the backend.
  const verifyAdminSession = useCallback(async () => {
    setIsAdminChecking(true);
    setAdminError('');

    try {
      const response = await fetch(`${API_URL}/api/admin/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.authenticated) {
        setIsAdminAuthenticated(false);
        setShowAdmin(false);
        return false;
      }

      setIsAdminAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Admin session verification failed:', error);
      setIsAdminAuthenticated(false);
      setShowAdmin(false);
      setAdminError(
        'Backend connect aagala. Server and API URL check pannunga.'
      );
      return false;
    } finally {
      setIsAdminChecking(false);
    }
  }, []);

  // Handle browser URL and page navigation.
  useEffect(() => {
    const checkPath = () => {
      const path = window.location.pathname;

      setCurrentPath(path);
      setShowJoinNow(false);

      if (path === ADMIN_PATH) {
        setCurrentPage('admin');
        setShowAdmin(false);
      } else if (path === LOGIN_PATH) {
        setCurrentPage('adminLogin');
        setShowAdmin(false);
      } else if (path === '/join-now') {
        setCurrentPage('joinNow');
        setShowAdmin(false);
        setShowJoinNow(true);
      } else {
        setShowAdmin(false);

        const pageRoutes = {
          '/courses': 'allCourses',
          '/online-courses': 'onlineCourses',
          '/corporate-training': 'corporateTraining',
          '/hire-from-us': 'hireFromUs',
          '/placements': 'placements',
          '/contact': 'contactUs',
          '/learning-paths': 'learningPaths',
        };

        setCurrentPage(pageRoutes[path] || 'home');
      }
    };

    checkPath();
    window.addEventListener('popstate', checkPath);

    return () => {
      window.removeEventListener('popstate', checkPath);
    };
  }, []);

  // Verify admin session whenever the protected dashboard route opens.
  useEffect(() => {
    if (currentPath !== ADMIN_PATH) {
      return;
    }

    let cancelled = false;

    const checkAdmin = async () => {
      const authenticated = await verifyAdminSession();

      if (cancelled) return;

      if (authenticated) {
        setShowAdmin(true);
        setCurrentPage('admin');
        setShowJoinNow(false);
      } else {
        setShowAdmin(false);
        setCurrentPage('adminLogin');
        window.history.replaceState({}, '', LOGIN_PATH);
        setCurrentPath(LOGIN_PATH);
      }
    };

    checkAdmin();

    return () => {
      cancelled = true;
    };
  }, [currentPath, verifyAdminSession]);

  // Public page navigation.
  useEffect(() => {
    const handleNavigation = (e) => {
      const page = e.detail;

      const routes = {
        home: '/',
        allCourses: '/courses',
        onlineCourses: '/online-courses',
        corporateTraining: '/corporate-training',
        hireFromUs: '/hire-from-us',
        placements: '/placements',
        contactUs: '/contact',
        learningPaths: '/learning-paths',
      };

      setShowJoinNow(false);
      setShowAdmin(false);
      setCurrentPage(page);

      if (routes[page]) {
        window.history.pushState({}, '', routes[page]);
        setCurrentPath(routes[page]);
      }

      window.scrollTo(0, 0);
    };

    window.addEventListener('navigateToPage', handleNavigation);

    return () => {
      window.removeEventListener('navigateToPage', handleNavigation);
    };
  }, []);

  // Join Now navigation.
  useEffect(() => {
    const handleJoinNow = () => {
      setShowJoinNow(true);
      setCurrentPage('joinNow');
      setShowAdmin(false);

      window.history.pushState({}, '', '/join-now');
      setCurrentPath('/join-now');
      window.scrollTo(0, 0);
    };

    window.addEventListener('navigateToJoinNow', handleJoinNow);

    return () => {
      window.removeEventListener('navigateToJoinNow', handleJoinNow);
    };
  }, []);

  // Called only after the login API reports success.
  const handleAdminLoginSuccess = async () => {
    const authenticated = await verifyAdminSession();

    if (!authenticated) {
      setAdminError(
        'Login response vandhuchu, aana session verify aagala. Backend cookie/CORS settings check pannunga.'
      );
      setCurrentPath(LOGIN_PATH);
      setCurrentPage('adminLogin');
      setShowAdmin(false);
      return;
    }

    setShowAdmin(true);
    setShowJoinNow(false);
    setCurrentPage('admin');
    setCurrentPath(ADMIN_PATH);

    window.history.pushState({}, '', ADMIN_PATH);
    window.scrollTo(0, 0);
  };

  // Logout on the backend and clear the local admin view.
  const handleAdminLogout = async () => {
    try {
      await fetch(`${API_URL}/api/admin/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (error) {
      console.error('Admin logout request failed:', error);
    } finally {
      setIsAdminAuthenticated(false);
      setShowAdmin(false);
      setShowJoinNow(false);
      setCurrentPage('home');
      setAdminError('');

      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      window.scrollTo(0, 0);
    }
  };

  // Admin login page.
  if (currentPath === LOGIN_PATH || currentPage === 'adminLogin') {
    return (
      <>
        <CustomCursor />

        {isAdminChecking ? (
          <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-200">
            Verifying admin session...
          </div>
        ) : (
          <>
            {adminError && (
              <div
                role="alert"
                className="fixed left-1/2 top-4 z-50 w-[90%] max-w-lg -translate-x-1/2 rounded-xl border border-red-500/30 bg-slate-900 px-4 py-3 text-sm text-red-300 shadow-xl"
              >
                {adminError}
              </div>
            )}

            <AdminLogin
              onLoginSuccess={handleAdminLoginSuccess}
            />
          </>
        )}
      </>
    );
  }

  // Protected admin dashboard.
  if (currentPath === ADMIN_PATH) {
    if (isAdminChecking) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-200">
          Verifying admin session...
        </div>
      );
    }

    if (!isAdminAuthenticated || !showAdmin) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-200">
          Redirecting to admin login...
        </div>
      );
    }

    return (
      <>
        <CustomCursor />
        <BackgroundVideo />
        <AdminDashboard onBack={handleAdminLogout} />
      </>
    );
  }

  // Join Now page.
  if (showJoinNow) {
    return (
      <>
        <CustomCursor />
        <BackgroundVideo />
        <Navbar />

        <JoinNowPage
          onBack={() => {
            setShowJoinNow(false);
            setCurrentPage('home');
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
          }}
        />

        <Footer />
        <WhatsAppButton />
        <AIChatbot />
      </>
    );
  }

  // Other public pages.
  const renderPage = () => {
    switch (currentPage) {
      case 'allCourses':
        return <AllCoursesPage />;

      case 'onlineCourses':
        return <OnlineCoursesPage />;

      case 'corporateTraining':
        return <CorporateTrainingPage />;

      case 'hireFromUs':
        return <HireFromUsPage />;

      case 'placements':
        return <PlacementsPage />;

      case 'contactUs':
        return <ContactUsPage />;

      case 'learningPaths':
        return <LearningPathsPage />;

      default:
        return null;
    }
  };

  if (currentPage !== 'home') {
    return (
      <>
        <CustomCursor />
        <BackgroundVideo />
        <Navbar />

        {renderPage()}

        <Footer />
        <WhatsAppButton />
        <AIChatbot />
      </>
    );
  }

  // Home page.
  return (
    <div className="min-h-screen bg-slate-900">
      <CustomCursor />
      <BackgroundVideo />
      <Navbar />
      <HeroSection />
      <CoursesSection />
      <GovtJobSection />
      <KeyFeaturesSection />
      <PlacementSection />
      <TestimonialsSection />
      <ReferralSection />
      <WhatsAppButton />
      <AIChatbot />
      <Footer />
    </div>
  );
}

export default App;

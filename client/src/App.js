import React, { useState, useEffect } from 'react';

// Import Components
import BackgroundAnimation from './components/BackgroundAnimation';
import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import ScrollingBanner from './components/ScrollingBanner';
import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import GovtJobSection from './components/GovtJobSection';
import CoursesSection from './components/CoursesSection';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import JoinNowPage from './components/JoinNowPage';
import AdminDashboard from './components/AdminDashboard';
import AIChatbot from './components/AIChatbot';

// Import New Sections
import KeyFeaturesSection from './components/KeyFeaturesSection';
import PlacementSection from './components/PlacementSection';
import TestimonialsSection from './components/TestimonialsSection';
import ReferralSection from './components/ReferralSection';

// Import All Pages
import AllCoursesPage from './components/AllCoursesPage';
import OnlineCoursesPage from './components/OnlineCoursesPage';
import CorporateTrainingPage from './components/CorporateTrainingPage';
import HireFromUsPage from './components/HireFromUsPage';
import PlacementsPage from './components/PlacementsPage';
import ContactUsPage from './components/ContactUsPage';
import LearningPathsPage from './components/LearningPathsPage';

// Import Styles
import './styles/App.css';
import './styles/Navbar.css';
import './styles/Banner.css';
import './styles/Hero.css';
import './styles/VideoSection.css';
import './styles/GovtJob.css';
import './styles/CoursesSection.css';
import './styles/Footer.css';
import './styles/JoinNowPage.css';
import './styles/AdminDashboard.css';
import './styles/AllCoursesPage.css';
import './styles/OnlineCoursesPage.css'; 
import './styles/CorporateTrainingPage.css';
import './styles/HireFromUs.css';
import './styles/PlacementsPage.css';
import './styles/Pages.css';
import './styles/LearningPathsPage.css';
import './styles/KeyFeaturesSection.css';
import './styles/PlacementSection.css';
import './styles/TestimonialsSection.css';
import './styles/ReferralSection.css';
import './styles/AIChatbot.css';
import './styles/BackgroundVideo.css';
import './styles/Responsive.css';

function App() {
  const [showJoinNow, setShowJoinNow] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Check URL on load & listen for URL changes
  useEffect(() => {
    const checkPath = () => {
      const currentPath = window.location.pathname;
      
      if (currentPath === '/admin-courser-2024') {
        setShowAdmin(true);
        setCurrentPage('admin');
        setShowJoinNow(false);
      } else if (currentPath === '/courses') {
        setCurrentPage('allCourses');
        setShowAdmin(false);
        setShowJoinNow(false);
      } else if (currentPath === '/online-courses') {
        setCurrentPage('onlineCourses');
        setShowAdmin(false);
        setShowJoinNow(false);
      } else if (currentPath === '/corporate-training') {
        setCurrentPage('corporateTraining');
        setShowAdmin(false);
        setShowJoinNow(false);
      } else if (currentPath === '/hire-from-us') {
        setCurrentPage('hireFromUs');
        setShowAdmin(false);
        setShowJoinNow(false);
      } else if (currentPath === '/placements') {
        setCurrentPage('placements');
        setShowAdmin(false);
        setShowJoinNow(false);
      } else if (currentPath === '/contact') {
        setCurrentPage('contactUs');
        setShowAdmin(false);
        setShowJoinNow(false);
      } else if (currentPath === '/learning-paths') {
        setCurrentPage('learningPaths');
        setShowAdmin(false);
        setShowJoinNow(false);
      } else {
        setCurrentPage('home');
        setShowAdmin(false);
        setShowJoinNow(false);
      }
    };

    checkPath();
    window.addEventListener('popstate', checkPath);
    return () => window.removeEventListener('popstate', checkPath);
  }, []);

  // Listen for Navbar page navigation
  useEffect(() => {
    const handleNavigation = (e) => {
      const page = e.detail;
      setCurrentPage(page);
      
      // Reset Join Now & Admin states when navigating to other pages
      setShowJoinNow(false);
      setShowAdmin(false);
      
      // Set URL based on page
      const routes = {
        'home': '/',
        'allCourses': '/courses',
        'onlineCourses': '/online-courses',
        'corporateTraining': '/corporate-training',
        'hireFromUs': '/hire-from-us',
        'placements': '/placements',
        'contactUs': '/contact',
        'learningPaths': '/learning-paths',
      };
      
      if (routes[page]) {
        window.history.pushState({}, '', routes[page]);
      }
      
      window.scrollTo(0, 0);
    };

    window.addEventListener('navigateToPage', handleNavigation);
    return () => window.removeEventListener('navigateToPage', handleNavigation);
  }, []);

  // Listen for Join Now button click
  useEffect(() => {
    const handleJoinNow = () => {
      setShowJoinNow(true);
      setCurrentPage('joinNow');
      window.history.pushState({}, '', '/join-now');
      window.scrollTo(0, 0);
    };
    window.addEventListener('navigateToJoinNow', handleJoinNow);
    return () => window.removeEventListener('navigateToJoinNow', handleJoinNow);
  }, []);

  // ===== ADMIN DASHBOARD =====
  if (showAdmin) {
    return (
      <>
        <BackgroundVideo />
        <AdminDashboard 
          onBack={() => {
            window.history.pushState({}, '', '/');
            setShowAdmin(false);
            setCurrentPage('home');
          }} 
        />
      </>
    );
  }

  // ===== JOIN NOW PAGE =====
  if (showJoinNow) {
    return (
      <>
        <BackgroundVideo />
        <Navbar />
        <ScrollingBanner />
        <JoinNowPage onBack={() => {
          setShowJoinNow(false);
          setCurrentPage('home');
          window.history.pushState({}, '', '/');
        }} />
        <Footer />
        <WhatsAppButton />
        <AIChatbot />
      </>
    );
  }

  // ===== RENDER PAGE FUNCTION =====
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

  // ===== OTHER PAGES (All Courses, Online Courses, etc.) =====
  if (currentPage !== 'home') {
    return (
      <>
        <BackgroundVideo />
        <Navbar />
        <ScrollingBanner />
        {renderPage()}
        <Footer />
        <WhatsAppButton />
        <AIChatbot />
      </>
    );
  }

  // ===== MAIN WEBSITE (HOME) =====
  return (
    <div className="app">
      <BackgroundVideo />
      <BackgroundAnimation />
      <Navbar /> {/* ✅ FIRST - Navbar */}
      <ScrollingBanner /> {/* ✅ SECOND - Scrolling Banner */}
      
      <div className="main-content">
        <HeroSection />
        <VideoSection />
      </div>
       
      <GovtJobSection />
      <CoursesSection />
      
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
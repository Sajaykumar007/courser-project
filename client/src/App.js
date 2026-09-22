import React, { useState, useEffect } from 'react';

import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';

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

function App() {
  const [showJoinNow, setShowJoinNow] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

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

  useEffect(() => {
    const handleNavigation = (e) => {
      const page = e.detail;
      setCurrentPage(page);
      setShowJoinNow(false);
      setShowAdmin(false);
      
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

  if (showJoinNow) {
    return (
      <>
        <BackgroundVideo />
        <Navbar />
        
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
        <BackgroundVideo />
        <Navbar />
        
        {renderPage()}
        <Footer />
        <WhatsAppButton />
        <AIChatbot />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
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
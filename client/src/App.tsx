import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DashboardCards from "@/components/DashboardCards";
import CareerAssessment from "@/components/CareerAssessment";
import RecommendationsDisplay from "@/components/RecommendationsDisplay";
import LearningHub from "@/components/LearningHub";
import ResumePrep from "@/components/ResumePrep";
import ContactSupport from "@/components/ContactSupport";
import AuthForms from "@/components/AuthForms";

function HomePage({ 
  user, 
  onTakeAssessment, 
  onViewRecommendations, 
  onExploreCourses, 
  onResumePrep,
  onGetStarted 
}: {
  user?: { name: string; avatar?: string };
  onTakeAssessment?: () => void;
  onViewRecommendations?: () => void;
  onExploreCourses?: () => void;
  onResumePrep?: () => void;
  onGetStarted?: () => void;
}) {
  return (
    <div className="space-y-16">
      <HeroSection 
        onGetStarted={onGetStarted}
        onTakeAssessment={onTakeAssessment}
      />
      {user && (
        <div className="container mx-auto px-4">
          <DashboardCards 
            onTakeAssessment={onTakeAssessment}
            onViewRecommendations={onViewRecommendations}
            onExploreCourses={onExploreCourses}
            onResumePrep={onResumePrep}
          />
        </div>
      )}
    </div>
  );
}

function Router({ 
  user, 
  currentPage, 
  setCurrentPage 
}: { 
  user?: { name: string; avatar?: string };
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) {
  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <Switch>
      <Route path="/">
        <HomePage 
          user={user}
          onTakeAssessment={() => handleNavigation('assessment')}
          onViewRecommendations={() => handleNavigation('recommendations')}
          onExploreCourses={() => handleNavigation('learning')}
          onResumePrep={() => handleNavigation('resume-prep')}
          onGetStarted={() => handleNavigation('auth')}
        />
      </Route>
      <Route path="/assessment">
        <div className="container mx-auto px-4 py-8">
          <CareerAssessment 
            onComplete={(results) => {
              console.log('Assessment completed:', results);
              handleNavigation('recommendations');
            }}
            onBack={() => handleNavigation('home')}
          />
        </div>
      </Route>
      <Route path="/recommendations">
        <div className="container mx-auto px-4 py-8">
          <RecommendationsDisplay 
            onEnrollCourse={(courseId) => {
              console.log('Enroll in course:', courseId);
              handleNavigation('learning');
            }}
            onViewCareerPath={(pathId) => console.log('View career path:', pathId)}
          />
        </div>
      </Route>
      <Route path="/learning">
        <div className="container mx-auto px-4 py-8">
          <LearningHub 
            onEnrollCourse={(courseId) => console.log('Enroll in course:', courseId)}
          />
        </div>
      </Route>
      <Route path="/resume-prep">
        <div className="container mx-auto px-4 py-8">
          <ResumePrep 
            onDownloadTemplate={(templateId) => console.log('Download template:', templateId)}
          />
        </div>
      </Route>
      <Route path="/contact">
        <div className="container mx-auto px-4 py-8">
          <ContactSupport 
            onSubmitMessage={(message) => console.log('Message submitted:', message)}
          />
        </div>
      </Route>
      <Route path="/auth">
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <AuthForms 
            onLogin={(credentials) => {
              console.log('Login:', credentials);
              // Simulate successful login
              handleNavigation('home');
            }}
            onSignup={(data) => {
              console.log('Signup:', data);
              // Simulate successful signup
              handleNavigation('home');
            }}
            onForgotPassword={(email) => console.log('Forgot password:', email)}
            onSocialLogin={(provider) => {
              console.log('Social login:', provider);
              // Simulate successful social login
              handleNavigation('home');
            }}
          />
        </div>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // todo: remove mock authentication
  const [user, setUser] = useState({ name: "Sarah Johnson", avatar: undefined }); // todo: remove mock user
  const [currentPage, setCurrentPage] = useState('home');

  const handleLogin = () => {
    setCurrentPage('auth');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ name: "", avatar: undefined });
    setCurrentPage('home');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header 
            isAuthenticated={isAuthenticated}
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
          <main>
            <Router 
              user={isAuthenticated ? user : undefined}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

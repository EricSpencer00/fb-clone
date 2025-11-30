import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import Messages from './pages/Messages';
import Explore from './pages/Explore';
import Admin from './pages/Admin';
import AdPartnerPortal from './pages/AdPartnerPortal';

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

// Admin Route wrapper
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/feed" replace />;
  }
  
  return <>{children}</>;
}

// Layout with navigation
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="pt-14">
        {children}
      </main>
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={user ? <Navigate to="/feed" replace /> : <Landing />} />
      
      {/* Ad Partner Portal (public) */}
      <Route path="/partner/*" element={<AdPartnerPortal />} />
      
      {/* Protected routes */}
      <Route path="/feed" element={
        <ProtectedRoute>
          <AppLayout><Feed /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile/:userId?" element={
        <ProtectedRoute>
          <AppLayout><Profile /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/friends" element={
        <ProtectedRoute>
          <AppLayout><Friends /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/messages/:userId?" element={
        <ProtectedRoute>
          <AppLayout><Messages /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/explore" element={
        <ProtectedRoute>
          <AppLayout><Explore /></AppLayout>
        </ProtectedRoute>
      } />
      
      {/* Admin route */}
      <Route path="/admin" element={
        <AdminRoute>
          <AppLayout><Admin /></AppLayout>
        </AdminRoute>
      } />
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

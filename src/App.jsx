import React, { useState, useEffect, lazy, Suspense } from 'react';
import './index.css';
import LandingPage from './components/LandingPage';

// Code-split the Admin Panel so normal visitors don't download Supabase SDK overhead
const AdminPanel = lazy(() => import('./components/AdminPanel'));

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [siteContent, setSiteContent] = useState({});
  const [contentLoading, setContentLoading] = useState(true);

  // Simple path routing
  useEffect(() => {
    const handlePath = () => {
      setIsAdmin(window.location.pathname === '/admin');
    };
    handlePath();
    window.addEventListener('popstate', handlePath);
    return () => window.removeEventListener('popstate', handlePath);
  }, []);

  // Fetch Supabase Content via REST API to preserve code splitting & avoid eager SDK load
  useEffect(() => {
    const loadContent = async () => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        // Fallback to local storage or defaults in local development
        const saved = localStorage.getItem('travanovax_editable_content');
        if (saved) {
          setSiteContent(JSON.parse(saved));
        }
        setContentLoading(false);
      } else {
        try {
          const url = `${supabaseUrl}/rest/v1/site_content?id=eq.content&select=content`;
          const response = await fetch(url, {
            headers: {
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${supabaseAnonKey}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0 && data[0].content) {
              setSiteContent(data[0].content);
            }
          }
        } catch (err) {
          console.error("Failed to load site content from Supabase REST API:", err);
        } finally {
          setContentLoading(false);
        }
      }
    };
    loadContent();
  }, []);

  if (isAdmin) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1c4d6f] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-gray-400 mt-2 font-semibold animate-pulse">Loading Admin Interface...</span>
        </div>
      }>
        <AdminPanel />
      </Suspense>
    );
  }

  // Show dynamic loader during Supabase retrieval (only if in Live Mode)
  const isDemo = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (contentLoading && !isDemo) {
    return (
      <div className="min-h-screen bg-[#071a24] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#e38d37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <LandingPage siteContent={siteContent} />;
}

export default App;

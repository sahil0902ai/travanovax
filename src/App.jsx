import React, { useState, useEffect, lazy, Suspense } from 'react';
import './index.css';
import LandingPage from './components/LandingPage';

// Code-split the Admin Panel so normal visitors don't download Firebase SDK overhead
const AdminPanel = lazy(() => import('./components/AdminPanel'));

// Helper to convert Firestore REST response format back to plain JSON
function parseFirestoreFields(fields) {
  if (!fields) return {};
  const obj = {};
  for (const key in fields) {
    const val = fields[key];
    if (val.stringValue !== undefined) {
      obj[key] = val.stringValue;
    } else if (val.integerValue !== undefined) {
      obj[key] = parseInt(val.integerValue, 10);
    } else if (val.doubleValue !== undefined) {
      obj[key] = parseFloat(val.doubleValue);
    } else if (val.booleanValue !== undefined) {
      obj[key] = val.booleanValue;
    } else if (val.mapValue !== undefined) {
      obj[key] = parseFirestoreFields(val.mapValue.fields);
    } else if (val.arrayValue !== undefined) {
      const values = val.arrayValue.values || [];
      obj[key] = values.map(item => {
        if (item.mapValue !== undefined) return parseFirestoreFields(item.mapValue.fields);
        if (item.stringValue !== undefined) return item.stringValue;
        return item;
      });
    }
  }
  return obj;
}

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

  // Fetch Firestore Content via REST API to preserve code splitting & avoid eager Firebase load
  useEffect(() => {
    const loadContent = async () => {
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

      if (!projectId) {
        // Fallback to local storage or defaults in local development
        const saved = localStorage.getItem('travanovax_editable_content');
        if (saved) {
          setSiteContent(JSON.parse(saved));
        }
        setContentLoading(false);
      } else {
        try {
          const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/siteContent/content`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            const parsed = parseFirestoreFields(data.fields);
            setSiteContent(parsed);
          }
        } catch (err) {
          console.error("Failed to load site content from Firestore REST API:", err);
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

  // Show dynamic loader during Firestore retrieval (only if in Live Mode)
  const isDemo = !import.meta.env.VITE_FIREBASE_PROJECT_ID;
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

import React, { useState, useEffect } from 'react';
import { LogOut, Save, Users, FileText, Search, Plus, Trash2, ArrowLeft, RefreshCw, Key, ShieldCheck } from 'lucide-react';
import { isDemoMode, auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// ─── Default Content Template ───────────────────────────────────────────────
const DEFAULT_CONTENT = {
  hero: {
    headline: 'Trip Planning That<br />Actually Feels Easy.',
    subheadline: 'From that first spark of "Where should we go?" to the moment you land back home — we take care of every detail so you can simply show up and enjoy the journey.',
    stats: [
      { value: '500+', label: 'Happy Travellers' },
      { value: '50+', label: 'Destinations' },
      { value: '5★', label: 'Rated Service' }
    ]
  },
  about: {
    subtitle: 'Our Philosophy',
    title: 'Crafting Travel Experiences That Stay With You Forever',
    paragraphs: [
      "TRAVANOVAX was founded to solve a simple challenge: turning travel planning from a chore into a joy. We believe a holiday should be an inspiring escape, not an endless checklist of bookings, hotel reviews, and visa applications.",
      "Whether you dream of watch-buying trips in Switzerland, romantic beach retreats in the Maldives, family tours through Europe, or exploring hidden corners of Kashmir and Kerala, we tailor every single itinerary to fit your unique pace and travel style.",
      "From coordinating complex visa appointments to booking boutique stays and 24/7 on-trip assistance, our team handles all the details behind the scenes. You simply choose the destination, pack your bags, and live the experience."
    ],
    highlights: [
      { icon: 'Globe', text: 'Custom International & Domestic Escapes' },
      { icon: 'Heart', text: 'Bespoke, Human-First Travel Design' },
      { icon: 'Sparkles', text: '100% Honest Pricing, Zero Hidden Fees' },
      { icon: 'CheckCircle2', text: 'Complete Visas, Flights & Stays Handled' }
    ]
  },
  services: {
    subtitle: 'What We Do',
    title: 'Everything Your Trip Needs',
    description: "One call, one team, complete peace of mind — we cover it all so you don't have to juggle ten different apps and websites.",
    services: [
      {
        icon: 'Package',
        title: 'Holiday Packages',
        description: 'Thoughtfully designed holidays — honeymoons, family trips, group tours, and solo adventures — built around what matters to you, not a template.',
        color: 'from-[#1c4d6f] to-[#1a7fa8]'
      },
      {
        icon: 'Plane',
        title: 'Flight Booking',
        description: 'We search, compare, and book the best fares so you never overpay. Domestic, international, multi-city — with flexible options and zero hidden charges.',
        color: 'from-[#e38d37] to-[#f0b87a]'
      },
      {
        icon: 'Hotel',
        title: 'Hotel & Resort Stays',
        description: "From cosy boutique guesthouses to five-star beach resorts — handpicked for quality, value, and location, with rates you won't find on your own.",
        color: 'from-[#1c4d6f] to-[#1a7fa8]'
      },
      {
        icon: 'FileCheck',
        title: 'Visa Assistance',
        description: 'Confused about which documents to submit? We guide you through every step — checklists, form filling, appointment booking — so your visa application is stress-free.',
        color: 'from-[#e38d37] to-[#f0b87a]'
      }
    ]
  },
  testimonials: {
    subtitle: 'What Travellers Say',
    title: 'Real Stories, Real Trips',
    reviews: [
      {
        name: 'Priya Sharma',
        location: 'Mumbai',
        initials: 'PS',
        stars: 5,
        tag: 'Booked: Bali Honeymoon',
        quote: "Every detail was perfect. We didn't have to think about a single thing."
      },
      {
        name: 'Rahul Mehta',
        location: 'Pune',
        initials: 'RM',
        stars: 5,
        tag: 'Booked: Europe Family Tour',
        quote: 'Travelling to 5 countries with two kids — they made it completely seamless.'
      },
      {
        name: 'Karan Joshi',
        location: 'Delhi',
        initials: 'KJ',
        stars: 5,
        tag: 'Booked: Thailand Solo Trip',
        quote: 'First-time solo traveller and I had the best experience of my life.'
      }
    ]
  }
};

// Simulated Lead Submissions (used in demo mode)
const DEMO_LEADS = [
  { timestamp: '2026-07-03 10:24', name: 'Arjun Verma', email: 'arjun.verma@gmail.com', phone: '+91 98234 56789', destination: 'Switzerland Family Getaway (June, 8 days)' },
  { timestamp: '2026-07-02 18:41', name: 'Neha Gupta', email: 'neha.g@outlook.com', phone: '+91 99112 23344', destination: 'Maldives Honeymoon Resort, water villa (Oct, 5 days)' },
  { timestamp: '2026-07-01 14:12', name: 'Vikram Malhotra', email: 'vikram.m@corporates.in', phone: '+91 98100 98100', destination: 'Kashmir Trekking Trip with friends (Aug, 7 days)' }
];

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('leads'); // leads | content
  
  // App states
  const [leads, setLeads] = useState([]);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [contentSaving, setContentSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // ─── Auth Handling ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isDemoMode) {
      // In demo mode, check local storage for a mock user session
      const savedUser = localStorage.getItem('travanovax_mock_admin');
      if (savedUser) setUser({ email: savedUser });
      setLoading(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });
      return unsubscribe;
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!email.trim() || !password.trim()) {
      setLoginError('Email and password are required.');
      return;
    }

    if (isDemoMode) {
      // Mock login validation
      if (email === 'admin@travanovax.com' && password === 'admin123') {
        localStorage.setItem('travanovax_mock_admin', email);
        setUser({ email });
      } else {
        setLoginError('Invalid credentials. Use admin@travanovax.com / admin123 for Demo Mode.');
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        setLoginError(err.message.replace('Firebase: ', ''));
      }
    }
  };

  const handleLogout = async () => {
    if (isDemoMode) {
      localStorage.removeItem('travanovax_mock_admin');
      setUser(null);
    } else {
      await signOut(auth);
    }
  };

  // ─── Fetching Data ────────────────────────────────────────────────────────
  const fetchLeads = async () => {
    setLeadsLoading(true);
    const execUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

    if (execUrl) {
      try {
        const response = await fetch(execUrl);
        if (response.ok) {
          const data = await response.json();
          setLeads(data);
        } else {
          console.error("Failed to fetch Google Sheet leads");
        }
      } catch (err) {
        console.error("Network error fetching leads:", err);
      } finally {
        setLeadsLoading(false);
      }
    } else {
      // Demo mode / No sheet URL
      setTimeout(() => {
        const savedLeads = localStorage.getItem('travanovax_simulated_leads');
        if (savedLeads) {
          setLeads(JSON.parse(savedLeads));
        } else {
          setLeads(DEMO_LEADS);
        }
        setLeadsLoading(false);
      }, 800);
    }
  };

  const fetchContent = async () => {
    if (isDemoMode) {
      const savedContent = localStorage.getItem('travanovax_editable_content');
      if (savedContent) {
        setContent(JSON.parse(savedContent));
      } else {
        setContent(DEFAULT_CONTENT);
      }
    } else {
      try {
        const docRef = doc(db, "siteContent", "content");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          setContent(DEFAULT_CONTENT);
        }
      } catch (err) {
        console.error("Error fetching Firestore content:", err);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchLeads();
      fetchContent();
    }
  }, [user]);

  // ─── Content Updates ──────────────────────────────────────────────────────
  const handleSaveContent = async () => {
    setContentSaving(true);
    if (isDemoMode) {
      localStorage.setItem('travanovax_editable_content', JSON.stringify(content));
      setTimeout(() => {
        setContentSaving(false);
        alert('Content saved to browser LocalStorage! (Demo Mode)');
      }, 600);
    } else {
      try {
        await setDoc(doc(db, "siteContent", "content"), content);
        alert('Content synced successfully to Firestore live database!');
      } catch (err) {
        alert('Error saving content: ' + err.message);
      } finally {
        setContentSaving(false);
      }
    }
  };

  // ─── Filtered Leads ────────────────────────────────────────────────────────
  const filteredLeads = leads.filter(lead => {
    const term = searchTerm.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(term) ||
      lead.email?.toLowerCase().includes(term) ||
      lead.phone?.toLowerCase().includes(term) ||
      lead.destination?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <RefreshCw size={36} className="text-[#1c4d6f] animate-spin" />
        <span className="text-gray-500 text-sm mt-3 font-semibold">Initialising Control Panel...</span>
      </div>
    );
  }

  // ─── Login View ───────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1c4d6f] to-[#071a24] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#1c4d6f] text-white px-8 py-8 text-center relative">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <ShieldCheck size={26} className="text-[#e38d37]" />
            </div>
            <h2 className="text-2xl font-black tracking-tight">TRAVANOVAX Admin</h2>
            <p className="text-white/60 text-xs mt-1">Authorized travel design partners only</p>
            {isDemoMode && (
              <span className="absolute top-3 right-3 bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                Demo Mode
              </span>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 flex flex-col gap-5">
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3.5 rounded-xl leading-relaxed">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="admin@travanovax.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1c4d6f]/20 focus:border-[#1c4d6f] transition-all bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1c4d6f]/20 focus:border-[#1c4d6f] transition-all bg-gray-50"
              />
            </div>

            <button
              type="submit"
              className="bg-[#e38d37] hover:bg-[#d17e2e] active:bg-[#c07328] text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#e38d37]/25 flex items-center justify-center gap-2 mt-2"
            >
              <Key size={15} />
              Verify &amp; Sign In
            </button>

            {isDemoMode && (
              <div className="text-[10px] text-gray-400 bg-gray-50 rounded-xl p-3 border border-gray-100 text-center leading-relaxed">
                💡 **Demo Mode active**: You can log in using <br />
                <code className="bg-gray-200 px-1 py-0.5 rounded font-mono font-bold text-gray-600">admin@travanovax.com</code> and password <code className="bg-gray-200 px-1 py-0.5 rounded font-mono font-bold text-gray-600">admin123</code>.
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  // ─── Dashboard View ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100/50 flex flex-col font-sans">
      
      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <header className="bg-[#1c4d6f] text-white px-4 sm:px-8 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="h-8 bg-white/10 rounded-lg px-2.5 flex items-center justify-center border border-white/10">
            <span className="text-[#e38d37] font-black text-sm tracking-widest">T</span>
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg leading-tight">TRAVANOVAX Dashboard</h1>
            <p className="text-[10px] text-white/50">Signed in as {user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white/90 text-xs px-3.5 py-2 rounded-xl transition-all"
          >
            <ArrowLeft size={13} />
            View Site
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-600/90 hover:bg-red-600 text-white text-xs px-3.5 py-2 rounded-xl transition-all shadow hover:shadow-red-600/10"
          >
            <LogOut size={13} />
            Log Out
          </button>
        </div>
      </header>

      {/* ── Control Center Main ───────────────────────────────────────────── */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">

        {/* Info Banner for Demo Mode */}
        {isDemoMode && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-3 rounded-2xl flex items-center justify-between gap-4">
            <div className="leading-relaxed">
              <strong>⚠️ Demo Mode Enabled:</strong> Firebase variables are not set in your project environment. All Leads are simulated, and Content changes will save to your browser's LocalStorage only (re-loads instantly for your testing). Paste your config keys in Vercel settings to go live.
            </div>
          </div>
        )}

        {/* Tab Selector Switches */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200/60 w-fit">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'leads'
                ? 'bg-[#1c4d6f] text-white shadow'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <Users size={16} />
            Leads Management ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'content'
                ? 'bg-[#1c4d6f] text-white shadow'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <FileText size={16} />
            Content Editor
          </button>
        </div>

        {/* ── Tab 1: Leads Panel ────────────────────────────────────────────── */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm p-6 flex flex-col gap-6">
            
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-gray-800">Inquiry Leads</h3>
                <p className="text-gray-400 text-xs mt-0.5">Submissions collected from landing page forms</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search name, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1c4d6f]/20 focus:border-[#1c4d6f] w-48 sm:w-60 bg-gray-50"
                  />
                </div>
                {/* Refresh */}
                <button
                  onClick={fetchLeads}
                  disabled={leadsLoading}
                  className="bg-gray-100 hover:bg-gray-200/80 active:bg-gray-200 text-gray-600 p-2.5 rounded-xl transition-all disabled:opacity-50"
                >
                  <RefreshCw size={14} className={leadsLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-inner bg-gray-50/30">
              <table className="min-w-full divide-y divide-gray-150 text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="px-6 py-4">Submission Date</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Requested Destination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                  {leadsLoading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                        <RefreshCw size={18} className="animate-spin inline mr-2 text-[#1c4d6f]" />
                        Fetching leads dataset...
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                        No matching inquiries found.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-medium">
                          {lead.timestamp || 'Recent'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                          {lead.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`mailto:${lead.email}`} className="text-[#1c4d6f] hover:underline font-medium">{lead.email}</a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          <a href={`tel:${lead.phone?.replace(/\s+/g, '')}`} className="hover:text-[#1c4d6f]">{lead.phone}</a>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate font-medium text-gray-600">
                          {lead.destination}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ── Tab 2: Content Editor Panel ──────────────────────────────────── */}
        {activeTab === 'content' && (
          <div className="flex flex-col gap-6">

            {/* Save bar */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-4 shadow-sm flex items-center justify-between gap-4">
              <div className="px-2">
                <h3 className="text-sm font-bold text-gray-800">Live Editor Config</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Modify headings and stats on your page instantly</p>
              </div>
              <button
                onClick={handleSaveContent}
                disabled={contentSaving}
                className="bg-[#e38d37] hover:bg-[#d17e2e] active:bg-[#c07328] disabled:opacity-75 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-[#e38d37]/20 flex items-center gap-1.5 transition-all"
              >
                {contentSaving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
                Save Changes
              </button>
            </div>

            {/* 1. Hero Content */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-6 shadow-sm flex flex-col gap-5">
              <div>
                <h4 className="font-black text-gray-800 text-sm border-b border-gray-150 pb-2 uppercase tracking-wider text-[#1c4d6f]">1. Hero Section</h4>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Hero Headline (HTML breaks supported)</label>
                <input
                  type="text"
                  value={content.hero.headline}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, headline: e.target.value }
                  })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1c4d6f]/20 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Hero Subheadline</label>
                <textarea
                  rows={2}
                  value={content.hero.subheadline}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, subheadline: e.target.value }
                  })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1c4d6f]/20 bg-gray-50 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Hero Stats Columns</label>
                <div className="grid grid-cols-3 gap-4">
                  {content.hero.stats.map((stat, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-2xl p-4 bg-gray-50 flex flex-col gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Stat Value</label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...content.hero.stats];
                            newStats[idx].value = e.target.value;
                            setContent({ ...content, hero: { ...content.hero, stats: newStats } });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Stat Label</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...content.hero.stats];
                            newStats[idx].label = e.target.value;
                            setContent({ ...content, hero: { ...content.hero, stats: newStats } });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Services Content */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-6 shadow-sm flex flex-col gap-5">
              <div>
                <h4 className="font-black text-gray-800 text-sm border-b border-gray-150 pb-2 uppercase tracking-wider text-[#1c4d6f]">2. Services Section</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Section Subtitle</label>
                  <input
                    type="text"
                    value={content.services.subtitle}
                    onChange={(e) => setContent({
                      ...content,
                      services: { ...content.services, subtitle: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Section Title</label>
                  <input
                    type="text"
                    value={content.services.title}
                    onChange={(e) => setContent({
                      ...content,
                      services: { ...content.services, title: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Section Description</label>
                <textarea
                  rows={2}
                  value={content.services.description}
                  onChange={(e) => setContent({
                    ...content,
                    services: { ...content.services, description: e.target.value }
                  })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-gray-50 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Services List</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.services.services.map((service, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-2xl p-4 bg-gray-50 flex flex-col gap-2">
                      <div className="font-semibold text-xs text-gray-400">Card #{idx + 1}</div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Service Title</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const newServ = [...content.services.services];
                            newServ[idx].title = e.target.value;
                            setContent({ ...content, services: { ...content.services, services: newServ } });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Service Description</label>
                        <textarea
                          rows={2}
                          value={service.description}
                          onChange={(e) => {
                            const newServ = [...content.services.services];
                            newServ[idx].description = e.target.value;
                            setContent({ ...content, services: { ...content.services, services: newServ } });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. About Section */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-6 shadow-sm flex flex-col gap-5">
              <div>
                <h4 className="font-black text-gray-800 text-sm border-b border-gray-150 pb-2 uppercase tracking-wider text-[#1c4d6f]">3. About Section</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Section Subtitle</label>
                  <input
                    type="text"
                    value={content.about.subtitle}
                    onChange={(e) => setContent({
                      ...content,
                      about: { ...content.about, subtitle: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Section Title</label>
                  <input
                    type="text"
                    value={content.about.title}
                    onChange={(e) => setContent({
                      ...content,
                      about: { ...content.about, title: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Highlights List</label>
                <div className="grid grid-cols-2 gap-4">
                  {content.about.highlights.map((h, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-2xl p-4 bg-gray-50 flex flex-col gap-2">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase">Highlight #{idx + 1}</label>
                      <input
                        type="text"
                        value={h.text}
                        onChange={(e) => {
                          const newHigh = [...content.about.highlights];
                          newHigh[idx].text = e.target.value;
                          setContent({ ...content, about: { ...content.about, highlights: newHigh } });
                        }}
                        className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Testimonials Content */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-6 shadow-sm flex flex-col gap-5">
              <div>
                <h4 className="font-black text-gray-800 text-sm border-b border-gray-150 pb-2 uppercase tracking-wider text-[#1c4d6f]">4. Testimonials</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Section Subtitle</label>
                  <input
                    type="text"
                    value={content.testimonials.subtitle}
                    onChange={(e) => setContent({
                      ...content,
                      testimonials: { ...content.testimonials, subtitle: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Section Title</label>
                  <input
                    type="text"
                    value={content.testimonials.title}
                    onChange={(e) => setContent({
                      ...content,
                      testimonials: { ...content.testimonials, title: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Review Cards</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {content.testimonials.reviews.map((rev, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-2xl p-4 bg-gray-50 flex flex-col gap-2.5">
                      <div className="font-semibold text-xs text-gray-400">Review Card #{idx + 1}</div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Author Name</label>
                        <input
                          type="text"
                          value={rev.name}
                          onChange={(e) => {
                            const newRev = [...content.testimonials.reviews];
                            newRev[idx].name = e.target.value;
                            setContent({ ...content, testimonials: { ...content.testimonials, reviews: newRev } });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Author Initials</label>
                        <input
                          type="text"
                          maxLength={2}
                          value={rev.initials}
                          onChange={(e) => {
                            const newRev = [...content.testimonials.reviews];
                            newRev[idx].initials = e.target.value;
                            setContent({ ...content, testimonials: { ...content.testimonials, reviews: newRev } });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Trip Booked Tag</label>
                        <input
                          type="text"
                          value={rev.tag}
                          onChange={(e) => {
                            const newRev = [...content.testimonials.reviews];
                            newRev[idx].tag = e.target.value;
                            setContent({ ...content, testimonials: { ...content.testimonials, reviews: newRev } });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Review Quote</label>
                        <textarea
                          rows={3}
                          value={rev.quote}
                          onChange={(e) => {
                            const newRev = [...content.testimonials.reviews];
                            newRev[idx].quote = e.target.value;
                            setContent({ ...content, testimonials: { ...content.testimonials, reviews: newRev } });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-4 shadow-sm flex items-center justify-end gap-4 mb-8">
              <button
                onClick={handleSaveContent}
                disabled={contentSaving}
                className="bg-[#e38d37] hover:bg-[#d17e2e] active:bg-[#c07328] disabled:opacity-75 text-white text-xs font-bold px-8 py-3 rounded-xl shadow-lg shadow-[#e38d37]/20 flex items-center gap-1.5 transition-all"
              >
                {contentSaving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
                Save Content Changes
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

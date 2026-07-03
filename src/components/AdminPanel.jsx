import React, { useState, useEffect } from 'react';
import { LogOut, Save, Users, FileText, Search, Plus, Trash2, ArrowLeft, RefreshCw, Key, ShieldCheck, MapPin, Edit, Globe, ChevronRight } from 'lucide-react';
import { isDemoMode, supabase } from '../supabaseClient';

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

// Initial local packages fallback
const DEFAULT_DESTINATIONS = [
  {
    slug: 'bali',
    title: 'Bali Tropical Escapes',
    tagline: 'Private pool villas, scenic temples, and pristine beaches — tailored for romantic and family retreats.',
    hero_image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    duration: '6 Days / 5 Nights',
    price_estimate: '₹45,000 per person onwards',
    highlights: [
      'Private luxury pool villa stays in Seminyak or Ubud',
      'Curated temple tours (Tanah Lot, Uluwatu sunset fire dance)',
      'Adventurous water sports in Nusa Dua & Nusa Penida island cruise',
      'Exclusive Balinese spa treatment & romantic candle-lit dinner'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Seminyak Private Pool Villa Check-in' },
      { day: 'Day 2', title: 'Ubud Art Villages, Monkey Forest & Tegenungan Waterfall' },
      { day: 'Day 3', title: 'Nusa Penida Island Day Cruise with snorkelling' },
      { day: 'Day 4', title: 'Water Sports in Tanjung Benoa & Uluwatu Temple Sunset Tour' },
      { day: 'Day 5', title: 'Leisure Day & Evening Romantic Beachside Dinner' },
      { day: 'Day 6', title: 'Souvenir shopping & departure flight back home' }
    ]
  },
  {
    slug: 'europe',
    title: 'European Grandeur Tour',
    tagline: 'Experience Paris, Switzerland, and Venice in one seamless trip. Complete Schengen visa support included.',
    hero_image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1200&q=80',
    duration: '10 Days / 9 Nights',
    price_estimate: '₹1,85,000 per person onwards',
    highlights: [
      'Boutique hotel stays in central Paris & scenic Swiss towns',
      'Schengen visa appointment booking and complete document assembly',
      'Mount Titlis rotating cable car ride and Paris Seine river cruise',
      'Venice private Gondola ride & guided colosseum walk in Rome'
    ],
    itinerary: [
      { day: 'Day 1-2', title: 'Welcome to Paris — Eiffel Tower Tour & Seine River Cruise' },
      { day: 'Day 3', title: 'High-speed train to Lucerne, Switzerland' },
      { day: 'Day 4-5', title: 'Mount Titlis snow excursion & scenic Lucerne lake walk' },
      { day: 'Day 6', title: 'Train ride through the Alps to Venice, Italy' },
      { day: 'Day 7', title: 'Venice Canal Gondola cruise & St. Mark\'s square guided walk' },
      { day: 'Day 8-9', title: 'Rome exploration — Colosseum & Vatican Museums tour' },
      { day: 'Day 10', title: 'Farewell Italian breakfast & return flight back to India' }
    ]
  },
  {
    slug: 'switzerland',
    title: 'Swiss Alpine Luxury',
    tagline: 'Snow-capped peaks, scenic train journeys, and watch-making tours — planned for discerning travelers.',
    hero_image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    duration: '8 Days / 7 Nights',
    price_estimate: '₹2,20,000 per person onwards',
    highlights: [
      'Premium Swiss Travel Pass for first-class train journeys',
      'Stay in luxury alpine chalets with panoramic mountain views',
      'Private tour of watch ateliers in Geneva or Zurich',
      'Jungfraujoch - Top of Europe cogwheel train excursion'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Zurich & scenic train transit to Interlaken' },
      { day: 'Day 2', title: 'Jungfraujoch cogwheel train to the highest station in Europe' },
      { day: 'Day 3', title: 'Explore Lake Brienz & Lake Thun cruise' },
      { day: 'Day 4', title: 'GoldenPass Express panoramic train to Montreux' },
      { day: 'Day 5', title: 'Geneva private city tour & watch atelier workshop visit' },
      { day: 'Day 6', title: 'Transit to Zermatt — Matterhorn mountain views' },
      { day: 'Day 7', title: 'Gornergrat rack railway excursion & alpine hiking trail' },
      { day: 'Day 8', title: 'Transit to Zurich airport for departure flight' }
    ]
  }
];

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
  const [activeTab, setActiveTab] = useState('leads'); // leads | content | destinations
  
  // App states
  const [leads, setLeads] = useState([]);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [destinations, setDestinations] = useState([]);
  
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [contentSaving, setContentSaving] = useState(false);
  const [destSaving, setDestSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Destination Form Editor States
  const [selectedDest, setSelectedDest] = useState(null); // null means adding a new one
  const [destForm, setDestForm] = useState({
    slug: '',
    title: '',
    tagline: '',
    hero_image: '',
    duration: '',
    price_estimate: '',
    highlights: [''],
    itinerary: [{ day: '', title: '' }]
  });

  // ─── Auth Handling ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isDemoMode) {
      const savedUser = localStorage.getItem('travanovax_mock_admin');
      if (savedUser) setUser({ email: savedUser });
      setLoading(false);
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
      return () => subscription.unsubscribe();
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
      if (email === 'admin@travanovax.com' && password === 'admin123') {
        localStorage.setItem('travanovax_mock_admin', email);
        setUser({ email });
      } else {
        setLoginError('Invalid credentials. Use admin@travanovax.com / admin123 for Demo Mode.');
      }
    } else {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } catch (err) {
        setLoginError(err.message);
      }
    }
  };

  const handleLogout = async () => {
    if (isDemoMode) {
      localStorage.removeItem('travanovax_mock_admin');
      setUser(null);
    } else {
      await supabase.auth.signOut();
    }
  };

  // ─── Fetching Data ────────────────────────────────────────────────────────
  const fetchLeads = async () => {
    setLeadsLoading(true);
    if (!isDemoMode && supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        
        const formatted = data.map(item => ({
          timestamp: item.created_at ? new Date(item.created_at).toLocaleString('en-IN', { hour12: false }).replace(',', '') : 'Recent',
          name: item.name,
          email: item.email,
          phone: item.phone,
          destination: item.destination
        }));
        setLeads(formatted);
      } catch (err) {
        console.error("Error fetching leads:", err);
      } finally {
        setLeadsLoading(false);
      }
    } else {
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
        const { data, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('id', 'content')
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
            setContent(DEFAULT_CONTENT);
          } else {
            throw error;
          }
        } else if (data?.content) {
          setContent(data.content);
        }
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    }
  };

  const fetchDestinations = async () => {
    if (isDemoMode) {
      const savedDest = localStorage.getItem('travanovax_editable_destinations');
      if (savedDest) {
        setDestinations(JSON.parse(savedDest));
      } else {
        setDestinations(DEFAULT_DESTINATIONS);
      }
    } else {
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .order('updated_at', { ascending: false });
        if (error) throw error;
        setDestinations(data || []);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchLeads();
      fetchContent();
      fetchDestinations();
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
        const { error } = await supabase
          .from('site_content')
          .upsert({ id: 'content', content: content, updated_at: new Date().toISOString() });
        if (error) throw error;
        alert('Content synced successfully to Supabase database!');
      } catch (err) {
        alert('Error saving content: ' + err.message);
      } finally {
        setContentSaving(false);
      }
    }
  };

  // ─── Destination CRUD Operations ──────────────────────────────────────────
  const handleEditDest = (dest) => {
    setSelectedDest(dest);
    setDestForm({
      slug: dest.slug,
      title: dest.title,
      tagline: dest.tagline,
      hero_image: dest.hero_image,
      duration: dest.duration,
      price_estimate: dest.price_estimate,
      highlights: dest.highlights.length ? dest.highlights : [''],
      itinerary: dest.itinerary.length ? dest.itinerary : [{ day: '', title: '' }]
    });
  };

  const handleAddNewDest = () => {
    setSelectedDest(null);
    setDestForm({
      slug: '',
      title: '',
      tagline: '',
      hero_image: '',
      duration: '',
      price_estimate: '',
      highlights: [''],
      itinerary: [{ day: 'Day 1', title: '' }]
    });
  };

  const handleSaveDest = async (e) => {
    e.preventDefault();
    if (!destForm.slug.trim() || !destForm.title.trim()) {
      alert('Slug and Title are required.');
      return;
    }

    setDestSaving(true);
    const cleanedForm = {
      ...destForm,
      slug: destForm.slug.toLowerCase().trim().replace(/\s+/g, '-'),
      highlights: destForm.highlights.filter(h => h.trim() !== ''),
      itinerary: destForm.itinerary.filter(it => it.day.trim() !== '' && it.title.trim() !== '')
    };

    if (isDemoMode) {
      const allDests = [...destinations];
      const matchIdx = allDests.findIndex(d => d.slug === cleanedForm.slug);
      if (matchIdx >= 0) {
        allDests[matchIdx] = cleanedForm;
      } else {
        allDests.push(cleanedForm);
      }
      localStorage.setItem('travanovax_editable_destinations', JSON.stringify(allDests));
      setDestinations(allDests);
      setDestSaving(false);
      alert('Destination page saved to LocalStorage! (Demo Mode)');
      handleAddNewDest();
    } else {
      try {
        const { error } = await supabase
          .from('destinations')
          .upsert({
            slug: cleanedForm.slug,
            title: cleanedForm.title,
            tagline: cleanedForm.tagline,
            hero_image: cleanedForm.hero_image,
            duration: cleanedForm.duration,
            price_estimate: cleanedForm.price_estimate,
            highlights: cleanedForm.highlights,
            itinerary: cleanedForm.itinerary,
            updated_at: new Date().toISOString()
          });
        if (error) throw error;
        alert('Destination page saved successfully to Supabase!');
        fetchDestinations();
        handleAddNewDest();
      } catch (err) {
        alert('Error saving destination: ' + err.message);
      } finally {
        setDestSaving(false);
      }
    }
  };

  const handleDeleteDest = async (slug) => {
    if (!confirm(`Are you sure you want to delete the destination page: /destinations/${slug}?`)) return;

    if (isDemoMode) {
      const filtered = destinations.filter(d => d.slug !== slug);
      localStorage.setItem('travanovax_editable_destinations', JSON.stringify(filtered));
      setDestinations(filtered);
      alert('Deleted from LocalStorage! (Demo Mode)');
    } else {
      try {
        const { error } = await supabase
          .from('destinations')
          .delete()
          .eq('slug', slug);
        if (error) throw error;
        alert('Deleted successfully from Supabase!');
        fetchDestinations();
      } catch (err) {
        alert('Error deleting destination: ' + err.message);
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
          <div className="bg-[#1c4d6f] text-white px-8 py-8 text-center relative">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <ShieldCheck size={26} className="text-[#e38d37]" />
            </div>
            <h2 className="text-2xl font-black tracking-tight">TRAVANOVAX Admin</h2>
            <p className="text-white/60 text-xs mt-1">Authorized travel design partners only (Supabase)</p>
            {isDemoMode && (
              <span className="absolute top-3 right-3 bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                Demo Mode
              </span>
            )}
          </div>

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
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1c4d6f]/20 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1c4d6f]/20 bg-gray-50"
              />
            </div>

            <button
              type="submit"
              className="bg-[#e38d37] hover:bg-[#d17e2e] active:bg-[#c07328] text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#e38d37]/25 flex items-center justify-center gap-2 mt-2"
            >
              <Key size={15} />
              Verify &amp; Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100/50 flex flex-col font-sans">
      
      {/* ── Header Navbar ────────────────────────────────────────────────── */}
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
            className="flex items-center gap-1.5 bg-red-600/90 hover:bg-red-600 text-white text-xs px-3.5 py-2 rounded-xl transition-all shadow"
          >
            <LogOut size={13} />
            Log Out
          </button>
        </div>
      </header>

      {/* ── Main Container ───────────────────────────────────────────────── */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">

        {/* Tab Switches */}
        <div className="flex flex-wrap bg-white p-1 rounded-xl shadow-sm border border-gray-200/60 w-fit gap-1">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'leads'
                ? 'bg-[#1c4d6f] text-white shadow'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <Users size={16} />
            Leads ({leads.length})
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
            Page Content
          </button>
          <button
            onClick={() => setActiveTab('destinations')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'destinations'
                ? 'bg-[#1c4d6f] text-white shadow'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <MapPin size={16} />
            Destination Guides ({destinations.length})
          </button>
        </div>

        {/* ── Tab 1: Leads Panel ────────────────────────────────────────────── */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm p-6 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-gray-800">Inquiry Leads</h3>
                <p className="text-gray-400 text-xs mt-0.5">Submissions collected from landing page forms</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none w-48 sm:w-60 bg-gray-50"
                  />
                </div>
                <button
                  onClick={fetchLeads}
                  disabled={leadsLoading}
                  className="bg-gray-100 hover:bg-gray-200/80 p-2.5 rounded-xl transition-all disabled:opacity-50"
                >
                  <RefreshCw size={14} className={leadsLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

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
                        Fetching leads...
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                        No inquiries found.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-medium">{lead.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">{lead.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`mailto:${lead.email}`} className="text-[#1c4d6f] hover:underline font-medium">{lead.email}</a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{lead.phone}</td>
                        <td className="px-6 py-4 max-w-xs truncate font-medium text-gray-600">{lead.destination}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Tab 2: Page Content Panel ────────────────────────────────────── */}
        {activeTab === 'content' && (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl border border-gray-200/60 p-4 shadow-sm flex items-center justify-between gap-4">
              <div className="px-2">
                <h3 className="text-sm font-bold text-gray-800">Dynamic Content Config</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Modify headings, custom statistics, and testimonials</p>
              </div>
              <button
                onClick={handleSaveContent}
                disabled={contentSaving}
                className="bg-[#e38d37] hover:bg-[#d17e2e] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow flex items-center gap-1.5 transition-all"
              >
                {contentSaving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
                Save Changes
              </button>
            </div>

            {/* 1. Hero Content */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-6 shadow-sm flex flex-col gap-5">
              <h4 className="font-black text-gray-800 text-sm border-b pb-2 uppercase tracking-wider text-[#1c4d6f]">1. Hero Section</h4>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Hero Headline</label>
                <input
                  type="text"
                  value={content.hero.headline}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, headline: e.target.value }
                  })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50"
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
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 resize-none"
                />
              </div>
            </div>

            {/* 2. Services Content */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-6 shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-black text-gray-800 text-sm uppercase tracking-wider text-[#1c4d6f]">2. Services Section</h4>
                <button
                  onClick={() => {
                    const newServ = [...content.services.services, { icon: 'Package', title: 'New Service Option', description: 'Add your service details here...', color: 'from-[#1c4d6f] to-[#1a7fa8]' }];
                    setContent({ ...content, services: { ...content.services, services: newServ } });
                  }}
                  className="flex items-center gap-1 text-[10px] font-bold text-[#e38d37] hover:underline"
                >
                  <Plus size={12} /> Add Service Card
                </button>
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
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.services.services.map((service, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-2xl p-4 bg-gray-50 flex flex-col gap-3 relative">
                    <button
                      onClick={() => {
                        const newServ = content.services.services.filter((_, i) => i !== idx);
                        setContent({ ...content, services: { ...content.services, services: newServ } });
                      }}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </button>
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
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Icon (Package / Plane / Hotel / FileCheck)</label>
                      <input
                        type="text"
                        value={service.icon}
                        onChange={(e) => {
                          const newServ = [...content.services.services];
                          newServ[idx].icon = e.target.value;
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

            {/* 3. About Us & Testimonials */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-6 shadow-sm flex flex-col gap-5">
              <h4 className="font-black text-gray-800 text-sm border-b pb-2 uppercase tracking-wider text-[#1c4d6f]">3. About Section</h4>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Section Title</label>
                <input
                  type="text"
                  value={content.about.title}
                  onChange={(e) => setContent({
                    ...content,
                    about: { ...content.about, title: e.target.value }
                  })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50"
                />
              </div>
            </div>

            {/* Save Content Bottom */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-4 shadow-sm flex items-center justify-end">
              <button
                onClick={handleSaveContent}
                disabled={contentSaving}
                className="bg-[#e38d37] hover:bg-[#d17e2e] text-white text-xs font-bold px-8 py-3 rounded-xl shadow flex items-center gap-1.5 transition-all"
              >
                {contentSaving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
                Save Content Changes
              </button>
            </div>
          </div>
        )}

        {/* ── Tab 3: Destinations Manager (Full CRUD) ──────────────────────── */}
        {activeTab === 'destinations' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col: Lists all dynamic destination subpages */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <div className="bg-white rounded-3xl border border-gray-200/60 p-5 shadow-sm">
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <h3 className="font-bold text-gray-800 text-sm">Destination Guides</h3>
                  <button
                    onClick={handleAddNewDest}
                    className="flex items-center gap-1 bg-[#e38d37] hover:bg-[#d17e2e] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow"
                  >
                    <Plus size={11} /> Create New
                  </button>
                </div>

                <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-1">
                  {destinations.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-xs">
                      No custom destination pages loaded.
                    </div>
                  ) : (
                    destinations.map((d) => (
                      <div
                        key={d.slug}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          selectedDest?.slug === d.slug
                            ? 'bg-[#1c4d6f]/5 border-[#1c4d6f]/40'
                            : 'border-gray-150 hover:bg-gray-50'
                        }`}
                        onClick={() => handleEditDest(d)}
                      >
                        <div className="min-w-0">
                          <h4 className="font-bold text-gray-800 text-xs truncate">{d.title}</h4>
                          <span className="text-[10px] text-gray-400 font-mono font-medium block mt-0.5">/destinations/{d.slug}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleEditDest(d); }}
                            className="p-1.5 text-gray-500 hover:text-[#1c4d6f] hover:bg-gray-100 rounded-lg"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteDest(d.slug); }}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Cols: Form Editor */}
            <form onSubmit={handleSaveDest} className="lg:col-span-2 bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-8 shadow-sm flex flex-col gap-5">
              <div className="border-b pb-3 mb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-gray-800 text-base flex items-center gap-1.5">
                    <Globe size={18} className="text-[#e38d37]" />
                    {selectedDest ? `Edit Guide: ${selectedDest.title}` : 'Create Brand New Destination Page'}
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Define detailed day-by-day itineraries and pricing</p>
                </div>
                <button
                  type="submit"
                  disabled={destSaving}
                  className="bg-[#e38d37] hover:bg-[#d17e2e] active:bg-[#c07328] disabled:opacity-75 text-white text-xs font-bold px-6 py-2 rounded-xl shadow flex items-center gap-1.5 transition-all"
                >
                  {destSaving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
                  Save Guide
                </button>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Page Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bali Tropical Escapes"
                    value={destForm.title}
                    onChange={(e) => setDestForm({ ...destForm, title: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs bg-gray-50 focus:ring-2 focus:ring-[#1c4d6f]/10 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">URL Slug (lowercase, URL-friendly)</label>
                  <input
                    type="text"
                    required
                    disabled={!!selectedDest} // Lock slug on edit to prevent path breaking
                    placeholder="e.g. bali-escapes"
                    value={destForm.slug}
                    onChange={(e) => setDestForm({ ...destForm, slug: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs bg-gray-50 disabled:opacity-60 focus:ring-2 focus:ring-[#1c4d6f]/10 outline-none"
                  />
                </div>
              </div>

              {/* Tagline & Hero image */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Tagline description</label>
                <input
                  type="text"
                  placeholder="Private pool villas, scenic Ubud temples, and pristine beach cruises..."
                  value={destForm.tagline}
                  onChange={(e) => setDestForm({ ...destForm, tagline: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs bg-gray-50 focus:ring-2 focus:ring-[#1c4d6f]/10 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Hero Image URL</label>
                  <input
                    type="text"
                    placeholder="Unsplash image URL..."
                    value={destForm.hero_image}
                    onChange={(e) => setDestForm({ ...destForm, hero_image: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs bg-gray-50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 6 Days / 5 Nights"
                    value={destForm.duration}
                    onChange={(e) => setDestForm({ ...destForm, duration: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs bg-gray-50 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Price Estimate</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹45,000 per person"
                    value={destForm.price_estimate}
                    onChange={(e) => setDestForm({ ...destForm, price_estimate: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs bg-gray-50 outline-none"
                  />
                </div>
              </div>

              {/* Highlights Manager */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase">Key Package Highlights</label>
                  <button
                    type="button"
                    onClick={() => setDestForm({ ...destForm, highlights: [...destForm.highlights, ''] })}
                    className="text-[10px] font-bold text-[#e38d37] hover:underline"
                  >
                    + Add Highlight Line
                  </button>
                </div>
                <div className="flex flex-col gap-2.5">
                  {destForm.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Private pool villa stay..."
                        value={h}
                        onChange={(e) => {
                          const newHigh = [...destForm.highlights];
                          newHigh[idx] = e.target.value;
                          setDestForm({ ...destForm, highlights: newHigh });
                        }}
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newHigh = destForm.highlights.filter((_, i) => i !== idx);
                          setDestForm({ ...destForm, highlights: newHigh });
                        }}
                        className="text-red-500 p-1.5 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Schedule Manager */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase">Day Itinerary Schedule</label>
                  <button
                    type="button"
                    onClick={() => {
                      const nextDay = `Day ${destForm.itinerary.length + 1}`;
                      setDestForm({ ...destForm, itinerary: [...destForm.itinerary, { day: nextDay, title: '' }] });
                    }}
                    className="text-[10px] font-bold text-[#e38d37] hover:underline"
                  >
                    + Add Day Schedule
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {destForm.itinerary.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-2 items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <div className="col-span-1">
                        <input
                          type="text"
                          required
                          value={item.day}
                          onChange={(e) => {
                            const newItin = [...destForm.itinerary];
                            newItin[idx].day = e.target.value;
                            setDestForm({ ...destForm, itinerary: newItin });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs bg-white font-bold"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          required
                          placeholder="Excursion details..."
                          value={item.title}
                          onChange={(e) => {
                            const newItin = [...destForm.itinerary];
                            newItin[idx].title = e.target.value;
                            setDestForm({ ...destForm, itinerary: newItin });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const newItin = destForm.itinerary.filter((_, i) => i !== idx);
                            setDestForm({ ...destForm, itinerary: newItin });
                          }}
                          className="text-red-500 p-1.5 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}

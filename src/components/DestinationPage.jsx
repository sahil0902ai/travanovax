import React, { useEffect, useState } from 'react';
import { ArrowLeft, Send, CheckCircle, Globe, Award, Sparkles, MapPin, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Curated travel guides for popular Indian traveler destinations
const DESTINATION_DATA = {
  bali: {
    title: 'Bali Tropical Escapes',
    tagline: 'Private pool villas, scenic temples, and pristine beaches — tailored for romantic and family retreats.',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    duration: '6 Days / 5 Nights',
    priceEstimate: '₹45,000 per person onwards',
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
  europe: {
    title: 'European Grandeur Tour',
    tagline: 'Experience Paris, Switzerland, and Venice in one seamless trip. Complete Schengen visa support included.',
    heroImage: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1200&q=80',
    duration: '10 Days / 9 Nights',
    priceEstimate: '₹1,85,000 per person onwards',
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
  switzerland: {
    title: 'Swiss Alpine Luxury',
    tagline: 'Snow-capped peaks, scenic train journeys, and watch-making tours — planned for discerning travelers.',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    duration: '8 Days / 7 Nights',
    priceEstimate: '₹2,20,000 per person onwards',
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
};

export default function DestinationPage({ slug, onOpenQuote }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const loadDest = async () => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const normalize = (raw) => {
        if (!raw) return null;
        return {
          title: raw.title || '',
          tagline: raw.tagline || '',
          heroImage: raw.hero_image || raw.heroImage || '',
          duration: raw.duration || '',
          priceEstimate: raw.price_estimate || raw.priceEstimate || '',
          highlights: raw.highlights || [],
          itinerary: raw.itinerary || []
        };
      };

      if (!supabaseUrl || !supabaseAnonKey) {
        const savedRaw = localStorage.getItem('travanovax_editable_destinations');
        if (savedRaw) {
          const parsed = JSON.parse(savedRaw);
          const match = parsed.find(d => d.slug === slug.toLowerCase());
          if (match) {
            setData(normalize(match));
            setLoading(false);
            return;
          }
        }
        setData(normalize(DESTINATION_DATA[slug.toLowerCase()] || DESTINATION_DATA.bali));
        setLoading(false);
      } else {
        try {
          const url = `${supabaseUrl}/rest/v1/destinations?slug=eq.${slug.toLowerCase()}&select=*`;
          const response = await fetch(url, {
            headers: {
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${supabaseAnonKey}`
            }
          });
          if (response.ok) {
            const list = await response.json();
            if (list && list.length > 0) {
              setData(normalize(list[0]));
            } else {
              setData(normalize(DESTINATION_DATA[slug.toLowerCase()] || DESTINATION_DATA.bali));
            }
          } else {
            setData(normalize(DESTINATION_DATA[slug.toLowerCase()] || DESTINATION_DATA.bali));
          }
        } catch (err) {
          console.error("Failed to load destination details:", err);
          setData(normalize(DESTINATION_DATA[slug.toLowerCase()] || DESTINATION_DATA.bali));
        } finally {
          setLoading(false);
        }
      }
    };
    loadDest();
  }, [slug]);

  const handleBack = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#1c4d6f] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs text-gray-500 mt-2 font-semibold">Loading itinerary...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar header placeholder */}
      <header className="sticky top-0 z-40 bg-[#1c4d6f] text-white px-4 sm:px-8 py-4 flex items-center justify-between shadow-md">
        <a 
          href="/" 
          onClick={handleBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold hover:text-[#e38d37] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </a>
        <span className="font-black tracking-tight text-lg">
          TRAVANOVA<span className="text-[#e38d37]">X</span>
        </span>
      </header>

      {/* Hero Banner */}
      <section className="relative h-[45vh] sm:h-[60vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={data.heroImage} 
            alt={data.title}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c4d6f]/70 via-[#1c4d6f]/40 to-gray-50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <span className="inline-block bg-[#e38d37] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Curated Package
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md mb-4">
            {data.title}
          </h1>
          <p className="text-white/90 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow">
            {data.tagline}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
        
        {/* Left 2 Cols: Details & Itinerary */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-200/50 shadow-sm flex flex-col items-center justify-center text-center">
              <Calendar className="text-[#e38d37] mb-1" size={20} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duration</span>
              <span className="text-xs sm:text-sm font-bold text-[#1c4d6f] mt-0.5">{data.duration}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200/50 shadow-sm flex flex-col items-center justify-center text-center">
              <Compass className="text-[#e38d37] mb-1" size={20} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Style</span>
              <span className="text-xs sm:text-sm font-bold text-[#1c4d6f] mt-0.5">Bespoke Design</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200/50 shadow-sm flex flex-col items-center justify-center text-center">
              <MapPin className="text-[#e38d37] mb-1" size={20} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Visas</span>
              <span className="text-xs sm:text-sm font-bold text-[#1c4d6f] mt-0.5">Assistance Incl.</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#1c4d6f] mb-6 flex items-center gap-2">
              <Sparkles className="text-[#e38d37]" size={22} />
              Trip Highlights
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed font-medium">
                  <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="text-[#e38d37]" size={15} />
                  </div>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Itinerary */}
          <div className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#1c4d6f] mb-6 flex items-center gap-2">
              <Globe className="text-[#e38d37]" size={22} />
              Suggested Itinerary Schedule
            </h2>
            <div className="relative border-l border-gray-200 ml-4 pl-6 space-y-8">
              {data.itinerary.map((day, index) => (
                <div key={index} className="relative">
                  {/* Dot */}
                  <span className="absolute -left-10 top-0.5 bg-[#e38d37] text-white text-[10px] font-bold w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow shadow-[#e38d37]/20">
                    {index + 1}
                  </span>
                  <div>
                    <span className="text-[#e38d37] text-xs font-bold uppercase tracking-wider">{day.day}</span>
                    <h3 className="text-base sm:text-lg font-bold text-[#1c4d6f] mt-0.5">{day.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Booking Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-8 shadow-lg flex flex-col gap-6">
            <div>
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Estimated Budget</span>
              <div className="text-xl sm:text-2xl font-black text-[#1c4d6f] mt-1">{data.priceEstimate}</div>
              <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                *Final cost depends on flights, seasonality, and your hotel tier preference.
              </p>
            </div>

            <div className="border-t border-gray-150 pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <ShieldCheck size={16} className="text-[#e38d37]" />
                100% Refundable Deposit Available
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <Award size={16} className="text-[#e38d37]" />
                24/7 Ground Assistance Support
              </div>
            </div>

            <button
              onClick={() => onOpenQuote(data.title)}
              className="w-full bg-[#e38d37] hover:bg-[#d17e2e] active:bg-[#c07328] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#e38d37]/20 text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Send size={15} />
              Customise This Trip
            </button>
          </div>
        </div>

      </main>

      {/* Footer minimal info */}
      <footer className="bg-[#1c4d6f] text-white/50 text-center py-6 text-xs mt-auto border-t border-white/5">
        &copy; {new Date().getFullYear()} TRAVANOVAX. All Rights Reserved. Custom Travel Designs.
      </footer>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Search, CheckCircle2, PlayCircle, Cloud, Map as MapIcon, ShieldAlert, Cpu, Sprout, Activity, ArrowRight, Camera, LineChart, MessageSquare, BellRing, Settings, DollarSign, Fingerprint, Zap } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import ExpandableLogo from '../ExpandableLogo';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1219] text-slate-600 dark:text-slate-300 font-sans selection:bg-emerald-500/30 transition-colors duration-300 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 border-b border-slate-200 dark:border-slate-800/50 bg-white/80 dark:bg-[#0f1219]/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <ExpandableLogo className="h-10 w-auto object-contain rounded" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">UZHAMI</span>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-green-500 tracking-[0.2em] mt-1">SMART AGRI TECH</span>
              </div>
            </div>


            {/* Actions */}
            <div className="hidden md:flex items-center gap-6">
              <ThemeToggle />
              <Link 
                to="/signin" 
                className="bg-emerald-500 hover:bg-emerald-400 text-[#0f1219] px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
              >
                Sign In
              </Link>
              <button className="bg-emerald-500/10 hover:bg-emerald-500/20 p-2 rounded-full text-emerald-500 transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
              <span className="text-[11px] font-mono font-semibold tracking-widest text-emerald-400 uppercase">Next-Gen Field Intelligence Platform</span>
              <span className="text-[10px] text-slate-500 ml-2">&bull; Ref-11nm N & Satellites</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1]">
              AI-Powered<br />
              Farming Intelligence<br />
              for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Healthier Fields</span><br />
              and <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Higher Yields.</span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
              Turn satellite scans, soil telemetry, and microclimate forecasts into confident daily farming decisions. Built for practical growers, agronomists, and commercial operations.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
              <Link 
                to="/signin" 
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0f1219] px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>No complex hardware setup required | Syncs across mobile, tablet & native console</span>
            </div>
          </div>

          {/* Hero Right Dashboard Mockup */}
          <div className="relative hidden lg:block perspective-1000">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/10 blur-[100px] rounded-full"></div>
            
            {/* Main Mockup Card */}
            <div className="relative border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#161b22]/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl transform rotate-y-[-5deg] rotate-x-[5deg]">
              
              {/* Mockup Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <MapIcon className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                    <h3 className="text-slate-900 dark:text-white font-semibold text-lg">North Parcel #4</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-1">GOLDEN WHEAT &mdash; 142 ACRES</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> NDVI: 0.74 &bull; Optimal
                </div>
              </div>

              {/* Mockup Map Graphic */}
              <div className="relative h-48 rounded-xl bg-slate-100 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 mb-6 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 dark:opacity-20 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                {/* SVG Field Polygon drawing */}
                <svg viewBox="0 0 400 200" className="w-full h-full opacity-80" preserveAspectRatio="none">
                  <path d="M 50 150 L 80 50 L 250 30 L 380 90 L 350 170 L 150 180 Z" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.5)" strokeWidth="2" strokeDasharray="4 2"/>
                  <path d="M 150 180 L 170 80 L 250 30" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
                  <path d="M 170 80 L 380 90" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
                  <circle cx="200" cy="110" r="4" fill="#10b981" />
                  <circle cx="200" cy="110" r="16" fill="rgba(16,185,129,0.2)" className="animate-ping" />
                </svg>
                <div className="absolute bottom-3 left-3 text-[10px] text-emerald-400 font-mono bg-[#0d1117]/80 px-2 py-1 rounded">Zone 2A: Vigorous Growth</div>
                <div className="absolute top-3 right-3 text-[10px] text-amber-400 font-mono bg-[#0d1117]/80 px-2 py-1 rounded">Zone 1B: Moisture Watch</div>
              </div>

              {/* Mockup Metrics Row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-[10px] text-slate-500 font-mono mb-1">PREDICTED YIELD</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">+18.4%</div>
                  <div className="text-[9px] text-slate-500 dark:text-slate-600 mt-1">vs. 5-yr avg</div>
                </div>
                <div className="bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-[10px] text-slate-500 font-mono mb-1">SOIL NITROGEN</div>
                  <div className="text-slate-900 dark:text-white font-bold text-xl">42 mg/kg</div>
                  <div className="text-[9px] text-slate-500 dark:text-slate-600 mt-1">Target: 40-45</div>
                </div>
                <div className="bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-[10px] text-slate-500 font-mono mb-1">MICROCLIMATE</div>
                  <div className="text-amber-500 dark:text-amber-400 font-bold text-xl">24&deg;C / 68%</div>
                  <div className="text-[9px] text-slate-500 dark:text-slate-600 mt-1">Next 12 hrs</div>
                </div>
              </div>

              {/* Mockup Alert Banner */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0" />
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono text-amber-500 font-bold">DIAGNOSTIC: SEPT 12, 4:30 PM</span>
                    <span className="text-[10px] text-amber-500/70 font-mono">92.4% Confidence</span>
                  </div>
                  <p className="text-xs text-amber-200/80 leading-snug">Mild Cercospora Leaf Spot risk flagged in Sector 3. Optimal fungicide spraying window: next 48h before forecasted heavy rain event.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-y border-slate-200 dark:border-slate-800/50 bg-white dark:bg-[#0f1219] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-slate-200 dark:divide-slate-800/50">
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">1.4M+</div>
              <div className="text-sm text-slate-900 dark:text-white font-medium mb-1">Acres Monitored</div>
              <div className="text-xs text-slate-500">Continuous satellite, drone & soil telemetry feeds</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">96.2%</div>
              <div className="text-sm text-slate-900 dark:text-white font-medium mb-1">Disease Accuracy</div>
              <div className="text-xs text-slate-500">Tested across 500k+ agronomic crop symptom scans</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-amber-500 dark:text-amber-400 mb-2">34%</div>
              <div className="text-sm text-slate-900 dark:text-white font-medium mb-1">Input Resource Savings</div>
              <div className="text-xs text-slate-500">Reduced water, nitrogen, and crop protection waste</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-amber-500 dark:text-amber-400 mb-2">28,000+</div>
              <div className="text-sm text-slate-900 dark:text-white font-medium mb-1">Active Growers</div>
              <div className="text-xs text-slate-500">From family plots to multi-zone commercial enterprises</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section id="features" className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 mb-6 uppercase tracking-widest">
            Full-Spectrum Intelligence Engine
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Engineered for the Field. Powered by Scientific Precision.
          </h2>
          <p className="text-lg text-slate-400">
            Eight integrated modules designed to replace guesswork with real-time agronomic insights, from planting day through post-harvest accounting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-[#161b22]/50 border border-slate-800 rounded-2xl p-8 hover:bg-[#161b22] hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Cloud className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Open-Meteo Archive</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">Hourly Radar</div>
            <h3 className="text-xl font-bold text-white mb-3">Hyperlocal Weather Forecasting</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Minute-by-minute field precipitation, wind drift monitors for safe spraying, and sudden frost warnings mapped to your exact GPS coordinates.
            </p>
            <a href="#" className="inline-flex items-center text-xs font-bold text-emerald-500 hover:text-emerald-400">
              Explore Forecasts <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#161b22]/50 border border-slate-800 rounded-2xl p-8 hover:bg-[#161b22] hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <MapIcon className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Weekly Sync</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">Sentinel-2 & Landsat</div>
            <h3 className="text-xl font-bold text-white mb-3">Satellite & Soil Field Mapping</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Multispectral NDVI vegetation index maps, soil moisture profiles down to 30cm depth, and digital elevation runoff vectors.
            </p>
            <a href="#" className="inline-flex items-center text-xs font-bold text-emerald-500 hover:text-emerald-400">
              View Satellite Maps <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#161b22]/50 border border-slate-800 rounded-2xl p-8 hover:bg-[#161b22] hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                <Camera className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">ResNet CNN</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">Computer Vision</div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Disease & Pest Diagnosis</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Snap a smartphone photo of leaf blight, stem rust, or insect damage. Receive immediate identification with verified organic and chemical treatments.
            </p>
            <a href="#" className="inline-flex items-center text-xs font-bold text-emerald-500 hover:text-emerald-400">
              Try Camera Demo <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>

          {/* Feature 4 */}
          <div className="bg-[#161b22]/50 border border-slate-800 rounded-2xl p-8 hover:bg-[#161b22] hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <LineChart className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">30-Year Depth</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">Historical Data</div>
            <h3 className="text-xl font-bold text-white mb-3">Long-term Field Analytics</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Evaluate multi-year yield fluctuations, organic matter retention trends, and climate heat units to calibrate crop rotation plans.
            </p>
            <a href="#" className="inline-flex items-center text-xs font-bold text-emerald-500 hover:text-emerald-400">
              Compare Seasons <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>

          {/* Feature 5 */}
          <div className="bg-[#161b22]/50 border border-slate-800 rounded-2xl p-8 hover:bg-[#161b22] hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                <MessageSquare className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Voice & Text</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">UZHAMI Copilot</div>
            <h3 className="text-xl font-bold text-white mb-3">24/7 AI Agronomist Assistant</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Ask questions in plain language: "What is the optimal nitrogen top-dressing timing for my corn based on this weekend's moisture?"
            </p>
            <a href="#" className="inline-flex items-center text-xs font-bold text-emerald-500 hover:text-emerald-400">
              Ask Assistant <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>

          {/* Feature 6 */}
          <div className="bg-[#161b22]/50 border border-slate-800 rounded-2xl p-8 hover:bg-[#161b22] hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
                <BellRing className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">SMS / WhatsApp</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">Proactive Shield</div>
            <h3 className="text-xl font-bold text-white mb-3">Proactive Soil & Weather Alerts</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Receive automated SMS alerts when soil wilting point approaches, a pest infection risk spikes, or hailstorms threaten your parcel perimeter.
            </p>
            <a href="#" className="inline-flex items-center text-xs font-bold text-emerald-500 hover:text-emerald-400">
              Configure Alerts <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>

          {/* Feature 7 */}
          <div className="bg-[#161b22]/50 border border-slate-800 rounded-2xl p-8 hover:bg-[#161b22] hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Settings className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Daily Planner</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">Fleet & People</div>
            <h3 className="text-xl font-bold text-white mb-3">Daily Farm Operations</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Organize tractor runs, irrigation pump duty cycles, labor tasks, and harvesting schedules inside an intuitive calendar synced to field weather.
            </p>
            <a href="#" className="inline-flex items-center text-xs font-bold text-emerald-500 hover:text-emerald-400">
              Plan Workflows <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>

          {/* Feature 8 */}
          <div className="bg-[#161b22]/50 border border-slate-800 rounded-2xl p-8 hover:bg-[#161b22] hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                <DollarSign className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Cost Tracker</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">P&L By Acre</div>
            <h3 className="text-xl font-bold text-white mb-3">Input Cost & Harvest Finance</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Track seed batches, diesel burn, and chemical input costs per hectare. See real-time projected gross margins as commodity prices change.
            </p>
            <a href="#" className="inline-flex items-center text-xs font-bold text-emerald-500 hover:text-emerald-400">
              Review Margin Models <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Secondary Features Callouts */}
      <section className="pb-24 px-6 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-slate-800 bg-[#0d1117] rounded-xl p-6 flex flex-col justify-end min-h-[160px]">
            <div className="text-[10px] font-mono text-emerald-400 mb-2 uppercase">Aerial Spectral Scans</div>
            <h4 className="text-lg font-bold text-white mb-2">Sub-meter Resolution Coverage</h4>
            <p className="text-xs text-slate-400">Detect chlorosis and canopy thinning weeks before ground visibility.</p>
          </div>
          <div className="border border-slate-800 bg-[#0d1117] rounded-xl p-6 flex flex-col justify-end min-h-[160px]">
            <div className="text-[10px] font-mono text-blue-400 mb-2 uppercase">Grower In The Loop</div>
            <h4 className="text-lg font-bold text-white mb-2">Field-Tested Usability</h4>
            <p className="text-xs text-slate-400">High-contrast interface mode readable in direct bright midday sunlight.</p>
          </div>
          <div className="border border-slate-800 bg-[#0d1117] rounded-xl p-6 flex flex-col justify-end min-h-[160px]">
            <div className="text-[10px] font-mono text-amber-400 mb-2 uppercase">Edge ML Diagnostics</div>
            <h4 className="text-lg font-bold text-white mb-2">Instant In-Pocket Pathology</h4>
            <p className="text-xs text-slate-400">Works offline in cellular blindspots across remote boundary edges.</p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 border-t border-slate-800 bg-[#161b22]/30">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-block px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 mb-6 uppercase tracking-widest">
              Frictionless Onboarding
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Three Simple Steps to Transform Your Harvest
            </h2>
            <p className="text-lg text-slate-400">
              From boundary delineation to active automated prescriptions in under 5 minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0f1219] border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold mb-6 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]">01</div>
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">Map Your Land</h3>
              <p className="text-sm text-slate-400 mb-8 relative z-10 leading-relaxed">
                Draw field boundaries directly on satellite imagery, upload shapefiles (.shp, .kml), or connect your existing John Deere or Climate FieldView account.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 uppercase tracking-widest relative z-10">
                <Fingerprint className="h-4 w-4" /> 1-Click Import to SecurOS
              </div>
            </div>

            <div className="bg-[#0f1219] border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mb-6 relative z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">02</div>
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">Sync Real-Time Data</h3>
              <p className="text-sm text-slate-400 mb-8 relative z-10 leading-relaxed">
                UZHAMI automatically retrieves 5-year historical NDVI, soil composition textures, and historical rainfall patterns for your exact parcel coordinates.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400 uppercase tracking-widest relative z-10">
                <Activity className="h-4 w-4" /> Zero Hardware Installation
              </div>
            </div>

            <div className="bg-[#0f1219] border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mb-6 relative z-10 shadow-[0_0_15px_rgba(245,158,11,0.5)]">03</div>
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">Take Action with AI</h3>
              <p className="text-sm text-slate-400 mb-8 relative z-10 leading-relaxed">
                Receive actionable daily guidance: spray advisories based on wind, variable rate fertilizer zones, and leaf pathology alerts straight to your phone.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 uppercase tracking-widest relative z-10">
                <Zap className="h-4 w-4" /> Push-Task Confidence Metrics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-slate-800 rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Join 28,000+ Modern Growers
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
                Ready to bring precision AI to your fields?
              </h2>
              <p className="text-slate-400 text-lg">
                Set up your first field profile in minutes. Free 14-day full platform access, with zero credit card or telemetry hardware required.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
              <Link 
                to="/signin" 
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0f1219] px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                Get Started with UZHAMI <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/signin" 
                className="flex items-center justify-center px-8 py-4 rounded-xl font-bold text-slate-700 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Sign Into Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-[#0a0d14] pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo.jpg" alt="UZHAMI Logo" className="h-8 w-auto object-contain rounded" />
                <span className="text-xl font-bold text-white tracking-tight">UZHAMI</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                Empowering growers with practical AI and field intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Field Mapping</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Disease AI</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Weather & Soil</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Field Demo</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Impact Studies</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Agronomic Docs</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Support Center</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <div>&copy; {new Date().getFullYear()} UZHAMI. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

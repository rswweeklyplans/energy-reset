
import React, { useState, useEffect, useMemo } from 'react';
import { DayTracker } from './components/DayTracker';
import { DayData, TrackerState } from './types';
import { MEAL_PLANS, SHOPPING_LIST } from './constants';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const App: React.FC = () => {
  const [trackerState, setTrackerState] = useState<TrackerState>({});
  const [activeTab, setActiveTab] = useState('guide');
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('energyReset_v2');
    if (saved) {
      setTrackerState(JSON.parse(saved));
    }
  }, []);

  const handleSaveDay = (day: number, data: DayData) => {
    const newState = { ...trackerState, [day]: data };
    setTrackerState(newState);
    localStorage.setItem('energyReset_v2', JSON.stringify(newState));
  };

  const handleReset = () => {
    if (confirm("Reset everything? Your hard work will be cleared.")) {
      setTrackerState({});
      localStorage.removeItem('energyReset_v2');
    }
  };

  const stats = useMemo(() => {
    const days = Object.values(trackerState) as DayData[];
    const completedDays = days.filter(d => d.completed);
    const count = completedDays.length;
    
    if (count === 0) return { avgSleep: "0", avgEnergy: "0", avgDigestion: "0", count: 0 };

    const totalSleep = completedDays.reduce((acc, d) => acc + d.sleep, 0);
    const totalEnergy = completedDays.reduce((acc, d) => acc + (d.energyAM + d.energyPM) / 2, 0);
    const totalDigestion = completedDays.reduce((acc, d) => acc + d.digestion, 0);

    return {
      avgSleep: (totalSleep / count).toFixed(1),
      avgEnergy: (totalEnergy / count).toFixed(1),
      avgDigestion: (totalDigestion / count).toFixed(1),
      count
    };
  }, [trackerState]);

  const chartData = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const day = i + 1;
      const d = trackerState[day];
      return {
        name: `D${day}`,
        energy: d ? (d.energyAM + d.energyPM) / 2 : 0,
        completed: !!d?.completed
      };
    });
  }, [trackerState]);

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-[#fdfcfb]">
      {/* Premium Header */}
      <header className="bg-[#9fa894] text-white py-16 md:py-24 px-6 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg width="300" height="300" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.5" fill="none"/></svg>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tight leading-tight uppercase">14-Day Energy Reset</h1>
          <p className="text-lg md:text-2xl font-medium opacity-90 max-w-3xl mx-auto italic serif">
            Restore your vitality. Stabilize your blood sugar. Sleep deeper than ever before.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur shadow-xl">
        <div className="max-w-5xl mx-auto px-4">
          <ul className="flex justify-between md:justify-center overflow-x-auto gap-1 md:gap-8 no-scrollbar">
            <NavItem label="The Letter" active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} />
            <NavItem label="Tracker" active={activeTab === 'tracker'} onClick={() => setActiveTab('tracker')} />
            <NavItem label="Meal Plans" active={activeTab === 'meals'} onClick={() => setActiveTab('meals')} />
            <NavItem label="Shopping" active={activeTab === 'shopping'} onClick={() => setActiveTab('shopping')} />
          </ul>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 py-12 md:px-8">
        
        {activeTab === 'guide' && (
          <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="prose prose-stone prose-lg max-w-none">
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 border-b border-stone-200 pb-6 italic">I'm so glad you're here.</h2>
              
              <div className="space-y-6 text-stone-700 leading-relaxed">
                <p>
                  If you're reading this, you're tired of feeling exhausted. Tired of waking up already drained. Tired of the 2pm crash. Tired of lying awake at night even though you're bone-tired.
                </p>
                <p className="font-semibold text-stone-900 italic">I get it. I've been there.</p>
                <p>
                  This 14-day protocol is the exact foundation I use with my coaching clients in their first two weeks — the reset that starts shifting energy immediately while we wait for lab results.
                </p>

                <h3 className="text-2xl font-bold text-stone-800 pt-4">Here's What I've Learned</h3>
                <p>
                  After working with hundreds of women, I can tell you this: healing doesn't happen because of complicated protocols or expensive supplements.
                </p>
                <p className="bg-stone-100 p-6 rounded-xl border-l-4 border-[#9fa894] font-bold text-xl text-stone-900 italic">
                  "It happens because of the simple things, done consistently."
                </p>
                <p>
                  Protein before coffee. Sunlight in the morning. No screens before bed. These aren't sexy. They're not revolutionary. But they work.
                </p>
                <p>
                  The women who see the biggest transformations aren't the ones who do everything perfectly. They're the ones who show up daily and stay accountable to the small things.
                </p>
                <p>
                  That's what this guide is about — getting rooted in foundational health by doing the basics, tracking your progress, and staying consistent for 14 days.
                </p>

                <h3 className="text-2xl font-bold text-stone-800 pt-4">How to Use This Guide</h3>
                <ol className="space-y-2 list-decimal pl-6">
                  <li><strong>Read the protocol overview</strong> below to understand your daily targets.</li>
                  <li><strong>Use the shopping list</strong> to stock your kitchen before you start.</li>
                  <li><strong>Mix and match</strong> from the meal options each day.</li>
                  <li><strong>Track your progress daily</strong> using the built-in interactive tracker.</li>
                  <li><strong>Be consistent</strong> for all 14 days.</li>
                </ol>
                <p>
                  Don't try to be perfect. Just aim for progress. Small, foundational changes add up faster than you think.
                </p>

                <div className="pt-8">
                  <p className="mb-1">Here's to feeling better,</p>
                  <p className="text-3xl serif italic font-bold text-[#c17a5c]">Rachel</p>
                </div>
              </div>
            </section>

            <div className="grid md:grid-cols-3 gap-6 pt-12">
              <FocusCard title="☀️ Morning" items={["Protein Before Coffee", "Sunlight (15m)", "10m Movement"]} />
              <FocusCard title="🥗 Midday" items={["30g+ Protein/Meal", "Hydrate (Half BW oz)", "Caffeine Cutoff 11am"]} />
              <FocusCard title="🌙 Evening" items={["Digital Detox (1hr)", "Deep Breathing", "Physical Reading"]} />
            </div>
            
            <section className="bg-stone-800 text-white p-10 rounded-3xl shadow-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-black mb-6 uppercase italic text-[#9fa894]">Ready to begin?</h2>
              <button onClick={() => setActiveTab('tracker')} className="px-12 py-4 bg-[#c17a5c] hover:bg-white hover:text-[#c17a5c] transition-all font-bold rounded-full uppercase tracking-widest shadow-xl">
                Enter Your Day 1 Check-In →
              </button>
            </section>
          </div>
        )}

        {activeTab === 'tracker' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Progress" value={stats.count} suffix="/14 Days" />
              <StatCard label="Avg Sleep" value={stats.avgSleep} suffix="/10" color="text-indigo-600" />
              <StatCard label="Energy" value={stats.avgEnergy} suffix="/10" color="text-[#c17a5c]" />
              <StatCard label="Digestion" value={stats.avgDigestion} suffix="/10" color="text-olive-600" />
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <DayTracker state={trackerState} onSave={handleSaveDay} />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                   <h3 className="font-bold text-stone-800 mb-2 uppercase text-xs tracking-widest">Energy Trends</h3>
                   <p className="text-stone-500 text-xs mb-4 italic">Tracking your daily average energy (AM + PM).</p>
                   <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip 
                          cursor={{fill: '#f5f5f5'}}
                          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                        />
                        <Bar dataKey="energy" radius={[4, 4, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.completed ? '#c17a5c' : '#e5e7eb'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                   </div>
                </div>
                
                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                  <h4 className="font-bold text-stone-800 text-sm mb-2">Consistency is Key</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    Don't worry about being perfect. If you miss a day, just pick up where you left off. The goal is 14 total entries of showing up for yourself.
                  </p>
                </div>

                <button 
                  onClick={handleReset}
                  className="w-full py-4 text-[10px] font-black text-stone-400 hover:text-red-500 transition-colors uppercase tracking-[0.2em]"
                >
                  Reset All Data
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meals' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="text-center max-w-2xl mx-auto">
               <h2 className="text-4xl font-bold text-stone-800 mb-4">The Reset Kitchen</h2>
               <p className="text-stone-600 italic serif mb-6">Simple, protein-focused meals to stabilize blood sugar and keep energy high all day.</p>
               <div className="bg-[#9fa894]/10 border border-[#9fa894]/20 rounded-2xl p-6 text-left">
                 <h3 className="font-bold text-stone-800 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                   <span className="text-lg">👉</span> How to Use
                 </h3>
                 <p className="text-sm text-stone-700 leading-relaxed">
                   Click on any meal card below to expand and view the full recipe including ingredients, step-by-step instructions, and optional upgrades. Mix and match meals throughout your 14-day reset based on your preferences and schedule.
                 </p>
               </div>
             </div>
             {MEAL_PLANS.map(cat => (
               <div key={cat.category}>
                 <h3 className="text-xl font-bold text-stone-800 uppercase tracking-widest mb-6 border-b border-stone-200 pb-2">{cat.category}</h3>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cat.options.map(opt => {
                      const isExpanded = expandedMeal === opt.title;
                      return (
                        <div key={opt.title} className={`bg-white rounded-2xl border border-stone-100 transition-all ${isExpanded ? 'md:col-span-2 lg:col-span-4' : ''}`}>
                          <button
                            onClick={() => setExpandedMeal(isExpanded ? null : opt.title)}
                            className="w-full p-6 text-left hover:bg-stone-50 rounded-2xl transition-all group"
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-[#c17a5c] mb-3 group-hover:translate-x-1 transition-transform">{opt.title}</h4>
                              <span className="text-stone-400 text-xl">{isExpanded ? '−' : '+'}</span>
                            </div>
                            <ul className="text-sm text-stone-600 space-y-2">
                              {opt.items.map(i => <li key={i} className="flex items-start gap-2">• <span>{i}</span></li>)}
                            </ul>
                          </button>

                          {isExpanded && (
                            <div className="px-6 pb-6 space-y-6 border-t border-stone-100 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                              <div>
                                <h5 className="font-bold text-stone-800 text-sm uppercase tracking-wider mb-3">Ingredients</h5>
                                <ul className="text-sm text-stone-600 space-y-1.5">
                                  {opt.ingredients.map((ing, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="text-[#9fa894]">✓</span>
                                      <span>{ing}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h5 className="font-bold text-stone-800 text-sm uppercase tracking-wider mb-3">Instructions</h5>
                                <ol className="text-sm text-stone-600 space-y-2">
                                  {opt.instructions.map((step, idx) => (
                                    <li key={idx} className="flex gap-3">
                                      <span className="font-bold text-[#c17a5c] min-w-[20px]">{idx + 1}.</span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>

                              <div className="bg-stone-50 p-4 rounded-xl">
                                <h5 className="font-bold text-stone-700 text-xs uppercase tracking-wider mb-2">💡 Optional Upgrade</h5>
                                <p className="text-sm text-stone-600 italic">{opt.optionalUpgrade}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                 </div>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'shopping' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="text-center max-w-2xl mx-auto">
               <h2 className="text-4xl font-bold text-stone-800 mb-4">Master Shopping List</h2>
               <p className="text-stone-600 italic serif mb-6">Stock your kitchen with these high-vibrational foundations.</p>
               <div className="bg-[#c17a5c]/10 border border-[#c17a5c]/20 rounded-2xl p-6 text-left space-y-4">
                 <div>
                   <h3 className="font-bold text-stone-800 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                     <span className="text-lg">🛒</span> How to Use This List
                   </h3>
                   <p className="text-sm text-stone-700 leading-relaxed">
                     Check off items as you shop using the interactive checkboxes below. This list includes everything you need for all 12 meal options in your reset protocol.
                   </p>
                 </div>
                 <div className="bg-white rounded-xl p-4 border border-stone-200">
                   <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                     <span className="text-base">🌱</span> Food as Medicine
                   </h4>
                   <p className="text-sm text-stone-700 leading-relaxed">
                     <strong>Quality matters.</strong> Choose organic, pasture-raised, and grass-fed options when possible. Prioritize wild-caught seafood and pesticide-free produce—especially for the "Dirty Dozen." Clean eating starts with clean sourcing.
                   </p>
                 </div>
               </div>
             </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SHOPPING_LIST.map(list => (
                  <div key={list.title} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                    <h3 className="bg-[#9fa894] text-white py-4 px-8 font-bold uppercase text-xs tracking-widest">{list.title}</h3>
                    <ul className="p-8 space-y-4">
                      {list.items.map(item => (
                        <li key={item} className="flex items-center gap-4 text-stone-700 font-medium">
                          <input type="checkbox" className="w-5 h-5 accent-olive-500 rounded border-stone-300" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
             </div>
          </div>
        )}

      </main>
    </div>
  );
};

const NavItem = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <li className="flex-shrink-0">
    <button 
      onClick={onClick}
      className={`px-4 md:px-8 py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all border-b-2
        ${active ? 'text-[#c17a5c] border-[#c17a5c]' : 'text-stone-500 border-transparent hover:text-stone-300'}
      `}
    >
      {label}
    </button>
  </li>
);

const FocusCard = ({ title, items }: { title: string, items: string[] }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
    <h3 className="text-[#c17a5c] font-black text-xs uppercase tracking-[0.2em] mb-4 border-b border-stone-50 pb-2">{title}</h3>
    <ul className="space-y-3 text-sm text-stone-700 font-medium">
      {items.map(item => (
        <li key={item} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-olive-200"></div>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const StatCard = ({ label, value, suffix, color = "text-[#c17a5c]" }: { label: string, value: number | string, suffix?: string, color?: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 text-center transform hover:-translate-y-1 transition-transform">
    <p className="text-[10px] uppercase font-black text-stone-400 tracking-widest mb-2">{label}</p>
    <div className={`text-3xl md:text-4xl font-black ${color}`}>
      {value}<span className="text-xs opacity-50 font-medium ml-1">{suffix}</span>
    </div>
  </div>
);

export default App;

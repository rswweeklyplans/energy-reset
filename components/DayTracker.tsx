
import React, { useState, useEffect } from 'react';
import { DayData, TrackerState } from '../types';
import { PROTOCOL_HABITS } from '../constants';

interface DayTrackerProps {
  state: TrackerState;
  onSave: (day: number, data: DayData) => void;
  startDate: string | null;
  onStartDateChange: (date: string) => void;
}

export const DayTracker: React.FC<DayTrackerProps> = ({ state, onSave, startDate, onStartDateChange }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [formData, setFormData] = useState<DayData>({
    sleep: 5,
    energyAM: 5,
    energyPM: 5,
    digestion: 5,
    habits: [],
    notes: '',
    completed: false
  });

  useEffect(() => {
    if (state[activeDay]) {
      setFormData(state[activeDay]);
    } else {
      setFormData({
        sleep: 5,
        energyAM: 5,
        energyPM: 5,
        digestion: 5,
        habits: [],
        notes: '',
        completed: false
      });
    }
  }, [activeDay, state]);

  const handleHabitToggle = (habit: string) => {
    setFormData(prev => ({
      ...prev,
      habits: prev.habits.includes(habit) 
        ? prev.habits.filter(h => h !== habit)
        : [...prev.habits, habit]
    }));
  };

  const handleSave = () => {
    onSave(activeDay, { ...formData, completed: true, timestamp: new Date().toISOString() });
    if (activeDay < 14) setActiveDay(activeDay + 1);
  };

  const getDateForDay = (day: number): string => {
    if (!startDate) return '';
    // Parse date as local date to avoid timezone issues
    const [year, month, dayOfMonth] = startDate.split('-').map(Number);
    const start = new Date(year, month - 1, dayOfMonth);
    const targetDate = new Date(start);
    targetDate.setDate(start.getDate() + (day - 1));
    return targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
      {/* Day Selector & Start Date */}
      <div className="bg-stone-50 border-b border-stone-100 p-4 space-y-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">Select Day</label>
          <select
            value={activeDay}
            onChange={(e) => setActiveDay(parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border-2 border-stone-200 bg-white text-stone-800 font-semibold focus:ring-2 focus:ring-[#c17a5c] focus:border-[#c17a5c] outline-none"
          >
            {Array.from({ length: 14 }).map((_, i) => {
              const day = i + 1;
              const isCompleted = state[day]?.completed;
              const dateStr = startDate ? ` - ${getDateForDay(day)}` : '';
              return (
                <option key={day} value={day}>
                  Day {day}{dateStr}{isCompleted ? ' ✓' : ''}
                </option>
              );
            })}
          </select>
        </div>

        {activeDay === 1 && (
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">Start Date</label>
            <input
              type="date"
              value={startDate || ''}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-stone-200 bg-white text-stone-800 font-semibold focus:ring-2 focus:ring-[#c17a5c] focus:border-[#c17a5c] outline-none"
            />
            <p className="text-xs text-stone-500 mt-2 italic">Select when you started your reset</p>
          </div>
        )}
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">Day {activeDay} Check-In</h3>
            {startDate && <p className="text-sm text-stone-500 mt-1">{getDateForDay(activeDay)}</p>}
          </div>
          {state[activeDay]?.completed && <span className="text-olive-600 font-bold flex items-center gap-1">✓ Completed</span>}
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Sliders */}
          <div className="space-y-6">
            <MetricSlider 
              label="Sleep Quality" 
              value={formData.sleep} 
              onChange={v => setFormData(p => ({...p, sleep: v}))}
              desc="How rested did you feel upon waking?"
            />
            <MetricSlider 
              label="Morning Energy" 
              value={formData.energyAM} 
              onChange={v => setFormData(p => ({...p, energyAM: v}))}
            />
            <MetricSlider 
              label="Afternoon Energy" 
              value={formData.energyPM} 
              onChange={v => setFormData(p => ({...p, energyPM: v}))}
            />
            <MetricSlider 
              label="Digestion Comfort" 
              value={formData.digestion} 
              onChange={v => setFormData(p => ({...p, digestion: v}))}
            />
          </div>

          {/* Habits & Notes */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-3 uppercase tracking-wider">Foundation Habits</label>
              <div className="grid grid-cols-1 gap-2">
                {PROTOCOL_HABITS.map(habit => (
                  <label key={habit} className="flex items-center gap-3 p-3 rounded hover:bg-stone-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.habits.includes(habit)}
                      onChange={() => handleHabitToggle(habit)}
                      className="w-6 h-6 accent-[#9fa894] rounded border-stone-300"
                    />
                    <span className="text-sm text-stone-700">{habit}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Wins & Notes</label>
              <textarea
                value={formData.notes}
                onChange={e => setFormData(p => ({...p, notes: e.target.value}))}
                placeholder="What went well? Any new insights?"
                className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-400 outline-none min-h-[120px] md:min-h-[100px] text-sm"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full md:w-auto px-10 py-4 bg-[#c17a5c] hover:bg-[#a86a4f] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
        >
          {state[activeDay]?.completed ? 'Update Entry' : `Save Day ${activeDay}`}
        </button>
      </div>
    </div>
  );
};

const MetricSlider = ({ label, value, onChange, desc }: { label: string, value: number, onChange: (v: number) => void, desc?: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <div>
        <label className="block text-sm font-bold text-stone-800">{label}</label>
        {desc && <p className="text-xs text-stone-500 italic">{desc}</p>}
      </div>
      <span className="text-2xl font-black text-[#c17a5c]">{value}</span>
    </div>
    <input
      type="range"
      min="1"
      max="10"
      value={value}
      onChange={e => onChange(parseInt(e.target.value))}
      className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#9fa894]"
    />
    <div className="flex justify-between text-xs text-stone-400 uppercase font-bold px-1">
      <span>Low</span>
      <span>Optimal</span>
    </div>
  </div>
);

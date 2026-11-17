import React, { useState } from 'react';
import {
  Check,
  Square,
  CheckSquare,
} from 'lucide-react';
import {
  WEEKLY_MESS_MENU,
  FRESHER_PACKING_CHECKLIST,
  BUS_ROUTES,
  CAMPUS_NODES,
} from '../../data/amritaChennaiData';
import { soundFx } from '../../lib/soundFx';

interface HostelMessInspectorProps {
  onAskQuestion: (prompt: string) => void;
}

export const HostelMessInspector: React.FC<HostelMessInspectorProps> = ({ onAskQuestion }) => {
  const [activeSubTab, setActiveSubTab] = useState<'mess' | 'hostel' | 'travel'>('mess');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'snacks' | 'dinner'>('lunch');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('ab-1');

  const currentDayMenu = WEEKLY_MESS_MENU.find((m) => m.day === selectedDay) || WEEKLY_MESS_MENU[0];
  const selectedBuilding = CAMPUS_NODES.find((n) => n.id === selectedBuildingId) || CAMPUS_NODES[0];

  const toggleChecklist = (id: string) => {
    soundFx.click();
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = FRESHER_PACKING_CHECKLIST.length;

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 sm:px-8 space-y-10">
      {/* Page Title & Intro */}
      <div className="border-b border-tuscan-hairline pb-8">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-2">
          Student Life & Residential Handbook • Vengal Campus
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-ink-charcoal">
          Hostel, Dining & Campus Guide
        </h1>
        <p className="mt-3 text-base text-ink-slate max-w-3xl leading-[1.65]">
          Everything prospective students and parents need to know about life at Amrita Vishwa Vidyapeetham, Chennai Campus (Vengal): vegetarian mess menus, residential policies, dress code, and bus routes.
        </p>
      </div>

      {/* Guide Sub-Navigation (Clean Pills) */}
      <div className="flex items-center gap-2 border-b border-tuscan-hairline pb-4 text-sm font-semibold">
        {[
          { id: 'mess', label: 'Daily Mess Menu & Timings' },
          { id: 'hostel', label: 'Hostel Rooms, Curfew & Packing List' },
          { id: 'travel', label: 'Location, Bus Routes & Campus Buildings' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              soundFx.click();
              setActiveSubTab(tab.id as any);
            }}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === tab.id
                ? 'bg-tuscan-rust text-white shadow-sm'
                : 'text-ink-slate hover:text-ink-charcoal hover:bg-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB-SECTION 1: MESS & SATVIK DINING */}
      {activeSubTab === 'mess' && (
        <div className="space-y-8">
          {/* Day of the Week Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm">
            {WEEKLY_MESS_MENU.map((item) => (
              <button
                key={item.day}
                type="button"
                onClick={() => {
                  soundFx.click();
                  setSelectedDay(item.day);
                }}
                className={`px-4 py-2 rounded-xl border font-medium transition-all ${
                  selectedDay === item.day
                    ? 'border-tuscan-rust bg-surface text-tuscan-rust font-semibold shadow-sm'
                    : 'border-tuscan-hairline bg-surface/40 text-ink-slate hover:border-tuscan-terracotta'
                }`}
              >
                {item.day}
              </button>
            ))}
          </div>

          {/* Meal Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: 'breakfast', label: 'Breakfast', time: currentDayMenu.breakfast.time },
              { id: 'lunch', label: 'Lunch', time: currentDayMenu.lunch.time },
              { id: 'snacks', label: 'Evening Snacks', time: currentDayMenu.snacks.time },
              { id: 'dinner', label: 'Dinner', time: currentDayMenu.dinner.time },
            ].map((meal) => (
              <button
                key={meal.id}
                type="button"
                onClick={() => {
                  soundFx.click();
                  setSelectedMeal(meal.id as any);
                }}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  selectedMeal === meal.id
                    ? 'border-tuscan-rust bg-surface shadow-sm'
                    : 'border-tuscan-hairline bg-surface/30 hover:bg-surface/70'
                }`}
              >
                <div className="font-heading font-semibold text-base text-ink-charcoal">
                  {meal.label}
                </div>
                <div className="font-mono text-xs text-ink-muted mt-1.5">
                  {meal.time}
                </div>
              </button>
            ))}
          </div>

          {/* Active Meal Detailed Menu */}
          <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-tuscan-hairline pb-4 gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Annapoorna Central Mess • {selectedDay}
                </span>
                <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-charcoal capitalize mt-1">
                  {selectedMeal} Menu
                </h3>
              </div>
              <span className="text-xs font-semibold text-tuscan-rust bg-[rgba(255,211,172,0.35)] px-3.5 py-1.5 rounded-full border border-tuscan-hairline shrink-0">
                100% Pure Vegetarian (Satvik)
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted font-heading">
                Items Served:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {selectedMeal === 'breakfast' &&
                  currentDayMenu.breakfast.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-xl border border-tuscan-hairline bg-surface">
                      <Check className="h-4 w-4 text-tuscan-rust shrink-0" />
                      <span className="text-ink-charcoal font-medium">{it}</span>
                    </div>
                  ))}
                {selectedMeal === 'lunch' &&
                  currentDayMenu.lunch.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-xl border border-tuscan-hairline bg-surface">
                      <Check className="h-4 w-4 text-tuscan-rust shrink-0" />
                      <span className="text-ink-charcoal font-medium">{it}</span>
                    </div>
                  ))}
                {selectedMeal === 'snacks' &&
                  currentDayMenu.snacks.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-xl border border-tuscan-hairline bg-surface">
                      <Check className="h-4 w-4 text-tuscan-rust shrink-0" />
                      <span className="text-ink-charcoal font-medium">{it}</span>
                    </div>
                  ))}
                {selectedMeal === 'dinner' &&
                  currentDayMenu.dinner.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-xl border border-tuscan-hairline bg-surface">
                      <Check className="h-4 w-4 text-tuscan-rust shrink-0" />
                      <span className="text-ink-charcoal font-medium">{it}</span>
                    </div>
                  ))}
              </div>

              {/* Special Accompaniment */}
              <div className="p-4 rounded-xl bg-surface border border-tuscan-hairline text-sm text-ink-slate leading-relaxed">
                <strong className="text-ink-charcoal font-semibold">Beverages & Specials: </strong>
                {selectedMeal === 'breakfast' && currentDayMenu.breakfast.beverage}
                {selectedMeal === 'lunch' && currentDayMenu.lunch.specials}
                {selectedMeal === 'snacks' && currentDayMenu.snacks.beverage}
                {selectedMeal === 'dinner' && currentDayMenu.dinner.sweetOrFruit}
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-ink-slate gap-2">
                <span>Night Canteen is open daily from 8:00 PM – 10:30 PM for fresh juices and snacks.</span>
                <button
                  type="button"
                  onClick={() => onAskQuestion(`What is the mess menu on ${selectedDay}?`)}
                  className="font-semibold text-tuscan-rust hover:underline transition-colors"
                >
                  Ask about this in chat →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: HOSTEL RULES & PACKING LIST */}
      {activeSubTab === 'hostel' && (
        <div className="space-y-8">
          {/* Hostel Rules Overview Card */}
          <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-6">
            <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-charcoal">
              Residential Hostels & Gate Regulations
            </h3>
            <p className="text-base text-ink-slate leading-[1.65]">
              First-year engineering students stay in 4-sharing rooms equipped with individual study desks, bookshelves, wardrobes, ceiling fans, and high-speed Wi-Fi access points.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-sm">
              <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
                <span className="font-mono text-xs font-bold text-tuscan-rust block mb-1">01. 8:30 PM Gate Curfew</span>
                <p className="text-ink-slate leading-relaxed">
                  Hostel main gates close promptly at 8:30 PM. Biometric attendance is recorded nightly between 8:00 PM and 8:30 PM.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
                <span className="font-mono text-xs font-bold text-tuscan-rust block mb-1">02. Quiet Study Hours</span>
                <p className="text-ink-slate leading-relaxed">
                  9:00 PM to 10:30 PM is observed as mandatory study time across all residential blocks.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
                <span className="font-mono text-xs font-bold text-tuscan-rust block mb-1">03. Online Outing Pass</span>
                <p className="text-ink-slate leading-relaxed">
                  Weekend passes are submitted on the Amrita MMS portal and verified via an SMS authorization code sent to parents.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-tuscan-hairline text-sm text-ink-slate leading-relaxed">
              <strong className="text-ink-charcoal font-semibold">Hostel Fee: </strong>
              Annual accommodation and mess charges total approx. ₹1,10,000 / year (includes room, 4-time vegetarian meals, and basic laundry).
            </div>
          </div>

          {/* Interactive Checkable Packing Checklist */}
          <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-tuscan-hairline pb-4">
              <div>
                <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-charcoal">
                  First-Year Fresher Packing Checklist
                </h3>
                <p className="text-sm text-ink-slate mt-1">
                  Check off items as you pack for your campus arrival.
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-tuscan-rust bg-[rgba(255,211,172,0.35)] px-3 py-1.5 rounded-full border border-tuscan-hairline">
                  {completedCount} of {totalItems} Packed
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              {FRESHER_PACKING_CHECKLIST.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                      isChecked
                        ? 'border-tuscan-rust/40 bg-surface text-ink-charcoal'
                        : 'border-tuscan-hairline bg-surface/40 hover:border-tuscan-terracotta'
                    }`}
                  >
                    <div className="mt-0.5 text-tuscan-rust">
                      {isChecked ? (
                        <CheckSquare className="h-4 w-4 text-tuscan-rust" />
                      ) : (
                        <Square className="h-4 w-4 text-ink-muted" />
                      )}
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${isChecked ? 'line-through text-ink-muted' : 'text-ink-charcoal'}`}>
                          {item.item}
                        </span>
                        {item.critical && (
                          <span className="font-mono text-xs text-tuscan-rust font-semibold">
                            (Mandatory)
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-ink-muted font-mono mt-0.5 block">
                        Category: {item.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: TRAVEL, BUSES & BUILDINGS */}
      {activeSubTab === 'travel' && (
        <div className="space-y-8">
          {/* Daily Bus Routes */}
          <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-6">
            <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-charcoal">
              University Bus Routes from Chennai & Tiruvallur
            </h3>
            <p className="text-base text-ink-slate leading-[1.65]">
              Amrita operates over 20 college buses for day scholars. Nearest suburban railway stations are <strong>Avadi (18 km)</strong> and <strong>Tiruvallur (12 km)</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {BUS_ROUTES.map((route) => (
                <div key={route.id} className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
                  <div className="flex items-center justify-between font-mono font-bold text-tuscan-rust text-xs mb-1.5">
                    <span>{route.id} • Departure: {route.time}</span>
                    <span className="text-ink-muted font-normal">{route.distance}</span>
                  </div>
                  <p className="text-ink-slate leading-relaxed text-sm">
                    {route.route}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Hours Dress Code */}
          <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-4">
            <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-charcoal">
              Dress Code & Campus Protocol
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-ink-slate">
              <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
                <strong className="text-ink-charcoal font-semibold block mb-1">Boys:</strong>
                Formal collared shirts (tucked in), formal trousers, and closed leather or formal shoes. Round-neck T-shirts, ripped jeans, and sandals are not permitted during class hours.
              </div>
              <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
                <strong className="text-ink-charcoal font-semibold block mb-1">Girls:</strong>
                Formal Salwar Kameez or Churidar with pinned dupatta, or formal collared kurtis.
              </div>
            </div>
            <p className="text-xs text-ink-muted mt-2">
              Wearing your Amrita RFID smart card around the neck on the university lanyard is strictly mandatory.
            </p>
          </div>

          {/* Campus Buildings Directory */}
          <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-6">
            <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-charcoal">
              Campus Buildings & Facilities Directory
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CAMPUS_NODES.map((node) => {
                const isSelected = node.id === selectedBuildingId;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      soundFx.click();
                      setSelectedBuildingId(node.id);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-tuscan-rust bg-surface shadow-sm'
                        : 'border-tuscan-hairline bg-surface/40 hover:border-tuscan-terracotta'
                    }`}
                  >
                    <div className="font-heading font-semibold text-sm text-ink-charcoal">
                      {node.name}
                    </div>
                    <div className="font-mono text-xs text-ink-muted mt-0.5">
                      Code: {node.code}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Building Details */}
            <div className="p-5 rounded-xl border border-tuscan-hairline bg-surface text-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-heading font-semibold text-ink-charcoal text-base">{selectedBuilding.name}</span>
                <span className="font-mono text-xs text-ink-muted">
                  Walk time from main gate: {selectedBuilding.walkTimeFromGate}
                </span>
              </div>
              <p className="text-ink-slate leading-relaxed">
                {selectedBuilding.description}
              </p>
              <div className="pt-1 text-xs text-ink-muted">
                <strong>Operating Hours: </strong>{selectedBuilding.timings}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

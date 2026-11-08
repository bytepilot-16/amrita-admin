import React, { useState } from 'react';
import {
  Clock,
  ShieldCheck,
  Check,
  Square,
  CheckSquare,
  Bus,
  MapPin,
  Coffee,
  Sun,
  Sparkles,
  Moon,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  WEEKLY_MESS_MENU,
  FRESHER_PACKING_CHECKLIST,
  AMRITA_CAMPUS_META,
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
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Page Title & Intro */}
      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-[#8C857B]">
          Student Life & Residential Handbook • Vengal Campus
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] mt-1">
          Hostel, Dining & Campus Guide
        </h1>
        <p className="mt-2 text-sm text-[#57534E] max-w-3xl leading-relaxed">
          Everything prospective students and parents need to know about life at Amrita Vishwa Vidyapeetham, Chennai Campus (Vengal): vegetarian mess menus, residential policies, dress code, and bus routes.
        </p>
      </div>

      {/* Guide Sub-Navigation (Clean Pills) */}
      <div className="flex items-center gap-2 border-b border-[#E2DCD0] pb-3 text-xs font-semibold">
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
                ? 'bg-[#141413] text-[#FBF9F5] shadow-xs'
                : 'text-[#57534E] hover:text-[#141413] hover:bg-[#FAF8F5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB-SECTION 1: MESS & SATVIK DINING */}
      {activeSubTab === 'mess' && (
        <div className="space-y-6">
          {/* Day of the Week Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {WEEKLY_MESS_MENU.map((item) => (
              <button
                key={item.day}
                type="button"
                onClick={() => {
                  soundFx.click();
                  setSelectedDay(item.day);
                }}
                className={`px-3.5 py-1.5 rounded-lg border font-medium transition-all ${
                  selectedDay === item.day
                    ? 'border-[#9E1B34] bg-white text-[#9E1B34] font-semibold shadow-xs'
                    : 'border-[#E2DCD0] bg-white text-[#57534E] hover:border-[#8C857B]'
                }`}
              >
                {item.day}
              </button>
            ))}
          </div>

          {/* Meal Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedMeal === meal.id
                    ? 'border-[#9E1B34] bg-white shadow-paper'
                    : 'border-[#E2DCD0] bg-[#FAF8F5] hover:bg-white'
                }`}
              >
                <div className="font-semibold text-xs text-[#141413]">
                  {meal.label}
                </div>
                <div className="font-mono text-[11px] text-[#8C857B] mt-1">
                  {meal.time}
                </div>
              </button>
            ))}
          </div>

          {/* Active Meal Detailed Menu */}
          <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2DCD0] pb-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#8C857B]">
                  Annapoorna Central Mess • {selectedDay}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#141413] capitalize mt-0.5">
                  {selectedMeal} Menu
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#15803D] bg-[#F0F7F2] px-3 py-1 rounded-full border border-[#D0E6D6]">
                100% Pure Vegetarian (Satvik)
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                Items Served:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedMeal === 'breakfast' &&
                  currentDayMenu.breakfast.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E2DCD0] bg-[#FAF8F5]">
                      <Check className="h-3.5 w-3.5 text-[#9E1B34] shrink-0" />
                      <span className="text-[#141413]">{it}</span>
                    </div>
                  ))}
                {selectedMeal === 'lunch' &&
                  currentDayMenu.lunch.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E2DCD0] bg-[#FAF8F5]">
                      <Check className="h-3.5 w-3.5 text-[#9E1B34] shrink-0" />
                      <span className="text-[#141413]">{it}</span>
                    </div>
                  ))}
                {selectedMeal === 'snacks' &&
                  currentDayMenu.snacks.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E2DCD0] bg-[#FAF8F5]">
                      <Check className="h-3.5 w-3.5 text-[#9E1B34] shrink-0" />
                      <span className="text-[#141413]">{it}</span>
                    </div>
                  ))}
                {selectedMeal === 'dinner' &&
                  currentDayMenu.dinner.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E2DCD0] bg-[#FAF8F5]">
                      <Check className="h-3.5 w-3.5 text-[#9E1B34] shrink-0" />
                      <span className="text-[#141413]">{it}</span>
                    </div>
                  ))}
              </div>

              {/* Special Accompaniment */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E2DCD0] text-xs text-[#57534E]">
                <strong className="text-[#141413]">Beverages & Specials: </strong>
                {selectedMeal === 'breakfast' && currentDayMenu.breakfast.beverage}
                {selectedMeal === 'lunch' && currentDayMenu.lunch.specials}
                {selectedMeal === 'snacks' && currentDayMenu.snacks.beverage}
                {selectedMeal === 'dinner' && currentDayMenu.dinner.sweetOrFruit}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#57534E]">
                <span>Night Canteen is open daily from 8:00 PM – 10:30 PM for fresh juices and snacks.</span>
                <button
                  type="button"
                  onClick={() => onAskQuestion(`What is the mess menu on ${selectedDay}?`)}
                  className="font-medium text-[#9E1B34] hover:underline"
                >
                  Ask in chat →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: HOSTEL RULES & PACKING LIST */}
      {activeSubTab === 'hostel' && (
        <div className="space-y-6">
          {/* Hostel Rules Overview Card */}
          <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#141413]">
              Residential Hostels & Gate Regulations
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              First-year engineering students stay in 4-sharing rooms equipped with individual study desks, bookshelves, wardrobes, ceiling fans, and high-speed Wi-Fi access points.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
                <span className="font-mono text-xs font-bold text-[#9E1B34] block mb-1">01. 8:30 PM Gate Curfew</span>
                <p className="text-[#57534E] leading-relaxed">
                  Hostel main gates close promptly at 8:30 PM. Biometric attendance is recorded nightly between 8:00 PM and 8:30 PM.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
                <span className="font-mono text-xs font-bold text-[#9E1B34] block mb-1">02. Quiet Study Hours</span>
                <p className="text-[#57534E] leading-relaxed">
                  9:00 PM to 10:30 PM is observed as mandatory study time across all residential blocks.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
                <span className="font-mono text-xs font-bold text-[#9E1B34] block mb-1">03. Online Outing Pass</span>
                <p className="text-[#57534E] leading-relaxed">
                  Weekend passes are submitted on the Amrita MMS portal and verified via an SMS authorization code sent to parents.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E2DCD0] text-xs text-[#57534E]">
              <strong className="text-[#141413]">Hostel Fee: </strong>
              Annual accommodation and mess charges total approx. ₹1,10,000 / year (includes room, 4-time vegetarian meals, and basic laundry).
            </div>
          </div>

          {/* Interactive Checkable Packing Checklist */}
          <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2DCD0] pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#141413]">
                  First-Year Fresher Packing Checklist
                </h3>
                <p className="text-xs text-[#57534E]">
                  Check off items as you pack for your campus arrival.
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-[#9E1B34]">
                  {completedCount} of {totalItems} Packed
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {FRESHER_PACKING_CHECKLIST.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      isChecked
                        ? 'border-[#15803D]/40 bg-[#F0F7F2] text-[#141413]'
                        : 'border-[#E2DCD0] bg-white hover:border-[#8C857B]'
                    }`}
                  >
                    <div className="mt-0.5 text-[#9E1B34]">
                      {isChecked ? (
                        <CheckSquare className="h-4 w-4 text-[#15803D]" />
                      ) : (
                        <Square className="h-4 w-4 text-[#8C857B]" />
                      )}
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${isChecked ? 'line-through text-[#8C857B]' : 'text-[#141413]'}`}>
                          {item.item}
                        </span>
                        {item.critical && (
                          <span className="font-mono text-[10px] text-[#9E1B34] font-semibold">
                            (Mandatory)
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#8C857B] font-mono mt-0.5 block">
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
        <div className="space-y-6">
          {/* Daily Bus Routes */}
          <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#141413]">
              University Bus Routes from Chennai & Tiruvallur
            </h3>
            <p className="text-xs text-[#57534E]">
              Amrita operates over 20 college buses for day scholars. Nearest suburban railway stations are <strong>Avadi (18 km)</strong> and <strong>Tiruvallur (12 km)</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {BUS_ROUTES.map((route) => (
                <div key={route.id} className="p-3.5 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
                  <div className="flex items-center justify-between font-mono font-bold text-[#9E1B34] text-xs mb-1">
                    <span>{route.id} • Departure: {route.time}</span>
                    <span className="text-[#8C857B] font-normal">{route.distance}</span>
                  </div>
                  <p className="text-[#57534E] leading-relaxed">
                    {route.route}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Hours Dress Code */}
          <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#141413]">
              Dress Code & Campus Protocol
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#57534E]">
              <div className="p-3.5 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
                <strong className="text-[#141413] block mb-1">Boys:</strong>
                Formal collared shirts (tucked in), formal trousers, and closed leather or formal shoes. Round-neck T-shirts, ripped jeans, and sandals are not permitted during class hours.
              </div>
              <div className="p-3.5 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
                <strong className="text-[#141413] block mb-1">Girls:</strong>
                Formal Salwar Kameez or Churidar with pinned dupatta, or formal collared kurtis.
              </div>
            </div>
            <p className="text-[11px] text-[#8C857B]">
              Wearing your Amrita RFID smart card around the neck on the university lanyard is strictly mandatory.
            </p>
          </div>

          {/* Campus Buildings Directory */}
          <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#141413]">
              Campus Buildings & Facilities Directory
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#9E1B34] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#E2DCD0] bg-white hover:border-[#8C857B]'
                    }`}
                  >
                    <div className="font-semibold text-xs text-[#141413]">
                      {node.name}
                    </div>
                    <div className="font-mono text-[10px] text-[#8C857B] mt-0.5">
                      Code: {node.code}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Building Details */}
            <div className="p-4 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#141413] text-sm">{selectedBuilding.name}</span>
                <span className="font-mono text-[11px] text-[#8C857B]">
                  Walk time from main gate: {selectedBuilding.walkTimeFromGate}
                </span>
              </div>
              <p className="text-[#57534E] leading-relaxed">
                {selectedBuilding.description}
              </p>
              <div className="pt-2 text-[11px] text-[#57534E]">
                <strong>Operating Hours: </strong>{selectedBuilding.timings}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

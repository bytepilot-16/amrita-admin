import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Clock,
  Shield,
  Layers,
  ArrowRight,
  BookOpen,
  Cpu,
  Home,
  Utensils,
  Trophy,
  Heart,
  Bus,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';
import { CAMPUS_NODES, BuildingNode, BUS_ROUTES } from '../../data/amritaChennaiData';

interface CampusBlueprintProps {
  onAskChat: (prompt: string) => void;
}

export const CampusBlueprint: React.FC<CampusBlueprintProps> = ({ onAskChat }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('ab-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showBusModal, setShowBusModal] = useState<boolean>(false);

  const selectedNode = CAMPUS_NODES.find((n) => n.id === selectedNodeId) || CAMPUS_NODES[0];

  const filteredNodes = CAMPUS_NODES.filter((node) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'academic') return node.category === 'academic' || node.category === 'research';
    if (activeCategory === 'hostel') return node.category === 'residential';
    if (activeCategory === 'lifestyle') return node.category === 'dining' || node.category === 'sports' || node.category === 'spiritual';
    return true;
  });

  const getCategoryIcon = (category: BuildingNode['category']) => {
    switch (category) {
      case 'academic':
        return <BookOpen className="h-3 w-3" />;
      case 'research':
        return <Cpu className="h-3 w-3" />;
      case 'residential':
        return <Home className="h-3 w-3" />;
      case 'dining':
        return <Utensils className="h-3 w-3" />;
      case 'sports':
        return <Trophy className="h-3 w-3" />;
      case 'spiritual':
        return <Heart className="h-3 w-3" />;
      case 'utility':
        return <Bus className="h-3 w-3" />;
      default:
        return <MapPin className="h-3 w-3" />;
    }
  };

  const getCategoryBadgeClass = (category: BuildingNode['category']) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'research':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'residential':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'dining':
        return 'bg-emerald-light text-emerald-amrita border-emerald-amrita/30';
      case 'sports':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'spiritual':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Blueprint Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2DCD0] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amrita-crimson text-white">
              <Navigation className="h-3.5 w-3.5" />
            </span>
            <h2 className="font-serif text-xl font-bold tracking-tight text-[#141413]">
              2.5D Vengal Campus Blueprint
            </h2>
          </div>
          <p className="mt-0.5 text-xs text-[#57534E]">
            Architectural schematic of Amrita Vishwa Vidyapeetham, Chennai Campus (Vengal, Tiruvallur)
          </p>
        </div>

        {/* Bus Routes Quick Button */}
        <button
          type="button"
          onClick={() => setShowBusModal(!showBusModal)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2DCD0] bg-white px-3 py-1 text-xs font-semibold text-[#141413] shadow-paper-sm hover:border-amrita-crimson transition-all self-start sm:self-auto"
        >
          <Bus className="h-3.5 w-3.5 text-amrita-crimson" />
          <span>{showBusModal ? 'Close Transit Routes' : '20+ College Bus Routes'}</span>
        </button>
      </div>

      {/* Transit Routes Expandable Panel */}
      <AnimatePresence>
        {showBusModal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl border border-amrita-border bg-amrita-light/30 p-4 shadow-paper-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amrita-crimson">
                Campus Daily Bus Routes (Morning Commute)
              </h4>
              <span className="text-[11px] font-mono text-[#57534E]">
                Nearest Suburban Trains: Avadi & Tiruvallur
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {BUS_ROUTES.map((route) => (
                <div
                  key={route.id}
                  className="rounded-lg border border-[#E2DCD0] bg-white p-2.5 shadow-xs"
                >
                  <div className="flex items-center justify-between font-mono font-bold text-amrita-crimson text-[11px] mb-1">
                    <span>{route.id} — Dept: {route.time}</span>
                    <span className="text-[#8C857B]">{route.distance}</span>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    {route.route}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-medium">
        {[
          { id: 'all', label: 'All Campus Nodes' },
          { id: 'academic', label: 'Academic & Labs' },
          { id: 'hostel', label: 'Hostel Quarters' },
          { id: 'lifestyle', label: 'Dining, Sports & Spiritual' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-full border transition-all ${
              activeCategory === tab.id
                ? 'bg-amrita-crimson border-amrita-crimson text-white font-semibold shadow-paper-sm'
                : 'border-[#E2DCD0] bg-white text-[#57534E] hover:bg-[#F4F0EA]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2.5D Architectural Canvas / SVG Interactive Map */}
      <div className="relative rounded-2xl border border-[#E2DCD0] bg-[#FAF7F0] p-4 shadow-paper overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 architectural-grid opacity-70 pointer-events-none" />

        {/* Isometric schematic vector layout */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-[#E6E1D6] bg-[#F7F3EB]">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Campus perimeter grass ground */}
            <rect width="1000" height="600" fill="#F4EFE6" />

            {/* Tree canopy decorative clusters */}
            <g opacity="0.35" fill="#C5D3B8">
              <circle cx="120" cy="120" r="45" />
              <circle cx="160" cy="140" r="35" />
              <circle cx="880" cy="140" r="50" />
              <circle cx="920" cy="180" r="40" />
              <circle cx="140" cy="460" r="55" />
              <circle cx="860" cy="480" r="60" />
            </g>

            {/* Architectural road network pathways */}
            {/* Central Avenue from Gate */}
            <path
              d="M 500 560 L 500 240 L 480 200 L 320 180"
              stroke="#D5CDC0"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 500 420 L 750 360 L 780 180"
              stroke="#D5CDC0"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 500 380 L 250 340 L 220 310"
              stroke="#D5CDC0"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 500 240 L 650 200"
              stroke="#D5CDC0"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Active Walk Path Highlight from Transit Gate to Selected Node */}
            {selectedNode && (
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                d={`M 480 550 Q 500 380, ${selectedNode.x * 10} ${selectedNode.y * 6}`}
                stroke="#A4123F"
                strokeWidth="4"
                strokeDasharray="6 6"
                fill="none"
              />
            )}

            {/* Building 2.5D Isometric footprint representations */}
            {CAMPUS_NODES.map((node) => {
              const cx = node.x * 10;
              const cy = node.y * 6;
              const isSelected = node.id === selectedNodeId;

              return (
                <g key={`footprint-${node.id}`}>
                  {/* Building shadow */}
                  <ellipse
                    cx={cx + 4}
                    cy={cy + 16}
                    rx="32"
                    ry="16"
                    fill="rgba(20, 20, 19, 0.08)"
                  />
                  {/* Building block isometric footprint */}
                  <rect
                    x={cx - 28}
                    y={cy - 12}
                    width="56"
                    height="28"
                    rx="6"
                    fill={isSelected ? '#FBEBED' : '#EDE8DF'}
                    stroke={isSelected ? '#A4123F' : '#D0C7B9'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                  />
                  {/* Node label inside footprint */}
                  <text
                    x={cx}
                    y={cy + 6}
                    textAnchor="middle"
                    fontFamily="JetBrains Mono"
                    fontSize="10"
                    fontWeight="600"
                    fill={isSelected ? '#A4123F' : '#57534E'}
                  >
                    {node.code}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive HTML glowing pins mapped on coordinates */}
          {filteredNodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -100%)',
                }}
                className={`group absolute z-20 flex flex-col items-center transition-all ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
              >
                {/* Pin Header Tooltip on hover/active */}
                <span
                  className={`pointer-events-none mb-1 whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-bold shadow-paper-sm transition-all ${
                    isSelected
                      ? 'bg-amrita-crimson text-white scale-100 opacity-100'
                      : 'bg-white text-[#141413] border border-[#E2DCD0] opacity-80 group-hover:opacity-100'
                  }`}
                >
                  {node.name}
                </span>

                {/* Animated Glowing Pin Point */}
                <div className="relative">
                  {isSelected && (
                    <span className="absolute -inset-1.5 animate-ping rounded-full bg-amrita-crimson/30" />
                  )}
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full shadow-paper transition-all ${
                      isSelected
                        ? 'bg-amrita-crimson text-white ring-4 ring-amrita-crimson/20'
                        : 'bg-white text-amrita-crimson border border-[#E2DCD0] group-hover:bg-[#FBEBED]'
                    }`}
                  >
                    {getCategoryIcon(node.category)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Blueprint legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-[11px] text-[#8C857B]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amrita-crimson" />
              Selected Node
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#D5CDC0]" />
              Campus Arterial Road
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#C5D3B8]" />
              Eco Landscaping
            </span>
          </div>
          <span className="font-mono text-[10px]">Tap any pin for detailed specifications</span>
        </div>
      </div>

      {/* Selected Node Inspector Drawer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-[#E2DCD0] bg-white p-5 shadow-paper-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2DCD0] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getCategoryBadgeClass(selectedNode.category)}`}>
                  {selectedNode.category}
                </span>
                <span className="font-mono text-xs text-[#8C857B]">
                  ID: {selectedNode.code}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#141413]">
                {selectedNode.name}
              </h3>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto font-mono text-xs">
              <div className="rounded-lg border border-[#E2DCD0] bg-[#FBF9F5] px-3 py-1.5">
                <div className="flex items-center gap-1 text-[#8C857B] text-[10px]">
                  <Navigation className="h-3 w-3" />
                  <span>From Main Gate</span>
                </div>
                <div className="font-bold text-[#141413] mt-0.5">
                  {selectedNode.walkTimeFromGate}
                </div>
              </div>

              <div className="rounded-lg border border-[#E2DCD0] bg-[#FBF9F5] px-3 py-1.5">
                <div className="flex items-center gap-1 text-[#8C857B] text-[10px]">
                  <Clock className="h-3 w-3" />
                  <span>Access Window</span>
                </div>
                <div className="font-bold text-[#141413] mt-0.5">
                  {selectedNode.timings}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-[#57534E]">
            {selectedNode.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-3 border-t border-[#E2DCD0]/60">
            {/* Rules & Protocols */}
            <div>
              <h5 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#141413] mb-2">
                <Shield className="h-3.5 w-3.5 text-amrita-crimson" />
                <span>Operating Rules & Protocols</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-[#57534E]">
                {selectedNode.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amrita-crimson shrink-0 mt-1.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Facilities */}
            <div>
              <h5 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#141413] mb-2">
                <Sparkles className="h-3.5 w-3.5 text-amrita-gold" />
                <span>Key Infrastructure & Labs</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-[#57534E]">
                {selectedNode.facilities.map((fac, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="h-3 w-3 text-amrita-gold shrink-0 mt-0.5" />
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action to ask chatbot */}
          <div className="mt-4 pt-3 border-t border-[#E2DCD0] flex justify-end">
            <button
              type="button"
              onClick={() => onAskChat(selectedNode.relatedQuery)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-amrita-crimson px-3.5 py-1.5 text-xs font-semibold text-white shadow-paper-sm hover:bg-amrita-dark transition-colors"
            >
              <span>Ask AI Chatbot about this Building</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


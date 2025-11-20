import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown, Building2, BookOpen, Beaker, GraduationCap, Users, Palette } from 'lucide-react';
import { buildings } from '../data/buildings';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Building2 },
  { id: 'popular', label: 'Popular', icon: Users },
  { id: 'Libraries', label: 'Libraries', icon: BookOpen },
  { id: 'STEM', label: 'STEM', icon: Beaker },
  { id: 'Humanities', label: 'Humanities', icon: GraduationCap },
  { id: 'Campus Life', label: 'Campus Life', icon: Users },
];

const BuildingSelect = ({ label, value, onChange, placeholder, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filter buildings
  const filteredBuildings = buildings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    if (activeCategory === 'popular') return matchesSearch && b.popular;
    return matchesSearch && b.category === activeCategory;
  });

  const selectedBuilding = buildings.find(b => b.name === value);

  return (
    <div className="relative group" ref={wrapperRef}>
      <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 ml-1">
        {label}
      </label>
      
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left bg-white/50 hover:bg-white/80 transition-all border rounded-xl px-4 py-3 flex items-center justify-between shadow-sm
          ${isOpen ? 'bg-white border-primary-500 ring-2 ring-primary-100' : 'border-neutral-200'}
        `}
      >
        <span className={`font-medium truncate ${value ? 'text-neutral-800' : 'text-neutral-400'}`}>
          {value || placeholder}
        </span>
        <div className="text-neutral-400">
          {Icon ? <Icon size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-100 z-50 overflow-hidden flex flex-col max-h-[400px]"
          >
            {/* Search Header */}
            <div className="p-3 border-b border-neutral-100 bg-neutral-50/50 sticky top-0 z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search buildings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
              
              {/* Categories */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar mask-linear-fade">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors
                      ${activeCategory === cat.id 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'}
                    `}
                  >
                    {cat.icon && <cat.icon size={12} />}
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto p-2 space-y-1">
              {filteredBuildings.length > 0 ? (
                filteredBuildings.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onChange(b.name);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-colors group
                      ${value === b.name ? 'bg-primary-50' : 'hover:bg-neutral-50'}
                    `}
                  >
                    <div className={`p-2 rounded-lg ${value === b.name ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-400 group-hover:bg-white group-hover:shadow-sm transition-all'}`}>
                      <Building2 size={18} />
                    </div>
                    <div>
                      <div className={`font-medium text-sm ${value === b.name ? 'text-primary-900' : 'text-neutral-700'}`}>
                        {b.name}
                      </div>
                      <div className="text-xs text-neutral-400 flex items-center gap-1">
                        {b.category && <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-[10px]">{b.category}</span>}
                        {b.popular && <span className="text-amber-500 flex items-center gap-0.5"><Users size={10} /> Popular</span>}
                      </div>
                    </div>
                    {value === b.name && (
                      <div className="ml-auto text-primary-600">
                        <MapPin size={16} />
                      </div>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-neutral-400">
                  <Building2 size={32} className="mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No buildings found</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuildingSelect;

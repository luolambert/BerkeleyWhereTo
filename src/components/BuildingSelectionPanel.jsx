import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Building2,
  BookOpen,
  Beaker,
  GraduationCap,
  Users,
  Palette,
  Briefcase,
  X,
  Home,
  Dumbbell,
  Microscope,
  Flag,
  Scale,
} from "lucide-react";
import { buildings as freshmanBuildings } from "../data/buildings";
import { buildings as advancedBuildings } from "../data/advanced_building";

const FRESHMAN_CATEGORIES = [
  { id: "all", label: "All", icon: Building2 },
  { id: "popular", label: "Popular", icon: Users },
  { id: "STEM", label: "STEM", icon: Beaker },
  { id: "Humanities", label: "Humanities", icon: GraduationCap },
  { id: "Business", label: "Business", icon: Briefcase },
  { id: "Arts & Design", label: "Arts", icon: Palette },
  { id: "Libraries", label: "Libraries", icon: BookOpen },
  { id: "Campus Life", label: "Campus Life", icon: Users },
];

const ADVANCED_CATEGORIES = [
  { id: "all", label: "All", icon: Building2 },
  { id: "popular", label: "Popular", icon: Users },
  { id: "STEM", label: "STEM", icon: Beaker },
  { id: "Humanities", label: "Humanities", icon: GraduationCap },
  { id: "Business", label: "Business", icon: Briefcase },
  { id: "Arts & Design", label: "Arts", icon: Palette },
  { id: "Libraries", label: "Libraries", icon: BookOpen },
  { id: "Campus Life", label: "Campus Life", icon: Users },
  { id: "Housing", label: "Housing", icon: Home },
  { id: "Athletics", label: "Athletics", icon: Dumbbell },
  { id: "Research", label: "Research", icon: Microscope },
  { id: "Professional", label: "Professional", icon: Scale },
  { id: "Admin", label: "Admin", icon: Building2 },
  { id: "Landmark", label: "Landmark", icon: Flag },
];

const BuildingSelectionPanel = ({ onSelect, onClose, selectedValue }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mode, setMode] = useState("freshman"); // 'freshman' | 'advanced'
  const inputRef = useRef(null);

  const categories = mode === "freshman" ? FRESHMAN_CATEGORIES : ADVANCED_CATEGORIES;



  // Focus search input when mounted
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, []);

  // Filter buildings
  const currentBuildings = mode === 'freshman' ? freshmanBuildings : advancedBuildings;

  const filteredBuildings = currentBuildings.filter((b) => {
    const matchesSearch = b.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (activeCategory === "all") return matchesSearch;
    if (activeCategory === "popular") return matchesSearch && b.popular;
    return matchesSearch && b.category === activeCategory;
  });

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="h-full w-full bg-white/95 backdrop-blur-xl shadow-2xl shadow-neutral-900/20 rounded-3xl border border-white/50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-neutral-100 flex items-center gap-4 bg-white/50 shrink-0">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a building..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-100 hover:bg-neutral-50 focus:bg-white border-2 border-transparent focus:border-primary-500 rounded-2xl pl-12 pr-4 py-3 text-lg font-medium transition-all outline-none"
          />
        </div>
        
        {/* Mode Toggle */}
        <div className="bg-neutral-100 p-1 rounded-xl flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              setMode("freshman");
              setActiveCategory("all");
            }}
            className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
              mode === "freshman"
                ? "bg-white text-primary-600 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Freshman
          </button>
          <button
            onClick={() => {
              setMode("advanced");
              setActiveCategory("all");
            }}
            className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
              mode === "advanced"
                ? "bg-white text-primary-600 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Advanced
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Categories */}
      <div className="px-6 py-3 border-b border-neutral-100 bg-white/50 shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all
                        ${
                          activeCategory === cat.id
                            ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }
                        `}
            >
              {cat.icon && <cat.icon size={16} />}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-neutral-50/50">
        {filteredBuildings.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
            {filteredBuildings.map((b) => (
              <button
                key={b.id}
                onClick={() => onSelect(b.name)}
                className={`text-left p-3 rounded-2xl border transition-all group relative overflow-hidden
                                ${
                                  selectedValue === b.name
                                    ? "bg-primary-50 border-primary-500 ring-1 ring-primary-500"
                                    : "bg-white border-neutral-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5"
                                }
                            `}
              >
                <div className="flex items-start justify-between mb-2">
                  <div
                    className={`p-1.5 rounded-xl ${
                      selectedValue === b.name
                        ? "bg-primary-100 text-primary-600"
                        : "bg-neutral-100 text-neutral-500 group-hover:bg-primary-50 group-hover:text-primary-600"
                    } transition-colors`}
                  >
                    <Building2 size={18} />
                  </div>
                  {b.popular && (
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Users size={10} /> Popular
                    </span>
                  )}
                </div>
                <div className="font-bold text-neutral-800 group-hover:text-primary-700 transition-colors text-sm leading-tight break-words">
                  {b.name}
                </div>
                <div className="text-xs text-neutral-500 mt-1 font-medium">
                  {b.category}
                </div>
                
                {/* Student Type Tags */}
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {b.undergrad && (
                    <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                      Undergrad
                    </span>
                  )}
                  {b.grad && (
                    <span className="bg-purple-50 text-purple-600 border border-purple-100 text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                      Grad
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-neutral-400">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No buildings found</p>
            <p className="text-sm">Try adjusting your search or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingSelectionPanel;

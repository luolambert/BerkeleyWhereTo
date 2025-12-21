/**
 * Building Categories Constants
 * Extracted from BuildingSelectionPanel for reusability
 */
import {
  Building2,
  BookOpen,
  Beaker,
  GraduationCap,
  Users,
  Palette,
  Briefcase,
  Home,
  Dumbbell,
  Microscope,
  Flag,
  Scale,
  Car,
  Bus,
  Wrench,
} from 'lucide-react';

// Categories for freshman/basic mode
export const FRESHMAN_CATEGORIES = [
  { id: 'all', label: 'All', icon: Building2 },
  { id: 'STEM', label: 'STEM', icon: Beaker, match: ['Science', 'Engineering'] },
  { id: 'Humanities', label: 'Humanities', icon: GraduationCap, match: ['General', 'Social Sci'] },
  { id: 'Business', label: 'Business', icon: Briefcase, match: ['Business'] },
  { id: 'Arts', label: 'Arts & Culture', icon: Palette, match: ['Arts', 'Culture'] },
  { id: 'Libraries', label: 'Libraries', icon: BookOpen, match: ['Library'] },
  { id: 'Campus Life', label: 'Campus Life', icon: Users, match: ['Student Life', 'Wellness', 'Food'] },
  { id: 'Housing', label: 'Housing', icon: Home, match: ['Housing'] },
  { id: 'Athletics', label: 'Athletics', icon: Dumbbell, match: ['Athletics'] },
  { id: 'Landmark', label: 'Landmarks', icon: Flag, match: ['Landmark'] },
  { id: 'Admin', label: 'Admin', icon: Building2, match: ['Admin'] },
];

// Categories for advanced mode with more options
export const ADVANCED_CATEGORIES = [
  { id: 'all', label: 'All', icon: Building2 },
  { id: 'popular', label: 'Popular', icon: Users },
  { id: 'STEM', label: 'STEM', icon: Beaker, match: ['STEM'] },
  { id: 'Humanities', label: 'Humanities', icon: GraduationCap, match: ['Humanities'] },
  { id: 'Business', label: 'Business', icon: Briefcase, match: ['Business'] },
  { id: 'Arts', label: 'Arts', icon: Palette, match: ['Arts & Design'] },
  { id: 'Libraries', label: 'Libraries', icon: BookOpen, match: ['Libraries'] },
  { id: 'Campus Life', label: 'Campus Life', icon: Users, match: ['Campus Life'] },
  { id: 'Housing', label: 'Housing', icon: Home, match: ['Housing'] },
  { id: 'Athletics', label: 'Athletics', icon: Dumbbell, match: ['Athletics'] },
  { id: 'Research', label: 'Research', icon: Microscope, match: ['Research'] },
  { id: 'Professional', label: 'Professional', icon: Scale, match: ['Professional'] },
  { id: 'Admin', label: 'Admin', icon: Building2, match: ['Admin'] },
  { id: 'Landmark', label: 'Landmark', icon: Flag, match: ['Landmark'] },
  { id: 'Services', label: 'Services', icon: Wrench, match: ['Services'] },
  { id: 'Parking', label: 'Parking', icon: Car, match: ['Parking'] },
  { id: 'Transport', label: 'Transport', icon: Bus, match: ['Transport'] },
];

/**
 * Get categories by mode
 * @param {'freshman'|'advanced'} mode 
 * @returns {Array} Categories array
 */
export function getCategoriesByMode(mode) {
  return mode === 'freshman' ? FRESHMAN_CATEGORIES : ADVANCED_CATEGORIES;
}

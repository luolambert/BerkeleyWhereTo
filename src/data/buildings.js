export const buildings = [
  // The "Big Three" (Core general education lecture halls)
  { id: 'dwinelle', name: 'Dwinelle Hall', lat: 37.8706, lng: -122.2605, category: 'General', undergrad: true, grad: true },
  { id: 'wheeler', name: 'Wheeler Hall', lat: 37.8713, lng: -122.2580, category: 'General', undergrad: true, grad: true },
  { id: 'pimentel', name: 'Pimentel Hall', lat: 37.8734, lng: -122.2560, category: 'General', undergrad: true, grad: true },

  // STEM Core (Science and Engineering foundations)
  { id: 'valley_life', name: 'Valley Life Sciences (VLSB)', lat: 37.8715, lng: -122.2620, category: 'Science', undergrad: true, grad: true },
  { id: 'evans', name: 'Evans Hall', lat: 37.8736, lng: -122.2578, category: 'Science', undergrad: true, grad: true },
  { id: 'physics', name: 'Physics Building', lat: 37.8729, lng: -122.2573, category: 'Science', undergrad: true, grad: true },
  { id: 'latimer', name: 'Latimer Hall', lat: 37.8732, lng: -122.2567, category: 'Science', undergrad: true, grad: true },
  { id: 'soda', name: 'Soda Hall', lat: 37.8756, lng: -122.2588, category: 'Engineering', undergrad: true, grad: true },
  { id: 'cory', name: 'Cory Hall', lat: 37.8752, lng: -122.2576, category: 'Engineering', undergrad: true, grad: true },
  { id: 'etcheverry', name: 'Etcheverry Hall', lat: 37.8759, lng: -122.2593, category: 'Engineering', undergrad: true, grad: true },
  { id: 'hearst_mining', name: 'Hearst Memorial Mining', lat: 37.8739, lng: -122.2566, category: 'Engineering', undergrad: true, grad: true },

  // Libraries & Study Spaces
  { id: 'moffitt', name: 'Moffitt Library', lat: 37.8726, lng: -122.2606, category: 'Library', undergrad: true, grad: true },
  { id: 'doe', name: 'Doe Memorial Library', lat: 37.8721, lng: -122.2593, category: 'Library', undergrad: true, grad: true },
  { id: 'east_asian', name: 'C.V. Starr East Asian Library', lat: 37.8730, lng: -122.2599, category: 'Library', undergrad: true, grad: true },
  { id: 'grimes', name: 'Grimes Engineering Center', lat: 37.8739, lng: -122.2583, category: 'Library', undergrad: true, grad: true },
  { id: 'bancroft', name: 'Bancroft Library', lat: 37.8723, lng: -122.2598, category: 'Library', undergrad: true, grad: true },

  // Social Sciences, Arts & Professional
  { id: 'social_sciences', name: 'The Social Sciences Building', lat: 37.8700, lng: -122.2579, category: 'Social Sci', undergrad: true, grad: true },
  { id: 'bauer_wurster', name: 'Bauer Wurster Hall', lat: 37.8704, lng: -122.2546, category: 'Arts', undergrad: true, grad: true },
  { id: 'haas', name: 'Haas School of Business', lat: 37.8716, lng: -122.2533, category: 'Business', undergrad: true, grad: true },
  { id: 'morgan', name: 'Morgan Hall', lat: 37.8733, lng: -122.2642, category: 'Science', undergrad: true, grad: true },
  { id: 'genetics', name: 'Genetics and Plant Biology', lat: 37.8742, lng: -122.2643, category: 'Science', undergrad: true, grad: true },
  { id: 'anth_art', name: 'Anth & Art Practice', lat: 37.8699, lng: -122.2552, category: 'Arts', undergrad: true, grad: true },

  // Student Life & Essentials
  { id: 'mlk', name: 'Martin Luther King Jr. Student Union (MLK)', lat: 37.8692, lng: -122.2597, category: 'Student Life', undergrad: true, grad: true },
  { id: 'sproul', name: 'Sproul Hall', lat: 37.8696, lng: -122.2591, category: 'Admin', undergrad: true, grad: true },
  { id: 'rsf', name: 'Recreational Sports Facility (RSF)', lat: 37.8686, lng: -122.2627, category: 'Wellness', undergrad: true, grad: true },
  { id: 'tang_center', name: 'University Health Services (Tang Center)', lat: 37.8676, lng: -122.2642, category: 'Wellness', undergrad: true, grad: true },
  { id: 'golden_bear_cafe', name: 'Golden Bear Café (GBC)', lat: 37.8698, lng: -122.2603, category: 'Food', undergrad: true, grad: true },

  // Iconic Landmarks
  { id: 'sather_gate', name: 'Sather Gate', lat: 37.8703, lng: -122.2595, category: 'Landmark', undergrad: true, grad: true },
  { id: 'campanile', name: 'Sather Tower (The Campanile)', lat: 37.8720, lng: -122.2578, category: 'Landmark', undergrad: true, grad: true },
  { id: 'memorial_glade', name: 'Memorial Glade', lat: 37.8724, lng: -122.2592, category: 'Landmark', undergrad: true, grad: true },

  // Athletics & Culture
  { id: 'stadium', name: 'California Memorial Stadium', lat: 37.8710, lng: -122.2508, category: 'Athletics', undergrad: true, grad: true },
  { id: 'haas_pavilion', name: 'Haas Pavilion', lat: 37.8696, lng: -122.2615, category: 'Athletics', undergrad: true, grad: true },
  { id: 'bampfa', name: 'Berkeley Art Museum (BAMPFA)', lat: 37.8709, lng: -122.2664, category: 'Culture', undergrad: true, grad: true },

  // Housing (Main base for freshmen)
  { id: 'unit_1', name: 'Unit 1', lat: 37.8671, lng: -122.2557, category: 'Housing', undergrad: true, grad: false },
  { id: 'unit_2', name: 'Unit 2', lat: 37.8661, lng: -122.2555, category: 'Housing', undergrad: true, grad: false },
  { id: 'unit_3', name: 'Unit 3', lat: 37.8670, lng: -122.2595, category: 'Housing', undergrad: true, grad: false },
  { id: 'blackwell', name: 'Blackwell Hall', lat: 37.8677, lng: -122.2603, category: 'Housing', undergrad: true, grad: false },
  { id: 'foothill', name: 'Foothill', lat: 37.8750, lng: -122.2545, category: 'Housing', undergrad: true, grad: false },
  { id: 'clark_kerr', name: 'Clark Kerr Campus', lat: 37.8639, lng: -122.2496, category: 'Housing', undergrad: true, grad: false }
];
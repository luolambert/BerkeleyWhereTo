export const buildings = [
  // Big Three / General Lecture Halls
  { id: 'dwinelle', name: 'Dwinelle Hall', lat: 37.8706, lng: -122.2605, category: 'Humanities', popular: true, undergrad: true, grad: true },
  { id: 'wheeler', name: 'Wheeler Hall', lat: 37.8713, lng: -122.2580, category: 'Humanities', popular: true, undergrad: true, grad: true },
  { id: 'pimentel', name: 'Pimentel Hall', lat: 37.8734, lng: -122.2560, category: 'STEM', popular: true, undergrad: true, grad: true },

  // Engineering
  { id: 'soda', name: 'Soda Hall (CS)', lat: 37.8756, lng: -122.2588, category: 'STEM', popular: true, undergrad: true, grad: true },
  { id: 'cory', name: 'Cory Hall (EE)', lat: 37.8752, lng: -122.2576, category: 'STEM', popular: true, undergrad: true, grad: true },
  { id: 'etcheverry', name: 'Etcheverry Hall', lat: 37.8759, lng: -122.2593, category: 'STEM', popular: true, undergrad: true, grad: true },
  { id: 'jacobs', name: 'Jacobs Hall (Design)', lat: 37.8760, lng: -122.2588, category: 'STEM', popular: true, undergrad: true, grad: true },
  { id: 'davis', name: 'Davis Hall', lat: 37.8747, lng: -122.2578, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'sutardja_dai', name: 'Sutardja Dai Hall (CITRIS)', lat: 37.8749, lng: -122.2585, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'obrien', name: 'O\'Brien Hall', lat: 37.8744, lng: -122.2592, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'mclaughlin', name: 'McLaughlin Hall', lat: 37.8742, lng: -122.2592, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'hearst_mining', name: 'Hearst Memorial Mining Building', lat: 37.8739, lng: -122.2566, category: 'STEM', popular: true, undergrad: true, grad: true },

  // Sciences
  { id: 'valley_life', name: 'Valley Life Sciences Building (VLSB)', lat: 37.8715, lng: -122.2620, category: 'STEM', popular: true, undergrad: true, grad: true },
  { id: 'physics_north', name: 'Physics North (Old LeConte)', lat: 37.8729, lng: -122.2573, category: 'STEM', popular: true, undergrad: true, grad: true },
  { id: 'physics_south', name: 'Physics South (Old LeConte)', lat: 37.8727, lng: -122.2573, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'evans', name: 'Evans Hall', lat: 37.8736, lng: -122.2578, category: 'STEM', popular: true, undergrad: true, grad: true },
  { id: 'campbell', name: 'Campbell Hall', lat: 37.8731, lng: -122.2569, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'latimer', name: 'Latimer Hall', lat: 37.8732, lng: -122.2567, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'hildebrand', name: 'Hildebrand Hall', lat: 37.8733, lng: -122.2563, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'tan', name: 'Tan Hall', lat: 37.8736, lng: -122.2562, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'stanley', name: 'Stanley Hall', lat: 37.8741, lng: -122.2561, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'birge', name: 'Birge Hall', lat: 37.8728, lng: -122.2564, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'lks', name: 'Li Ka Shing Center (LKS)', lat: 37.8730, lng: -122.2653, category: 'STEM', popular: true, undergrad: true, grad: true },
  { id: 'berkeley_way_west', name: 'Berkeley Way West', lat: 37.8723, lng: -122.2670, category: 'STEM', popular: true, undergrad: true, grad: true },
  { id: 'the_gateway', name: 'The Gateway (CDSS)', lat: 37.8745, lng: -122.2608, category: 'STEM', popular: false, undergrad: true, grad: true },

  // Natural Resources
  { id: 'giannini', name: 'Giannini Hall', lat: 37.8735, lng: -122.2624, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'hilgard', name: 'Hilgard Hall', lat: 37.8733, lng: -122.2634, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'wellman', name: 'Wellman Hall', lat: 37.8727, lng: -122.2628, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'mulford', name: 'Mulford Hall', lat: 37.8726, lng: -122.2645, category: 'STEM', popular: false, undergrad: true, grad: true },
  { id: 'morgan', name: 'Morgan Hall', lat: 37.8733, lng: -122.2642, category: 'STEM', popular: false, undergrad: true, grad: true },

  // Research & Off-Campus
  { id: 'lbnl', name: 'Lawrence Berkeley National Lab (LBNL)', lat: 37.8763, lng: -122.2467, category: 'Research', popular: false, undergrad: true, grad: true },
  { id: 'ssl', name: 'Space Sciences Laboratory (SSL)', lat: 37.8790, lng: -122.2465, category: 'Research', popular: false, undergrad: true, grad: true },
  { id: 'rfs', name: 'Richmond Field Station (RFS)', lat: 37.9150, lng: -122.3350, category: 'Research', popular: false, undergrad: true, grad: true },

  // Humanities & Social Sciences
  { id: 'social_sciences', name: 'The Social Sciences Building (Old Barrows)', lat: 37.8700, lng: -122.2579, category: 'Humanities', popular: true, undergrad: true, grad: true },
  { id: 'aapb', name: 'Anth & Art Practice (Old Kroeber)', lat: 37.8699, lng: -122.2552, category: 'Arts & Design', popular: false, undergrad: true, grad: true },
  { id: 'philosophy', name: 'Philosophy Hall (Old Moses)', lat: 37.8707, lng: -122.2563, category: 'Humanities', popular: false, undergrad: true, grad: true },
  { id: 'stephens', name: 'Stephens Hall', lat: 37.8706, lng: -122.2567, category: 'Humanities', popular: false, undergrad: true, grad: true },
  { id: 'south_hall', name: 'South Hall (I-School)', lat: 37.8716, lng: -122.2583, category: 'Humanities', popular: false, undergrad: false, grad: true }, // Graduate School only

  // Arts, Architecture & Design
  { id: 'bauer_wurster', name: 'Bauer Wurster Hall (Architecture)', lat: 37.8704, lng: -122.2546, category: 'Arts & Design', popular: true, undergrad: true, grad: true },
  { id: 'hertz', name: 'Hertz Hall', lat: 37.8703, lng: -122.2559, category: 'Arts & Design', popular: false, undergrad: true, grad: true },
  { id: 'morrison', name: 'Morrison Hall', lat: 37.8702, lng: -122.2562, category: 'Arts & Design', popular: false, undergrad: true, grad: true },
  { id: 'north_gate', name: 'North Gate Hall (Journalism)', lat: 37.8743, lng: -122.2597, category: 'Arts & Design', popular: false, undergrad: false, grad: true }, // Graduate School

  // Professional Schools (Business / Law / Optometry)
  { id: 'haas', name: 'Haas School of Business', lat: 37.8716, lng: -122.2533, category: 'Business', popular: true, undergrad: true, grad: true },
  { id: 'chou', name: 'Chou Hall', lat: 37.8720, lng: -122.2539, category: 'Business', popular: true, undergrad: true, grad: true },
  { id: 'cheit', name: 'Cheit Hall', lat: 37.8717, lng: -122.2538, category: 'Business', popular: false, undergrad: true, grad: true },
  { id: 'law_building', name: 'The Law Building (Old Boalt)', lat: 37.8693, lng: -122.2535, category: 'Professional', popular: false, undergrad: false, grad: true }, // Law School
  { id: 'minor', name: 'Minor Hall (Optometry)', lat: 37.8708, lng: -122.2532, category: 'Professional', popular: false, undergrad: false, grad: true }, // Optometry School
  { id: 'haviland', name: 'Haviland Hall', lat: 37.8735, lng: -122.2553, category: 'Professional', popular: false, undergrad: true, grad: true },

  // Libraries
  { id: 'moffitt', name: 'Moffitt Library', lat: 37.8726, lng: -122.2606, category: 'Libraries', popular: true, undergrad: true, grad: true },
  { id: 'doe', name: 'Doe Memorial Library', lat: 37.8721, lng: -122.2593, category: 'Libraries', popular: true, undergrad: true, grad: true },
  { id: 'bancroft', name: 'Bancroft Library', lat: 37.8723, lng: -122.2598, category: 'Libraries', popular: false, undergrad: true, grad: true },
  { id: 'east_asian', name: 'C.V. Starr East Asian Library', lat: 37.8730, lng: -122.2599, category: 'Libraries', popular: true, undergrad: true, grad: true },
  { id: 'kresge', name: 'Kresge Engineering Library', lat: 37.8739, lng: -122.2583, category: 'Libraries', popular: false, undergrad: true, grad: true },

  // Campus Life, Admin & Landmarks
  { id: 'sproul', name: 'Sproul Hall (Admin)', lat: 37.8696, lng: -122.2591, category: 'Campus Life', popular: true, undergrad: true, grad: true },
  { id: 'mlk', name: 'MLK Jr. Student Union', lat: 37.8692, lng: -122.2597, category: 'Campus Life', popular: true, undergrad: true, grad: true },
  { id: 'eshleman', name: 'Eshleman Hall', lat: 37.8689, lng: -122.2601, category: 'Campus Life', popular: false, undergrad: true, grad: true },
  { id: 'cesar_chavez', name: 'César E. Chávez Student Center', lat: 37.8697, lng: -122.2601, category: 'Campus Life', popular: false, undergrad: true, grad: true },
  { id: 'cal_hall', name: 'California Hall', lat: 37.8713, lng: -122.2593, category: 'Admin', popular: false, undergrad: true, grad: true },
  { id: 'campanile', name: 'Sather Tower (The Campanile)', lat: 37.8720, lng: -122.2578, category: 'Landmark', popular: true, undergrad: true, grad: true },
  { id: 'sather_gate', name: 'Sather Gate', lat: 37.8703, lng: -122.2595, category: 'Landmark', popular: true, undergrad: true, grad: true },
  { id: 'alumni_house', name: 'Alumni House', lat: 37.8691, lng: -122.2610, category: 'Admin', popular: false, undergrad: true, grad: true },
  { id: 'tang_center', name: 'Tang Center (UHS)', lat: 37.8676, lng: -122.2642, category: 'Campus Life', popular: true, undergrad: true, grad: true },

  // Athletics
  { id: 'rsf', name: 'Recreational Sports Facility (RSF)', lat: 37.8686, lng: -122.2627, category: 'Athletics', popular: true, undergrad: true, grad: true },
  { id: 'stadium', name: 'California Memorial Stadium', lat: 37.8710, lng: -122.2508, category: 'Athletics', popular: true, undergrad: true, grad: true },
  { id: 'haas_pavilion', name: 'Haas Pavilion', lat: 37.8696, lng: -122.2615, category: 'Athletics', popular: true, undergrad: true, grad: true },
  { id: 'edwards', name: 'Edwards Stadium', lat: 37.8692, lng: -122.2638, category: 'Athletics', popular: false, undergrad: true, grad: true },
  { id: 'hearst_gym', name: 'Hearst Memorial Gymnasium', lat: 37.8694, lng: -122.2565, category: 'Athletics', popular: false, undergrad: true, grad: true },

  // Housing
  { id: 'unit_1', name: 'Unit 1', lat: 37.8671, lng: -122.2557, category: 'Housing', popular: true, undergrad: true, grad: false },
  { id: 'unit_2', name: 'Unit 2', lat: 37.8661, lng: -122.2555, category: 'Housing', popular: true, undergrad: true, grad: false },
  { id: 'unit_3', name: 'Unit 3', lat: 37.8670, lng: -122.2595, category: 'Housing', popular: true, undergrad: true, grad: false },
  { id: 'blackwell', name: 'Blackwell Hall', lat: 37.8677, lng: -122.2603, category: 'Housing', popular: true, undergrad: true, grad: false },
  { id: 'foothill', name: 'Foothill', lat: 37.8750, lng: -122.2545, category: 'Housing', popular: false, undergrad: true, grad: false },
  { id: 'stern', name: 'Stern Hall', lat: 37.8753, lng: -122.2537, category: 'Housing', popular: false, undergrad: true, grad: false },
  { id: 'clark_kerr', name: 'Clark Kerr Campus', lat: 37.8639, lng: -122.2496, category: 'Housing', popular: true, undergrad: true, grad: false },
  { id: 'anchor_house', name: 'Anchor House', lat: 37.8714, lng: -122.2668, category: 'Housing', popular: true, undergrad: true, grad: false },
  { id: 'i_house', name: 'International House', lat: 37.8694, lng: -122.2514, category: 'Housing', popular: true, undergrad: true, grad: true },
  { id: 'manville', name: 'Manville Apartments (Grad)', lat: 37.8684, lng: -122.2598, category: 'Housing', popular: false, undergrad: false, grad: true },
  { id: 'jackson_house', name: 'Ida Louise Jackson House (Grad)', lat: 37.8685, lng: -122.2535, category: 'Housing', popular: false, undergrad: false, grad: true }
];
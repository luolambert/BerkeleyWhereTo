// Define the order of building IDs for each sorting category
// Each category is now an array of sections: { title: string, ids: string[] }

export const sortOrders = {
  // Sort by: Students' Familiarity / Traffic
  students: [
    {
      title: {
        en: "🌋 Tier 1: The Essential Buildings",
        cn: "🌋 第一梯队: 核心建筑"
      },
      ids: ['dwinelle', 'wheeler', 'soda', 'cory', 'doe', 'moffitt', 'valley_life', 'pimentel', 'physics_north']
    },
    {
      title: {
        en: "💻 Tier 2: Major Department Hubs & Study Centers",
        cn: "💻 第二梯队: 主要院系与学习中心"
      },
      ids: ['etcheverry', 'haas', 'latimer', 'social_sciences', 'bauer_wurster', 'chou', 'lks', 'evans', 'mlk', 'east_asian', 'grimes', 'jacobs']
    },
    {
      title: {
        en: "📚 Tier 3: Specialized & Support Services",
        cn: "📚 第三梯队: 专业课程和支持服务"
      },
      ids: ['davis', 'bancroft', 'lewis', 'hildebrand', 'tan', 'gilman', 'hearst_mining', 'physics_south', 'stephens', 'philosophy']
    },
    {
      title: {
        en: "🏡 Tier 4: Housing & Recreation",
        cn: "🏡 第四梯队: 宿舍和娱乐设施"
      },
      ids: ['unit_1', 'unit_2', 'unit_3', 'blackwell', 'foothill', 'clark_kerr', 'stern', 'bowles', 'i_house', 
            'anchor_house', 'martinez', 'jackson_house', 'manville', 'rssb', 'rsf', 'zellerbach', 'tang_center']
    },
    {
      title: {
        en: "🔬 Tier 5: Research & Low Undergraduate Traffic",
        cn: "🔬 第五梯队: 研究机构和本科生流量低的建筑"
      },
      ids: ['aapb', 'hertz', 'morrison', 'north_gate', 'goldman_school', 'minor', 'law_building', 'haviland', 'morgan', 
            'mulford', 'giannini', 'wellman', 'berkeley_way_west', 'university_hall', 'alumni_house', 'cal_hall', 'south_hall', 'durant', 'anthony', 'campbell', 'birge', 
            'stanley', 'mclaughlin', 'obrien', 'sutardja_dai', 'hesse', 'mccone', 'the_gateway', 'koshland', 
            'genetics', 'barker', 'hilgard', 'weill', 'cheit', 'hargrove', 'eshleman', 'cesar_chavez', 'faculty_club', 
            'womens_faculty_club', 'career_engagement', 'lhs', 'lbnl', 'ssl', 'msri', 'calvin', 'igi', 'simon_hall', 
            'donner', 'blulm', 'rfs', 'police', 'a_and_e', '2483_hearst', 'udar', 'senior_hall', 'heating_plant', 
            'hazmat', 'greenhouse_oxford', 'insectary', 'child_study', 'haste_child_dev']
    }
  ],

  // Sort by: Academic Category (e.g., Humanities -> STEM -> Engineering -> Design)
  categorical: [
    {
      title: {
        en: "📚 1. Academic - General & Humanities",
        cn: "📚 1. 学术 - 通识教育和人文科学"
      },
      ids: ['dwinelle', 'wheeler', 'social_sciences', 'stephens', 'philosophy', 'south_hall', 'cal_hall', 'durant', 'anthony']
    },
    {
      title: {
        en: "🧪 2. Academic - STEM",
        cn: "🧪 2. 学术 - 理工科"
      },
      ids: ['soda', 'cory', 'etcheverry', 'jacobs', 'valley_life', 'lks', 'pimentel', 'physics_north', 'evans', 'physics_south', 
            'lewis', 'latimer', 'hildebrand', 'tan', 'gilman', 'giauque', 'campbell', 'birge', 'stanley', 'davis', 
            'mclaughlin', 'obrien', 'hearst_mining', 'sutardja_dai', 'hesse', 'mccone', 'the_gateway', 'berkeley_way_west', 
            'koshland', 'genetics', 'barker', 'morgan', 'mulford', 'hilgard', 'wellman', 'giannini', 'weill']
    },
    {
      title: {
        en: "🎨 3. Academic - Arts & Design",
        cn: "🎨 3. 学术 - 艺术与设计"
      },
      ids: ['bauer_wurster', 'hertz', 'morrison', 'aapb', 'north_gate', 'bampfa']
    },
    {
      title: {
        en: "💼 4. Professional Schools",
        cn: "💼 4. 专业学院 (法学院、商学院等)"
      },
      ids: ['haas', 'chou', 'cheit', 'law_building', 'minor', 'haviland', 'goldman_school']
    },
    {
      title: {
        en: "📖 5. Libraries & Research Centers",
        cn: "📖 5. 图书馆与研究中心"
      },
      ids: ['moffitt', 'doe', 'bancroft', 'east_asian', 'grimes', 'hargrove']
    },
    {
      title: {
        en: "🎉 6. Campus Life & Student Services",
        cn: "🎉 6. 校园生活与学生服务"
      },
      ids: ['mlk', 'eshleman', 'cesar_chavez', 'zellerbach', 'sproul', 'alumni_house', 'faculty_club', 'womens_faculty_club', 'tang_center', 'career_engagement']
    },
    {
      title: {
        en: "🏡 7. Housing",
        cn: "🏡 7. 学生宿舍"
      },
      ids: ['unit_1', 'unit_2', 'unit_3', 'blackwell', 'foothill', 'stern', 'bowles', 'clark_kerr', 'anchor_house', 'i_house', 'martinez', 'jackson_house', 'manville', 'rssb']
    },
    {
      title: {
        en: "🏃 8. Athletics & Recreation",
        cn: "🏃 8. 运动和娱乐设施"
      },
      ids: ['stadium', 'haas_pavilion', 'rsf', 'edwards', 'hearst_gym', 'spieker', 'legends_aquatic', 'goldman_field', 'levine_fricke', 'maxwell_field', 'underhill', 'strawberry_canyon', 'golden_bear_rec']
    },
    {
      title: {
        en: "🔬 9. Research Institutes",
        cn: "🔬 9. 独立研究机构"
      },
      ids: ['lhs', 'lbnl', 'ssl', 'msri', 'calvin', 'igi', 'simon_hall', 'donner', 'blulm', 'rfs']
    },
    {
      title: {
        en: "🏢 10. Administration & Services",
        cn: "🏢 10. 行政和服务部门"
      },
      ids: ['university_hall', 'police', 'a_and_e', '2483_hearst', 'udar', 'senior_hall', 'heating_plant', 'hazmat', 'greenhouse_oxford', 'insectary', 'child_study', 'haste_child_dev']
    }
  ],

  // Sort by: Popularity / General Fame
  popularity: [
    {
      title: {
        en: "🔥 Most Popular & Iconic - Main Campus Buildings",
        cn: "🔥 最热门和标志性的校园建筑 - 学生和游客必去"
      },
      ids: ['bauer_wurster', 'bampfa', 'berkeley_way_west', 'blackwell', 'east_asian', 'stadium', 'chou', 'clark_kerr', 
            'cory', 'doe', 'dwinelle', 'etcheverry', 'evans', 'haas_pavilion', 'haas', 'hearst_mining', 
            'anchor_house', 'i_house', 'jacobs', 'lhs', 'lks', 'mlk', 'moffitt', 
            'physics_north', 'pimentel', 'rsf', 'soda', 'sproul', 'social_sciences', 
            'unit_1', 'unit_2', 'unit_3', 'tang_center', 'valley_life', 'wheeler', 'zellerbach', 'grimes']
    },
    {
      title: {
        en: "📍 Other Notable Campus Buildings",
        cn: "📍 其他值得注意的校园建筑 - 学术用途为主"
      },
      ids: ['2483_hearst', 'alumni_house', 'aapb', 'anthony', 'a_and_e', 'bancroft', 'barker', 'birge', 'blulm', 'bowles', 
            'cal_hall', 'calvin', 'campbell', 'career_engagement', 'cheit', 'cesar_chavez', 
            'davis', 'donner', 'durant', 'edwards', 'eshleman', 'faculty_club', 
            'foothill', 'genetics', 'giannini', 'giauque', 'gilman', 'golden_bear_rec', 'goldman_field', 'goldman_school', 
            'hargrove', 'child_study', 'haste_child_dev', 'haviland', 'hazmat', 'hearst_gym', 'hertz', 'hesse', 'hildebrand', 
            'hilgard', 'jackson_house', 'igi', 'insectary', 'koshland', 'latimer', 'lbnl', 'legends_aquatic', 
            'levine_fricke', 'lewis', 'lower_sproul_garage', 'manville', 'martinez', 'msri', 'maxwell_field', 'mccone', 
            'mclaughlin', 'minor', 'morgan', 'morrison', 'mulford', 'north_gate', 'obrien', 'greenhouse_oxford', 'philosophy', 
            'physics_south', 'rsf_garage', 'rssb', 'rfs', 'senior_hall', 'simon_hall', 'south_hall', 'ssl', 'spieker', 
            'stanley', 'stephens', 'stern', 'strawberry_canyon', 'sutardja_dai', 'tan', 'the_gateway', 'law_building', 
            'police', 'underhill', 'underhill_parking', 'udar', 'university_hall', 'weill', 
            'wellman', 'womens_faculty_club']
    },
    {
      title: {
        en: "🏛️ Campus Landmarks & Iconic Outdoor Spaces",
        cn: "🏛️ 校园地标和标志性户外空间 - 景点和历史位置"
      },
      ids: ['campanile', 'sather_gate', 'memorial_glade', 'founders_rock', 
            'hearst_greek_theatre', 'botanical_garden', 'class_of_1914', 'west_gate']
    },
    {
      title: {
        en: "🚇 Infrastructure & Transportation",
        cn: "🚇 基础设施和交通设施"
      },
      ids: ['lower_sproul_garage', 'rsf_garage', 'ellsworth_parking', 
            'stadium_parking', 'underhill_parking', 'foothill_parking', 'bart']
    }
  ]
};

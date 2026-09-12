export interface PlantSpecimen {
  id: string;
  name: string;
  scientificName: string;
  room: string;
  subLocation: string;
  lightExposure: string;
  lightCategory: 'direct' | 'bright-indirect' | 'moderate' | 'low';
  fcRange: string;
  photoperiod: string;
  soilMoisture: number; // percentage
  moistureStatus: 'Critical' | 'Needs Water' | 'Sub-dry' | 'Adequate' | 'Moist' | 'Saturated';
  waterCadenceDays: number;
  cadenceDescription: string;
  feedSchedule: string;
  image: string;
  potType: string;
  potSize: string;
  substrate: string;
  volumeWaterMl: number;
  health: 'thriving' | 'critical' | 'moderate';
  lastWatered: string;
  notes: string;
}

export interface CareTask {
  id: string;
  plantId: string;
  plantName: string;
  subLocation: string;
  type: 'water' | 'fertilizer' | 'mist' | 'autonomous';
  badgeLabel: string;
  metricLabel: string;
  description: string;
  actionText: string;
  statusText: string;
  detailLabel: string;
  detailValue: string;
  progressValue: number;
  completed: boolean;
  image: string;
  severity: 'urgent' | 'warning' | 'normal' | 'optimal';
}

export interface MicroZone {
  id: string;
  name: string;
  tempC: number;
  humidityRH: number;
  lightFC: number;
  uvIndex: number;
  plantCount: number;
  status: 'Optimal' | 'Alert' | 'Balancing';
  sensorId: string;
  battery: number;
}

export interface CareLogItem {
  id: string;
  plantName: string;
  action: 'Hydration' | 'Nutrient Feed' | 'Foliage Mist' | 'Repotting' | 'Pruning' | 'Sensor Calibration';
  amount?: string;
  zone: string;
  timestamp: string;
  notes: string;
  operator: string;
}

export interface NutrientProduct {
  id: string;
  name: string;
  type: 'Organic Liquid' | 'Controlled Release' | 'Foliar Spray' | 'Microbial Inoculant';
  targetGroup: string;
  npkRatio: string;
  dilutionRate: string;
  frequency: string;
  nextScheduledDate: string;
  stockRemainingPercent: number;
  description: string;
}

export const INITIAL_PLANTS: PlantSpecimen[] = [
  {
    id: 'ficus-lyrata',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    room: 'Sunroom',
    subLocation: 'South-facing Window',
    lightExposure: 'Bright Indirect • 800-1200 FC',
    lightCategory: 'bright-indirect',
    fcRange: '800-1200 FC',
    photoperiod: '6-8 hrs/day • Index 8.4',
    soilMoisture: 62,
    moistureStatus: 'Moist',
    waterCadenceDays: 8,
    cadenceDescription: 'Water: 7-9 Days',
    feedSchedule: 'Feed: Monthly N-P-K',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnFVq_JlOydRXe1WiWj1IAE0UmcuAdLfrMVD9R4WOGGvgZoUV-VKFgiLfAzCRyS20ELpB8J0p-jCDkF6ymNZiH7qoA5uNFtVnjjPuLJ0rV2c3xTY-PHltUftVYQPQ96su1qqk700W8haBNNTZ71f-uJ4pcHHS89PPoVj8bBR1Z6jTLvqKCoZNz1-NzPM319u0Vwg4SNOBD0tsaHdNcIcC0l7vFMIt5T_NeI0Pr5Pvle0CooLuF7UDu',
    potType: 'Unglazed Terracotta',
    potSize: '14 inch',
    substrate: 'Aroid Bark & Perlite Chunky Blend',
    volumeWaterMl: 800,
    health: 'thriving',
    lastWatered: '4 days ago',
    notes: 'Budding new terminal leaf spike. Ensure gentle leaf wipe to clear dust.'
  },
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    room: 'Living Area',
    subLocation: 'East-facing Glazing',
    lightExposure: 'Mod-Bright • 550 FC',
    lightCategory: 'moderate',
    fcRange: '550 FC',
    photoperiod: '4-6 hrs/day • Filtered',
    soilMoisture: 18,
    moistureStatus: 'Needs Water',
    waterCadenceDays: 6,
    cadenceDescription: 'Water: Every 6 Days',
    feedSchedule: 'Feed: Bi-weekly Liquid',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx-BHE_4beXTS8AJKEjYa3GOh7fcPy8YuALnVGN4AKf5-5D_7Xz08GGtRTeNbEqJznYGaKz0F-wKoV6NCOxvVczSB5zFj53RuPAdErh2qEGFHC4PYd9vdBhcCkVS4DoEphFzwS-x2swCr6v8Pls9Z43G7SMGY8dG-FviJkDBEXEk1H6byIqk8IQYrSYABdthOoVxQAlXY3WPZaIYIz7wIRUof8vFfi6AfpECBwgAwhzfX4YYL_DZ1-',
    potType: 'Ceramic Cylinder with drainage',
    potSize: '12 inch',
    substrate: 'Peat, Pumice, Charcoal, Orchid Bark',
    volumeWaterMl: 350,
    health: 'critical',
    lastWatered: '6 days ago',
    notes: 'Root zone parched. Hydrate thoroughly with 350ml filtered water and wipe foliage.'
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    room: 'Office',
    subLocation: 'North Corner Alcove',
    lightExposure: 'Low Light • 120-250 FC',
    lightCategory: 'low',
    fcRange: '120-250 FC',
    photoperiod: '2-4 hrs/day • Shaded',
    soilMoisture: 44,
    moistureStatus: 'Adequate',
    waterCadenceDays: 18,
    cadenceDescription: 'Water: Every 18 Days',
    feedSchedule: 'Feed: Seasonal Pellet',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTQkOYVZYiBIjXq9Xvyb_3ug_eXwRejh0qVDLmJ82V6rDgc4yS3OpOd8HF31TnuH7HJysqTG-pm01NHOh0gASr65Hsk91lZsbQYeSQOS2C2A0ZrpdsiMdYEntkJG45CVUiT2piy3Cy5CW4GvZ1uoupo6A2489yysgeSgrRk5CLyJOnhcukAKssjm28UEyyXE7WuFa2GIFt28BOvmnBOLiKb7xqQglvCPMTuJrGbo2r4GHYTlHt7mSP',
    potType: 'Stoneware Pot',
    potSize: '10 inch',
    substrate: 'Succulent Gritty Mineral Blend',
    volumeWaterMl: 250,
    health: 'thriving',
    lastWatered: '11 days ago',
    notes: 'Underground rhizomes store copious water reserves. Highly drought tolerant.'
  },
  {
    id: 'bird-of-paradise',
    name: 'Bird of Paradise',
    scientificName: 'Strelitzia nicolai',
    room: 'Living Area',
    subLocation: 'South Patio Glass Door',
    lightExposure: 'Direct Sunlight • 1500+ FC',
    lightCategory: 'direct',
    fcRange: '1500+ FC',
    photoperiod: '8+ hrs/day • High Intensity',
    soilMoisture: 78,
    moistureStatus: 'Saturated',
    waterCadenceDays: 5,
    cadenceDescription: 'Water: Every 4-5 Days',
    feedSchedule: 'Feed: Heavy Bi-weekly',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpalOkgwccLoZceURtDYbXTOWGW4xWSb5LWGl_NgUoxO7Oa_USDkdlnF9OX0Ed7FDwuP9Tpita-my2bKot3klGkNhzbDUCzJnbouwMyP4fWRghNXAVvGeeQmDe5QbWfPNQUVFApcD34G78q4CqPwcHoqHeBXA2S7AgreflQIIT3_1WbGpQiEKX9wiAtH1reE5T3yayFARBvdKkJvmTbzmsfPToBRdKRkzqeO1n7Wmgep5FIcQLx3wG',
    potType: 'Fiber-Clay Floor Planter',
    potSize: '16 inch',
    substrate: 'Rich Organic Loam & Pumice',
    volumeWaterMl: 600,
    health: 'thriving',
    lastWatered: '1 day ago',
    notes: 'Large paddle leaves actively transpire. Loves direct sun and warm ambient humidity.'
  },
  {
    id: 'golden-pothos',
    name: 'Golden Pothos',
    scientificName: 'Epipremnum aureum',
    room: 'Conservatory',
    subLocation: 'Hanging Macramé Beam',
    lightExposure: 'Low-Medium • 380 FC',
    lightCategory: 'moderate',
    fcRange: '380 FC',
    photoperiod: '5-7 hrs/day • Ambient',
    soilMoisture: 39,
    moistureStatus: 'Sub-dry',
    waterCadenceDays: 6,
    cadenceDescription: 'Water: 5-7 Days',
    feedSchedule: 'Feed: Monthly Diluted',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY_Nsdg5s4iuL47MhpoNBFzgFeOc3x75aS47I1khHSkY-hdCl6Lj5rlC6LASnXZPqGdK2d9sYsPm26oRST0B09NBtLJ4II8jem4oxyMkM1pzlsDSw9WrJxl8RCKXKyIqj7ND7UWh9JPpjbLN0bTDruN7gFZbId9jdwJ37-gTQfc2KqScjQQqHHcmnNE46lJnfsj_x6pUrzzfcecYuqZmwrO4AfuVteaeUj9GV_WrboTPdf1nlxB9YG',
    potType: 'Self-watering hanging basket',
    potSize: '8 inch',
    substrate: 'Coco Coir, Worm Castings, Perlite',
    volumeWaterMl: 200,
    health: 'thriving',
    lastWatered: '5 days ago',
    notes: 'Vines reaching 6 feet. Propagate stem cuttings in water next month.'
  },
  {
    id: 'calathea-orbifolia',
    name: 'Calathea Orbifolia',
    scientificName: 'Goeppertia orbifolia',
    room: 'Bedside',
    subLocation: 'Bedside Sanctuary Nightstand',
    lightExposure: 'Filtered North Light • 320 FC',
    lightCategory: 'low',
    fcRange: '300-400 FC',
    photoperiod: '4-6 hrs/day • Gentle',
    soilMoisture: 52,
    moistureStatus: 'Moist',
    waterCadenceDays: 4,
    cadenceDescription: 'Water: Every 4 Days',
    feedSchedule: 'Feed: Low Salt Organic',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWaoEOwgI92_qZLuRjOTVMe-Scah-nQipbQb7zWNgUYUTfJ9z9l6YCpTF_QwAPMAniMveQKJAhWvAv2R1t0tVkd6YF2Btp7JhtZl4E274hCyh_7czHNkjTFovFm5HxxbchbDYzETI19BxTI8QZvCg701S9B-NdMVVjm0rrvAmQfG1RXFq8kfNhRa_7Yvn7kcunCwenllp7NdtnHy2vJ2bFJyGNMt-wN-dYqDUKnurCqj3GtDM30J6M',
    potType: 'Glazed Ceramic Saucer Pot',
    potSize: '8 inch',
    substrate: 'Peat-based moisture retentive mix with vermiculite',
    volumeWaterMl: 280,
    health: 'moderate',
    lastWatered: '3 days ago',
    notes: 'Sensitive to tap fluoride and dry air. Run ultrasonic humidifier nearby.'
  },
  {
    id: 'snake-plant-laurentii',
    name: 'Snake Plant (Laurentii)',
    scientificName: 'Dracaena trifasciata',
    room: 'Office',
    subLocation: 'Office Nook Bookcase',
    lightExposure: 'Diffused Ambient • 150 FC',
    lightCategory: 'low',
    fcRange: '150-250 FC',
    photoperiod: '3-5 hrs/day',
    soilMoisture: 42,
    moistureStatus: 'Adequate',
    waterCadenceDays: 21,
    cadenceDescription: 'Water: Every 3 Weeks',
    feedSchedule: 'Feed: Twice Yearly',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy6DHffnetcuc_EAs1tXwnK86bEMz0k8ndopZdWRQWZGar5VMAJ2HaVeH7Xf2tcV8KihgqHyW__nAPQI94puGda_IuvjAlfceJb90XOTi94iqfzB40fqd4-cDY4Tk0lH9Q6ZwXxEhEA3ROEdxEnLfbFn4U3i0PRirYqH20VRpa5wL-gKar76FUyyFwWbHud74ZStzCwMLTo2014zOvOZbatt_tbh79XCOcD1n0aWXrfStfONjhFVcP',
    potType: 'Cast Terracotta Planter',
    potSize: '10 inch',
    substrate: 'Coarse Sand & Pumice Aerated Mix',
    volumeWaterMl: 300,
    health: 'thriving',
    lastWatered: '15 days ago',
    notes: 'Substrate drying at nominal pace. Deep root reserve intact. Autonomous.'
  },
  {
    id: 'anthurium-clarinervium',
    name: 'Anthurium Clarinervium',
    scientificName: 'Anthurium clarinervium',
    room: 'Conservatory',
    subLocation: 'High Humidity Tier 2',
    lightExposure: 'Dappled Indirect • 600 FC',
    lightCategory: 'bright-indirect',
    fcRange: '500-700 FC',
    photoperiod: '6-8 hrs/day',
    soilMoisture: 58,
    moistureStatus: 'Moist',
    waterCadenceDays: 5,
    cadenceDescription: 'Water: Every 5-6 Days',
    feedSchedule: 'Feed: Bi-weekly Liquid Kelp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe9ELSkIjr_x5dyU9zfXGqY5eYeHOZ4aghmbUkXGcCTvEu5aJ6ChyC1zeLAz5LtmAgAwjiBiYBIdrR7p5K4OzbK1GCufsrz45QZoz4SnUP3MqUYg2PVfB2L4SOkMXMGYod8yWVgyb0kZjq62YPW86IQjXD20A3xJ0FknSsqxgRUUXpOaE6IKrQDBrv3_ZI6Le6Ldo6GUOuJkPAKmEPbWjve-wBAqTxCGVWnGVUVIDKep9j20H0b7e2',
    potType: 'Slotted Clear Aroid Pot in Planter',
    potSize: '7 inch',
    substrate: 'Chunk Bark, Tree Fern Fibre, Horticultural Charcoal',
    volumeWaterMl: 220,
    health: 'thriving',
    lastWatered: '2 days ago',
    notes: 'Velvety heart-shaped leaves with silver crystalline veins.'
  },
  {
    id: 'alocasia-zebrina',
    name: 'Alocasia Zebrina',
    scientificName: 'Alocasia zebrina',
    room: 'Sunroom',
    subLocation: 'East Light Shelf',
    lightExposure: 'Bright Indirect • 950 FC',
    lightCategory: 'bright-indirect',
    fcRange: '800-1100 FC',
    photoperiod: '7 hrs/day',
    soilMoisture: 48,
    moistureStatus: 'Adequate',
    waterCadenceDays: 7,
    cadenceDescription: 'Water: Every 7 Days',
    feedSchedule: 'Feed: High Calcium & Nitrogen',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIIOwE4tFcGVukJSAY82ezosJ7Xwo5uTP07ntqHiVgy2oPx7QvjfGRjnn5eqkIdG6GrrAX4ggLV5o6ZQwDtIbdKGDmkGTtiCI8U0y2AohhEqER0x09w0Y0Clnjo7Ewy_xz8vu34kU2fkJXKELk8GatNJZMCCwbF2iDwNB00Mwjjrjhna5uESPT3OEpNPHEiLu6qz9_J--8BEqNhavtKPMxWhhY5i63JN8NgxEV-S2rxvzEJlAWwwGo',
    potType: 'Handmade Glazed Planter',
    potSize: '9 inch',
    substrate: 'Aroid Mix with Dolomite Lime',
    volumeWaterMl: 350,
    health: 'thriving',
    lastWatered: '3 days ago',
    notes: 'Distinctive striped tiger-pattern stems. New leaf unfurling.'
  },
  {
    id: 'maranta-leuconeura',
    name: 'Red Prayer Plant',
    scientificName: 'Maranta leuconeura var. erythroneura',
    room: 'Bedside',
    subLocation: 'East Window Sill Shelf',
    lightExposure: 'Soft Morning Light • 400 FC',
    lightCategory: 'moderate',
    fcRange: '350-500 FC',
    photoperiod: '5 hrs/day',
    soilMoisture: 65,
    moistureStatus: 'Moist',
    waterCadenceDays: 5,
    cadenceDescription: 'Water: Every 4-5 Days',
    feedSchedule: 'Feed: Half Strength Monthly',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWaoEOwgI92_qZLuRjOTVMe-Scah-nQipbQb7zWNgUYUTfJ9z9l6YCpTF_QwAPMAniMveQKJAhWvAv2R1t0tVkd6YF2Btp7JhtZl4E274hCyh_7czHNkjTFovFm5HxxbchbDYzETI19BxTI8QZvCg701S9B-NdMVVjm0rrvAmQfG1RXFq8kfNhRa_7Yvn7kcunCwenllp7NdtnHy2vJ2bFJyGNMt-wN-dYqDUKnurCqj3GtDM30J6M',
    potType: 'Earthen Bowl Planter',
    potSize: '8 inch',
    substrate: 'Peat, Coconut Shell Chips, Perlite',
    volumeWaterMl: 180,
    health: 'thriving',
    lastWatered: '2 days ago',
    notes: 'Folds leaves upward rhythmically at twilight (nyctinasty).'
  }
];

export const INITIAL_TASKS: CareTask[] = [
  {
    id: 'task-monstera',
    plantId: 'monstera-deliciosa',
    plantName: 'Monstera Deliciosa',
    subLocation: 'Living Room • Zone 1',
    type: 'water',
    badgeLabel: 'Water & Mist',
    metricLabel: '18% Dry',
    description: 'Root zone parched. Hydrate thoroughly with 350ml filtered water and wipe foliage dust.',
    actionText: 'Mark Watered',
    statusText: 'Monstera 350ml logged',
    detailLabel: 'Moisture Index',
    detailValue: '18% (Critical)',
    progressValue: 18,
    completed: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe9ELSkIjr_x5dyU9zfXGqY5eYeHOZ4aghmbUkXGcCTvEu5aJ6ChyC1zeLAz5LtmAgAwjiBiYBIdrR7p5K4OzbK1GCufsrz45QZoz4SnUP3MqUYg2PVfB2L4SOkMXMGYod8yWVgyb0kZjq62YPW86IQjXD20A3xJ0FknSsqxgRUUXpOaE6IKrQDBrv3_ZI6Le6Ldo6GUOuJkPAKmEPbWjve-wBAqTxCGVWnGVUVIDKep9j20H0b7e2',
    severity: 'urgent'
  },
  {
    id: 'task-ficus',
    plantId: 'ficus-lyrata',
    plantName: 'Ficus Lyrata',
    subLocation: 'Sunroom • East Bay',
    type: 'fertilizer',
    badgeLabel: 'Fertilization',
    metricLabel: 'Bi-Weekly',
    description: 'Scheduled organic feed. Dilute N-P-K 3-1-2 nitrogen-forward elixir to foster budding top leaves.',
    actionText: 'Log Feeding',
    statusText: 'Fertilizer logged',
    detailLabel: 'Strength Ratio',
    detailValue: 'Half Strength (2.5ml/L)',
    progressValue: 50,
    completed: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIIOwE4tFcGVukJSAY82ezosJ7Xwo5uTP07ntqHiVgy2oPx7QvjfGRjnn5eqkIdG6GrrAX4ggLV5o6ZQwDtIbdKGDmkGTtiCI8U0y2AohhEqER0x09w0Y0Clnjo7Ewy_xz8vu34kU2fkJXKELk8GatNJZMCCwbF2iDwNB00Mwjjrjhna5uESPT3OEpNPHEiLu6qz9_J--8BEqNhavtKPMxWhhY5i63JN8NgxEV-S2rxvzEJlAWwwGo',
    severity: 'normal'
  },
  {
    id: 'task-calathea',
    plantId: 'calathea-orbifolia',
    plantName: 'Calathea Orbifolia',
    subLocation: 'Bedside Sanctuary',
    type: 'mist',
    badgeLabel: 'Mist & Humidify',
    metricLabel: '42% RH',
    description: 'Local ambient moisture dipped below 50%. Mist foliage and run ultrasonic diffuser for 45 minutes.',
    actionText: 'Completed',
    statusText: 'Misting complete',
    detailLabel: 'Local Target',
    detailValue: '42% / 65% RH',
    progressValue: 62,
    completed: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWaoEOwgI92_qZLuRjOTVMe-Scah-nQipbQb7zWNgUYUTfJ9z9l6YCpTF_QwAPMAniMveQKJAhWvAv2R1t0tVkd6YF2Btp7JhtZl4E274hCyh_7czHNkjTFovFm5HxxbchbDYzETI19BxTI8QZvCg701S9B-NdMVVjm0rrvAmQfG1RXFq8kfNhRa_7Yvn7kcunCwenllp7NdtnHy2vJ2bFJyGNMt-wN-dYqDUKnurCqj3GtDM30J6M',
    severity: 'warning'
  },
  {
    id: 'task-snake',
    plantId: 'snake-plant-laurentii',
    plantName: 'Snake Plant (Laurentii)',
    subLocation: 'Office Nook • Low Light',
    type: 'autonomous',
    badgeLabel: 'Autonomous',
    metricLabel: 'In 6 Days',
    description: 'Substrate drying at nominal pace. Deep root reserve intact. No intervention required until early next week.',
    actionText: 'Status Optimal',
    statusText: 'Status Optimal',
    detailLabel: 'Soil State',
    detailValue: 'Dry Moderate (42%)',
    progressValue: 42,
    completed: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy6DHffnetcuc_EAs1tXwnK86bEMz0k8ndopZdWRQWZGar5VMAJ2HaVeH7Xf2tcV8KihgqHyW__nAPQI94puGda_IuvjAlfceJb90XOTi94iqfzB40fqd4-cDY4Tk0lH9Q6ZwXxEhEA3ROEdxEnLfbFn4U3i0PRirYqH20VRpa5wL-gKar76FUyyFwWbHud74ZStzCwMLTo2014zOvOZbatt_tbh79XCOcD1n0aWXrfStfONjhFVcP',
    severity: 'optimal'
  }
];

export const MICRO_ZONES: MicroZone[] = [
  {
    id: 'zone-conservatory',
    name: 'Conservatory',
    tempC: 22.4,
    humidityRH: 64,
    lightFC: 920,
    uvIndex: 4.8,
    plantCount: 6,
    status: 'Optimal',
    sensorId: 'SEN-ALPHA-01',
    battery: 94
  },
  {
    id: 'zone-sunroom',
    name: 'Sunroom East Bay',
    tempC: 24.1,
    humidityRH: 58,
    lightFC: 1150,
    uvIndex: 6.2,
    plantCount: 6,
    status: 'Optimal',
    sensorId: 'SEN-ALPHA-02',
    battery: 88
  },
  {
    id: 'zone-living',
    name: 'Living Area & Patio',
    tempC: 21.8,
    humidityRH: 52,
    lightFC: 620,
    uvIndex: 3.1,
    plantCount: 5,
    status: 'Optimal',
    sensorId: 'SEN-ALPHA-03',
    battery: 91
  },
  {
    id: 'zone-bedside',
    name: 'Bedside Sanctuary',
    tempC: 20.6,
    humidityRH: 42,
    lightFC: 340,
    uvIndex: 1.2,
    plantCount: 4,
    status: 'Alert',
    sensorId: 'SEN-ALPHA-04',
    battery: 76
  },
  {
    id: 'zone-office',
    name: 'Office Nook',
    tempC: 21.2,
    humidityRH: 49,
    lightFC: 220,
    uvIndex: 0.8,
    plantCount: 3,
    status: 'Optimal',
    sensorId: 'SEN-ALPHA-05',
    battery: 83
  }
];

export const NUTRIENTS_INVENTORY: NutrientProduct[] = [
  {
    id: 'liquid-kelp',
    name: 'Liquid Kelp Seaweed',
    type: 'Organic Liquid',
    targetGroup: 'Aroids & Foliage (Monstera, Anthurium, Philodendron)',
    npkRatio: '0.5 - 0.2 - 2.0 + Micronutrients',
    dilutionRate: '4ml / 2L Ratio',
    frequency: 'Bi-Weekly Saturday',
    nextScheduledDate: 'Saturday, Apr 19',
    stockRemainingPercent: 72,
    description: 'Cold-pressed Ascophyllum nodosum rich in auxins, cytokinins, and trace ocean minerals to foster thick cell walls.'
  },
  {
    id: 'osmocote-plus',
    name: 'Osmocote Pellets',
    type: 'Controlled Release',
    targetGroup: 'Hardy Ferns, Hoyas & Sansevieria',
    npkRatio: '15 - 9 - 12 + Chelated Iron',
    dilutionRate: '1 Tbsp / 6" Pot',
    frequency: 'Every 6 Months',
    nextScheduledDate: 'In 14 Days',
    stockRemainingPercent: 88,
    description: 'Polymer-coated resin beads providing temperature-triggered continuous depot feeding for root stability.'
  },
  {
    id: 'cal-mag-spray',
    name: 'Cal-Mag & Silica Foliar',
    type: 'Foliar Spray',
    targetGroup: 'Ficus Lyrata & Strelitzia (Large Leaf Architecture)',
    npkRatio: '2 - 0 - 0 + 3.2% Ca + 1.2% Mg',
    dilutionRate: '2ml / 1L Mist',
    frequency: 'Monthly Mid-Cycle',
    nextScheduledDate: 'Apr 28',
    stockRemainingPercent: 45,
    description: 'Foliar supplement to prevent leaf curling, edge necrosis, and encourage turgid upright foliage.'
  },
  {
    id: 'myco-fungi',
    name: 'Root Shield Mycorrhizae',
    type: 'Microbial Inoculant',
    targetGroup: 'Newly Repotted & Sensitive Root Systems',
    npkRatio: 'Endo & Ectomycorrhizal Spores',
    dilutionRate: '1 tsp into root ball zone',
    frequency: 'Repotting Events',
    nextScheduledDate: 'As Needed',
    stockRemainingPercent: 60,
    description: 'Symbiotic fungal network that dramatically enhances root surface uptake for water and phosphorus.'
  }
];

export const INITIAL_CARE_LOG: CareLogItem[] = [
  {
    id: 'log-1',
    plantName: 'Bird of Paradise',
    action: 'Hydration',
    amount: '600ml filtered water',
    zone: 'Living Area',
    timestamp: 'Yesterday at 17:45',
    notes: 'Even basin soak. Checked drainage tray after 30 min.',
    operator: 'Elena Rostova'
  },
  {
    id: 'log-2',
    plantName: 'Ficus Lyrata',
    action: 'Foliage Mist',
    amount: 'Distilled fine mist',
    zone: 'Sunroom',
    timestamp: 'Yesterday at 09:15',
    notes: 'Wiped top 4 leaves with microfiber cloth. Removed dust deposits.',
    operator: 'Elena Rostova'
  },
  {
    id: 'log-3',
    plantName: 'Golden Pothos',
    action: 'Pruning',
    amount: '3 yellowed base leaves',
    zone: 'Conservatory',
    timestamp: 'Sep 10, 14:20',
    notes: 'Sterilized shears with 70% isopropanol. Vine growth robust.',
    operator: 'Elena Rostova'
  },
  {
    id: 'log-4',
    plantName: 'Monstera Deliciosa',
    action: 'Nutrient Feed',
    amount: '4ml Liquid Kelp in 2L',
    zone: 'Living Area',
    timestamp: 'Sep 06, 11:30',
    notes: 'Last bi-weekly cycle feed before drying stage.',
    operator: 'Elena Rostova'
  },
  {
    id: 'log-5',
    plantName: 'Conservatory Alpha Sensor',
    action: 'Sensor Calibration',
    amount: 'Offset: +0.2°C, 0% RH',
    zone: 'Conservatory',
    timestamp: 'Sep 04, 08:00',
    notes: 'Checked baseline against laboratory hygrometer.',
    operator: 'Elena Rostova'
  }
];

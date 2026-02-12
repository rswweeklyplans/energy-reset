
export interface DayData {
  sleep: number;
  energyAM: number;
  energyPM: number;
  digestion: number;
  habits: string[];
  notes: string;
  completed: boolean;
  timestamp?: string;
}

export type TrackerState = Record<number, DayData>;

export interface MealOption {
  title: string;
  items: string[];
  ingredients: string[];
  instructions: string[];
  optionalUpgrade: string;
}

export interface MealCategory {
  category: string;
  options: MealOption[];
}

export interface ShoppingCategory {
  title: string;
  items: string[];
}

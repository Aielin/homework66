export interface Meal {
  id: string;
  time: string;
  description: string;
  calories: number;
}

export interface NewMeal {
  time: string;
  description: string;
  calories: number;
}

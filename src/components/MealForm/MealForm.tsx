import React, { useState, useEffect } from 'react';
import { NewMeal, Meal } from '../../types';
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading.tsx';

interface MealFormProps {
  addMeal: (meal: NewMeal) => void;
  updateMeal?: (id: string, meal: NewMeal) => void;
  isAdding: boolean;
  isEditing?: boolean;
  initialMeal?: Meal;
}

const MealForm: React.FC<MealFormProps> = ({ addMeal, updateMeal, isAdding, isEditing = false, initialMeal }) => {
  const [newMeal, setNewMeal] = useState<NewMeal>({ time: '', description: '', calories: 0 });

  useEffect(() => {
    if (isEditing && initialMeal) {
      setNewMeal({
        time: initialMeal.time,
        description: initialMeal.description,
        calories: initialMeal.calories,
      });
    }
  }, [isEditing, initialMeal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'calories') {
      setNewMeal({ ...newMeal, [name]: Number(value) });
    } else {
      setNewMeal({ ...newMeal, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mealToAdd: NewMeal = { ...newMeal };
    mealToAdd.calories = Number(mealToAdd.calories);

    if (isEditing && initialMeal && updateMeal) {
      updateMeal(initialMeal.id, mealToAdd);
    } else {
      addMeal(mealToAdd);
    }

    setNewMeal({ time: '', description: '', calories: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="time" value={newMeal.time} onChange={handleChange}>
        <option value="">Select meal time</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Snack">Snack</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <input
        type="text"
        name="description"
        placeholder="Meal description"
        value={newMeal.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="calories"
        placeholder="Calories"
        value={newMeal.calories}
        onChange={handleChange}
      />
      <ButtonLoading isLoading={isAdding} text="Save" type="submit" />
    </form>
  );
};

export default MealForm;

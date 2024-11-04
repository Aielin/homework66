import { useEffect, useState } from 'react';
import MealForm from '../../components/MealForm/MealForm';
import { Meal, NewMeal } from '../../types';
import axiosApi from '../../axiosAPI';

const MealsContainer = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingMeal, setEditingMeal] = useState<Meal | undefined>(undefined);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get('/meals.json');
      const fetchedMeals = response.data
        ? Object.keys(response.data).map((key) => ({ id: key, ...response.data[key] }))
        : [];
      setMeals(fetchedMeals);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const addMeal = async (meal: NewMeal) => {
    setIsAdding(true);
    try {
      const response = await axiosApi.post('/meals.json', meal);
      const newMealWithId = { ...meal, id: response.data.name };
      setMeals([...meals, newMealWithId]);
    } catch (error) {
      console.error('Error adding meal:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const updateMeal = async (id: string, updatedMeal: NewMeal) => {
    setIsAdding(true);
    try {
      await axiosApi.put(`/meals/${id}.json`, updatedMeal);
      setMeals(meals.map(meal => (meal.id === id ? { id, ...updatedMeal } : meal)));
      setEditingMeal(undefined);
    } catch (error) {
      console.error('Error updating meal:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const deleteMeal = async (id: string) => {
    setDeletingId(id);
    try {
      await axiosApi.delete(`/meals/${id}.json`);
      setMeals(meals.filter((meal) => meal.id !== id));
    } catch (error) {
      console.error('Error deleting meal:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0);

  return (
    <div className="container mt-5">
      <h1>Calorie Tracker</h1>
      <h2>Total calories: {totalCalories} kcal</h2>

      <MealForm
        addMeal={addMeal}
        updateMeal={updateMeal}
        isAdding={isAdding}
        isEditing={Boolean(editingMeal)}
        initialMeal={editingMeal}
      />

      {loading ? (
        <p>⏳ Loading meals...</p>
      ) : (
        <div>
          {meals.map((meal) => (
            <div key={meal.id}>
              <h3>{meal.time}</h3>
              <p>{meal.description}</p>
              <p>{meal.calories} kcal</p>
              <button
                disabled={deletingId === meal.id}
                onClick={() => deleteMeal(meal.id)}
              > {deletingId === meal.id ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setEditingMeal(meal)}
              >✏️ Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsContainer;

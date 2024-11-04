import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NewMeal } from '../../types';
import axiosApi from '../../axiosAPI';
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading';

const EditMeal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<NewMeal>({ time: '', description: '', calories: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchMeal = async () => {
    setIsLoading(true);
    try {
      const response = await axiosApi.get(`/meals/${id}.json`);
      setMeal(response.data);
    } catch (error) {
      console.error('Error fetching meal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      void fetchMeal();
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      console.error('Meal ID is missing');
      return;
    }

    setIsLoading(true);
    try {
      await axiosApi.put(`/meals/${id}.json`, meal);
      navigate('/');
    } catch (error) {
      console.error('Error updating meal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMeal((prevMeal) => ({ ...prevMeal, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h1>Edit Meal</h1>
      {isLoading ? (
        <p>⏳ Loading...</p>
      ) : (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Meal Time</label>
            <select
              name="time"
              value={meal.time}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select meal time</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Snack">Snack</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Meal Description</label>
            <input
              type="text"
              name="description"
              placeholder="Meal description"
              value={meal.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="calories" className="form-label">Calories</label>
            <input
              type="number"
              name="calories"
              placeholder="Calories"
              value={meal.calories}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <ButtonLoading isLoading={isLoading} text="Update" type="submit" />
        </form>
      )}
    </div>
  );
};

export default EditMeal;

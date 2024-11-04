import MealsContainer from './containers/MealsContainer/MealsContainer.tsx';
import { Route, Routes } from 'react-router-dom';
import EditMeal from './components/EditMeal/EditMeal.tsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MealsContainer />} />
        <Route path="/meals/:id/edit" element={<EditMeal />} />
      </Routes>
    </div>
  );
};

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddCocktail from './pages/AddCocktail';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import CocktailDetail from './pages/CocktailDetail';

function App() {
  return (
    <Router>
      <Navbar /> {/* бүх хуудасны дээр гарна */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocktail/:id" element={<CocktailDetail />} />
        <Route path="/add" element={<AddCocktail />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />  {/* шинэ маршрут */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add" element={
          <ProtectedRoute>
            <AddCocktail />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

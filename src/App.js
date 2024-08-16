import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './components/pages/HomePage/HomePage';
import OwnerPage from './components/pages/OwnerPage/OwnerPage';
import AdminPage from './components/pages/AdminPage/AdminPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="/administration" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

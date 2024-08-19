import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './components/pages/HomePage/HomePage';
import OwnerPage from './components/pages/OwnerPage/OwnerPage';
import AdminPage from './components/pages/AdminPage/AdminPage';
import UserAccLayout from './components/templates/UserAccLayout/UserAccLayout';
import AdminCFOLayout from './components/templates/AdminCFOLayout/AdminCFOLayout';
import AdminBudgetLayout from './components/templates/AdminBudgetLayout/AdminBudgetLayout';
import OwnerCFOLayout from './components/templates/OwnerCFOLayout/OwnerCFOLayout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/admin" element={<AdminPage />} >
          <Route path="personal" element={<UserAccLayout />} />
          <Route path="cfo" element={<AdminCFOLayout />} />
          <Route path="budget" element={<AdminBudgetLayout />} />
        </Route>

        <Route path="/owner" element={<OwnerPage />} >
          <Route path="personal" element={<UserAccLayout />} />
          <Route path="cfo" element={<OwnerCFOLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './components/pages/HomePage/HomePage';
import OwnerPage from './components/pages/OwnerPage/OwnerPage';
import AdminPage from './components/pages/AdminPage/AdminPage';
import TransactionPage from './components/pages/TransactionPage/TransactionPage';
import CreateCFOPage from './components/pages/CreateCFOPage/CreateCFOPage';
import AdminCFOPage from './components/pages/AdminCFOPage/AdminCFOPage';

import UserAccLayout from './components/templates/UserAccLayout/UserAccLayout';
import AdminCFOLayout from './components/templates/AdminCFOLayout/AdminCFOLayout';
import AdminBudgetLayout from './components/templates/AdminBudgetLayout/AdminBudgetLayout';
import OwnerCFOLayout from './components/templates/OwnerCFOLayout/OwnerCFOLayout';
import TransactionLayout from './components/templates/OperationsLayouts/TransactionLayout';
import ReplenishCFOLayout from './components/templates/OperationsLayouts/ReplenishCFOLayout';
import TransferCFOLayout from './components/templates/OperationsLayouts/TransferCFOLayout';

import ResultTransactionUnit from './components/organisms/ResultTransactionUnit/ResultTransactionUnit';
import ChangeOwnerUnit from './components/organisms/ChangeOwnerUnit/ChangeOwnerUnit';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h2>Авторизация</h2>} />



        /*----- user page -----*/
        <Route path="/user" element={<HomePage />} />



        /*========== ADMIN PAGES ==========*/
        <Route path="/admin" element={<AdminPage />} >
          <Route path="" element={<UserAccLayout />} />
          <Route path="cfo" element={<AdminCFOLayout />} />
          <Route path="budget" element={<AdminBudgetLayout />} />
        </Route>

        /*----- admin cfo pages -----*/
        <Route path="/admin/create-cfo" element={<CreateCFOPage />} />
        <Route path='/admin/cfo/:cfo_id' element={<TransactionPage />}>
          <Route path='' element={<AdminCFOPage />} />
          <Route path="replenish-cfo" element={<ReplenishCFOLayout />} />      /* master-to-cfo transaction */
          <Route path="transfer-cfo" element={<TransferCFOLayout />} />        /* cfo-to-user/cfo transaction */
          <Route path="change-owner" element={<ChangeOwnerUnit />}/>    /* change cfo owner */
          <Route path="result" />                                              /* transactions result */
        </Route>



        /*========== CFO OWNER PAGES ==========*/
        <Route path="/owner" element={<OwnerPage />} >
          <Route path="" element={<UserAccLayout />} />
          <Route path="cfo" element={<OwnerCFOLayout />} />
        </Route>



        /*----- USER-TO-USER transactions -----*/
        <Route path="/transaction/:user" element={<TransactionPage />} >
          <Route path="" element={<TransactionLayout />} />
          <Route path="result" element={<ResultTransactionUnit />} />
        </Route>


        /*----- error URL page -----*/
        <Route path='*' exact={true} element={<h2>Такой страницы не существует :(</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

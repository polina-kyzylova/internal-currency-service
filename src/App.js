import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import HomePage from './components/pages/HomePage/HomePage'
import OwnerPage from './components/pages/OwnerPage/OwnerPage'
import AdminPage from './components/pages/AdminPage/AdminPage'
import TransactionPage from './components/pages/TransactionPage/TransactionPage'
import CreateCFOPage from './components/pages/CreateCFOPage/CreateCFOPage'
import AdminCFOPage from './components/pages/AdminCFOPage/AdminCFOPage'
import AuthPage from './components/pages/AuthPage/AuthPage'

import UserAccLayout from './components/templates/UserAccLayout/UserAccLayout'
import AdminCFOListLayout from './components/templates/AdminCFOListLayout/AdminCFOListLayout'
import AdminBudgetLayout from './components/templates/AdminBudgetLayout/AdminBudgetLayout'
import OwnerCFOLayout from './components/templates/OwnerCFOLayout/OwnerCFOLayout'
import TransactionLayout from './components/templates/OperationsLayouts/TransactionLayout'
import ReplenishCFOLayout from './components/templates/OperationsLayouts/ReplenishCFOLayout'
import TransferCFOLayout from './components/templates/OperationsLayouts/TransferCFOLayout'
import TransferMasterLayout from './components/templates/OperationsLayouts/TransferMasterLayout'
import LoginLayout from './components/templates/AuthLayouts/LoginLayout'
import RegistrationLayout from './components/templates/AuthLayouts/RegistrationLayout'

import ResultTransactionUnit from './components/organisms/ResultTransactionUnit/ResultTransactionUnit'
import ChangeOwnerUnit from './components/organisms/ChangeOwnerUnit/ChangeOwnerUnit'
import OperationResult from './components/molecules/OperationResult/OperationResult'

import PrivateRoute from './hooks/PrivateRoute'
import { useSelector } from 'react-redux'
import OperationsHistoryPage from './components/pages/OperationsHistoryPage/OperationsHistoryPage'
import { DemoLayout } from './components/templates/AuthLayouts/DemoLayout'
import { RoleTypes } from './store/globalVariables'

function App() {
	//const token = localStorage.getItem('accessToken')
	const token = 'DEMO_TOKEN'
	const user = useSelector((state) => state.user)

	return (
		<BrowserRouter>
			<Routes>
				{/*========== ONBOARD PAGES ==========*/}

				<Route path='/' element={<AuthPage />}>
					{/*<Route path='' element={<LoginLayout />} />*/}
					{/*<Route path='registration' element={<RegistrationLayout />} />*/}

					<Route path='' element={<DemoLayout />} />
				</Route>

				{/*========== USER PAGES ==========*/}
				<Route
					path='/user'
					element={
						<PrivateRoute isAllowed={!!token && !!user && user.user_type === RoleTypes.User}>
							<HomePage />
						</PrivateRoute>
					}
				/>

				{/*========== ADMIN PAGES ==========*/}
				<Route
					path='/admin'
					element={
						<PrivateRoute isAllowed={!!token && !!user && user.user_type === RoleTypes.Admin}>
							<AdminPage />
						</PrivateRoute>
					}
				>
					<Route path='' element={<UserAccLayout />} />
					<Route path='cfo' element={<AdminCFOListLayout />} />
					<Route path='budget' element={<AdminBudgetLayout />} />
				</Route>

				{/*----- admin cfo pages -----*/}
				<Route
					path='/admin/create-cfo'
					element={
						<PrivateRoute isAllowed={!!token && !!user && user.user_type === RoleTypes.Admin}>
							<TransactionPage />
						</PrivateRoute>
					}
				>
					<Route path='' element={<CreateCFOPage />} />
					<Route path='result/:status' element={<OperationResult />} />
				</Route>

				<Route
					path='/admin/cfo/:cfo_id'
					element={
						<PrivateRoute isAllowed={!!token && !!user && user.user_type === RoleTypes.Admin}>
							<TransactionPage />
						</PrivateRoute>
					}
				>
					<Route path='' element={<AdminCFOPage />} />
					<Route path='replenish-cfo' element={<ReplenishCFOLayout />} />{' '}
					{/* master-to-cfo transaction */}
					<Route path='transfer-cfo' element={<TransferCFOLayout current_user='admin' />} />{' '}
					{/* cfo-to-user/cfo transaction */}
					<Route path='change-owner' element={<ChangeOwnerUnit />} /> {/* change cfo owner */}
					<Route path='result/:status' element={<OperationResult />} /> {/* transactions result */}
				</Route>

				{/*----- admin budget page -----*/}
				<Route
					path='/admin/transfer-master'
					element={
						<PrivateRoute isAllowed={!!token && !!user && user.user_type === RoleTypes.Admin}>
							<TransactionPage />
						</PrivateRoute>
					}
				>
					{' '}
					{/* master-to-user/cfo transaction */}
					<Route path='' element={<TransferMasterLayout />} />
					<Route path='result/:status' element={<OperationResult />} />
				</Route>

				{/*========== CFO OWNER PAGES ==========*/}
				<Route
					path='/owner'
					element={
						<PrivateRoute isAllowed={!!token && !!user && user.user_type === RoleTypes.Owner}>
							<OwnerPage />
						</PrivateRoute>
					}
				>
					<Route path='' element={<UserAccLayout />} />
					<Route path='cfo' element={<OwnerCFOLayout />} />
				</Route>

				{/*----- owner cfo manage page -----*/}
				<Route
					path='/owner/transfer-cfo'
					element={
						<PrivateRoute isAllowed={!!token && !!user && user.user_type === RoleTypes.Owner}>
							<TransactionPage />
						</PrivateRoute>
					}
				>
					{' '}
					{/* cfo-to-user/cfo transaction */}
					<Route path='' element={<TransferCFOLayout current_user='owner' />} />
					<Route path='result/:status' element={<OperationResult />} />
				</Route>

				{/*----- USER-TO-USER transactions -----*/}
				<Route
					path='/transaction/:user'
					element={
						<PrivateRoute isAllowed={!!token && !!user}>
							<TransactionPage />
						</PrivateRoute>
					}
				>
					<Route path='' element={<TransactionLayout />} />
					<Route path='result/:status' element={<ResultTransactionUnit />} />
				</Route>

				<Route
					path='/history/:user'
					element={
						<PrivateRoute isAllowed={!!token && !!user}>
							<OperationsHistoryPage />
						</PrivateRoute>
					}
				/>

				{/*----- error URL page -----*/}
				<Route path='*' exact={true} element={<h2>Такой страницы не существует :(</h2>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App

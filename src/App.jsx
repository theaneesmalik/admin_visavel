/** @format */
import { Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from './pages/auth'
import {
  ProfilePage,
  DashboardPage,
  PageNotFound,
  JobsPage,
  SupportPage,
  EditProfilePage,
  AgentsPage,
  ShowAgent,
  UsersPage,
  ShowUser,
  AdminPage,
  ShowAdmin,
  ShowJobPage,
} from './pages'
import Protected from './context/Protected'

import Layout from './components/Layout'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<Protected />}>
          <Route element={<Layout />}>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/jobs' element={<JobsPage />} />
            <Route path='/jobs/show' element={<ShowJobPage />} />
            <Route path='/agents' element={<AgentsPage />} />
            <Route path='/agents/show' element={<ShowAgent />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/users/show' element={<ShowUser />} />
            <Route path='/admins' element={<AdminPage />} />
            <Route path='/admins/show' element={<ShowAdmin />} />
            <Route path='/support' element={<SupportPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/profile/edit' element={<EditProfilePage />} />
          </Route>
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App

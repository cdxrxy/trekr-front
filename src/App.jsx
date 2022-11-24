import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'

import AppToast from './components/AppToast'
import AuthVerify from './components/AuthVerify'
import ProtectedRoute from './components/ProtectedRoute'

import './scss/style.scss'
import { selectAuth } from './components/selectors/authSelector'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const ConfirmationPage = React.lazy(() => import('./components/pages/ConfirmationPage'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const ExternalBookingForm = React.lazy(() => import('./components/pages/ExternalBookingForm'))

const App = () => {
  const auth = useSelector(selectAuth)

  return (
    <HashRouter>
      <AppToast />

      <Suspense fallback={loading}>
        <Routes>
          <Route path="/confirmation-page/:status" element={<ConfirmationPage />} />

          <Route
            exact
            path="/external-form/:formId"
            element={
              <ProtectedRoute isAllowed={true} isFetchUser={false}>
                <ExternalBookingForm />
              </ProtectedRoute>
            }
          />
          <Route path="/*" name="Home" element={<DefaultLayout />} />
          <Route
            exact
            path="/login"
            name="Login Page"
            element={
              <ProtectedRoute isFetchUser={false} isAllowed={!auth}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={
              <ProtectedRoute isFetchUser={false} isAllowed={!auth}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="/404" name="Page 404" element={<Page404 />} />
        </Routes>
        <AuthVerify />
      </Suspense>
    </HashRouter>
  )
}

export default App

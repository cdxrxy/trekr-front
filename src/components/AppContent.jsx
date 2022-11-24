import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'

// routes config
import routes from '../routes'
import ProtectedRoute from './ProtectedRoute'
import { selectAuth } from './selectors/authSelector'

const AppContent = () => {
  const auth = useSelector(selectAuth)
  return (
    <div className="layout">
      <Suspense fallback={<Spin />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  name={route.name}
                  exact={route.exact}
                  element={
                    <ProtectedRoute
                      isAllowed={route?.role ? route?.role === auth?.role : !!auth}
                      isFetchUser={true}
                      redirectPath="/login"
                    >
                      <route.element />
                    </ProtectedRoute>
                  }
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="calendar" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)

import { ExportOutlined } from '@ant-design/icons'
import { Button, PageHeader, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import routes from '../routes'
import { logout } from './reducers/authReducer'

const AppHeader = () => {
  const dispatch = useDispatch()
  const [appRoutes, setAppRoutes] = useState([])
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    if (location !== '/dashboard') {
      breadcrumbs.push({
        path: '/dashboard',
        breadcrumbName: 'Dashboard',
      })
    }

    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          path: currentPathname,
          breadcrumbName: routeName,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  useEffect(() => {
    const breadcrumbs = getBreadcrumbs(currentLocation)
    setAppRoutes(breadcrumbs)
  }, [currentLocation])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <PageHeader
      style={{ backgroundColor: '#fff' }}
      title="Automated Dispatcher"
      extra={[
        <Tooltip key="exit" title="Logout" placement="left">
          <Button onClick={handleLogout} icon={<ExportOutlined />} />
        </Tooltip>,
      ]}
      breadcrumb={{ routes: appRoutes }}
    />
  )
}

export default AppHeader

import {
  CalendarFilled,
  CarFilled,
  NotificationFilled,
  ScheduleFilled,
  SettingFilled,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import React from 'react'

// Pages
const Calendar = React.lazy(() => import('./components/pages/BookingCalendar'))
const Employees = React.lazy(() => import('./components/pages/Employees'))
const Vehicles = React.lazy(() => import('./components/pages/Vehicles'))
const Settings = React.lazy(() => import('./components/pages/Settings'))
const Notifications = React.lazy(() => import('./components/pages/Notifications'))
const BookingForm = React.lazy(() => import('./components/pages/BookingForm'))
const Users = React.lazy(() => import('./components/pages/Users'))

const routes = [
  { path: '/calendar', name: 'Calendar', element: Calendar, icon: <CalendarFilled /> },
  {
    path: '/booking-form',
    name: 'Booking Form',
    element: BookingForm,
    exact: true,
    icon: <ScheduleFilled />,
  },
  { path: '/employees', name: 'Employees', element: Employees, icon: <UsergroupAddOutlined /> },
  { path: '/vehicles', name: 'Vehicles', element: Vehicles, icon: <CarFilled /> },
  { path: '/settings', name: 'Settings', element: Settings, icon: <SettingFilled /> },
  {
    path: '/notifications',
    name: 'Notifications',
    element: Notifications,
    icon: <NotificationFilled />,
  },
  {
    path: '/users',
    name: 'Users',
    element: Users,
    exact: true,
    role: 'tech',
    icon: <UserOutlined />,
  },
]

export default routes

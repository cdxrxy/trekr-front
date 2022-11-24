import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { logout } from '../reducers/authReducer'
import { Dropdown, Menu, Space } from 'antd'
import { CloseCircleFilled, DownOutlined } from '@ant-design/icons'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()

  const handleMenuClick = ({ key }) => {
    if (key === '4') {
      handleLogout()
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const menu = useMemo(
    () => (
      <Menu
        onClick={handleMenuClick}
        items={[
          {
            key: '1',
            label: 'Profile',
          },
          {
            key: '4',
            danger: true,
            label: 'Exit',
            icon: <CloseCircleFilled />,
          },
        ]}
      />
    ),
    [],
  )

  return (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
        <Space align="center">
          <span>Info</span>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default AppHeaderDropdown

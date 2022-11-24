import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectAuth } from './selectors/authSelector'
import routes from '../routes'
const { Sider } = Layout

const AppSidebar = ({ collapsed, setCollapsed }) => {
  const auth = useSelector(selectAuth)
  let navigate = useNavigate()

  const menuOnClick = (e) => {
    navigate(e.key)
  }
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="sider-logo">
        {!collapsed ? (
          <img src="/sidebar-logo.png" alt="image" />
        ) : (
          <img src="/sidebar-logo-small.png" alt="image" />
        )}
      </div>

      <Menu
        onClick={menuOnClick}
        theme="dark"
        mode="inline"
        items={routes.map((item) =>
          !!item?.role ? (
            item?.role === auth?.role ? (
              {
                label: item.name,
                key: item.path,
                icon: item.icon,
              }
            ) : (
              <></>
            )
          ) : (
            {
              label: item.name,
              key: item.path,
              icon: item.icon,
            }
          ),
        )}
      />
    </Sider>
  )
}

AppSidebar.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
}

export default React.memo(AppSidebar)

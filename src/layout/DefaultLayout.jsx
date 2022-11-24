import { Layout } from 'antd'
import React, { useState } from 'react'
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../components/index'
const { Content } = Layout

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout hasSider>
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout style={{ marginLeft: !collapsed ? 200 : 80, minHeight: '100vh' }}>
        <AppHeader />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <AppContent />
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  )
}

export default DefaultLayout

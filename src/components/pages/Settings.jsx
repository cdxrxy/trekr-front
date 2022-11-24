import { Col, Row } from 'antd'
import React from 'react'

import CalendarSettingsCard from '../organisms/CalendarSettingsCard'
import CalendarSettingsTable from '../organisms/CalendarSettingsTable'
import NotificationSettingsCard from '../organisms/NotificationSettingsCard'

const Settings = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <CalendarSettingsTable />
        </Col>
        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <CalendarSettingsCard />
            </Col>
            <Col xs={24}>
              <NotificationSettingsCard />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Settings

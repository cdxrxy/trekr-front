import React from 'react'
import { Card, Empty } from 'antd'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { selectNotificationsList } from '../selectors/notificationsSelector'

const dateFormat = 'YYYY-MM-DD HH:mm'

const NotificationBox = styled(Card)`
  ${({ isSeen }) => !isSeen && `background-color: #f5f5f5;`}
  ${({ isSeen }) => isSeen && `background-color: #fff;`}
  ${({ isSeen }) => !isSeen && `border: 1px solid #d9d9d9;`}
  ${({ isSeen }) => !isSeen && `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);`}
  margin-bottom: 10px;
  border: 1px solid #d9d9d9;
`

const Notifications = () => {
  const notifications = useSelector(selectNotificationsList) || []

  return (
    <>
      <Card title="Notifications dashboard">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationBox key={notification._id} isSeen={notification.isSeen}>
              {notification.eventStatus} {notification.eventType}
              <p>Received at: {moment(notification.creationDate).format(dateFormat)}</p>
            </NotificationBox>
          ))
        ) : (
          <Empty description="No notifications" />
        )}
      </Card>
    </>
  )
}

export default Notifications

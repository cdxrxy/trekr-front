import { Button, Card, Checkbox, Skeleton, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addSettings } from '../reducers/settingsComposeReducer'
import { selectSettings } from '../selectors/settingsSelector'

const NotificationSettingsCard = () => {
  const dispatch = useDispatch()
  let { isLoading, data } = useSelector(selectSettings)

  const [form, setform] = useState({
    autoRequestConfirm: false,
    autoEmailResponder: false,
    autoEmployeeEmailing: false,
  })

  useEffect(() => {
    if (data) {
      setform({
        autoRequestConfirm: data?.autoRequestConfirm,
        autoEmailResponder: data?.autoEmailResponder,
        autoEmployeeEmailing: data?.autoEmployeeEmailing,
      })
    }
  }, [data])

  const formDataChange = (value, key) => {
    setform((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = () => {
    dispatch(addSettings(form)).then(() => {
      window.location.reload()
    })
  }

  return (
    <Card title={'Notifications'}>
      {isLoading ? (
        <Skeleton active={isLoading} paragraph={{ rows: 1 }} />
      ) : (
        <Space direction="vertical">
          <Checkbox
            onChange={(event) => formDataChange(event.target.checked, 'autoRequestConfirm')}
            checked={form?.autoRequestConfirm}
          >
            Auto Request Confirm
          </Checkbox>
          <Checkbox
            onChange={(event) => formDataChange(event.target.checked, 'autoEmailResponder')}
            checked={form?.autoEmailResponder}
          >
            Auto Email Responder
          </Checkbox>
          <Checkbox
            onChange={(event) => formDataChange(event.target.checked, 'autoEmployeeEmailing')}
            checked={form?.autoEmployeeEmailing}
          >
            Auto Employee Emailing
          </Checkbox>
          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Space>
      )}
    </Card>
  )
}

export default NotificationSettingsCard

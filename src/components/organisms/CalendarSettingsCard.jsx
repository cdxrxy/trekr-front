import styled from 'styled-components'
import { Button, Card, Form, Select, Spin, TimePicker } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addSettings } from '../reducers/settingsComposeReducer'
import { selectSettingsData, selectSettingsLoading } from '../selectors/settingsSelector'

const { Option } = Select

const StyledSelect = styled(Select)`
  width: 123px !important;
`
const format = 'h:mm a'

const CalendarSettingsCard = () => {
  const dispatch = useDispatch()
  const calendarSettings = useSelector(selectSettingsData)
  const isCalendarSettingsLoading = useSelector(selectSettingsLoading)
  const [form, setForm] = useState({})

  const handleSettingsSave = async () => {
    let payload = {
      secondShiftStart: moment(form.secondShiftStart).format('HH:mm'),
      secondShiftEnd: moment(form.secondShiftEnd).format('HH:mm'),
      timeGap: form.timeGap,
    }
    dispatch(addSettings(payload)).then((res) => {
      window.location.reload()
    })
  }

  useEffect(() => {
    !isCalendarSettingsLoading &&
      setForm({
        secondShiftStart: moment(calendarSettings?.secondShiftStart, format),
        secondShiftEnd: moment(calendarSettings?.secondShiftEnd, format),
        timeGap: calendarSettings?.timeGap,
      })
  }, [calendarSettings, isCalendarSettingsLoading])

  return (
    <Card title={'Booking Calendar'}>
      {isCalendarSettingsLoading ? (
        <Spin />
      ) : (
        <Form layout="vertical">
          <Form.Item noStyle>
            <Form.Item label="Second shift start time:">
              <TimePicker
                use12Hours
                format="h:mm a"
                onChange={(value) =>
                  setForm((prev) => {
                    return { ...prev, secondShiftStart: value }
                  })
                }
                value={form.secondShiftStart}
              />
            </Form.Item>
            <Form.Item label="Second shift end time:">
              <TimePicker
                use12Hours
                format="h:mm a"
                onChange={(value) =>
                  setForm((prev) => {
                    return { ...prev, secondShiftEnd: value }
                  })
                }
                value={form.secondShiftEnd}
              />
            </Form.Item>
            <Form.Item label="Time gap in minutes">
              <StyledSelect
                defaultValue={'10'}
                onChange={(value) =>
                  setForm((prev) => {
                    return { ...prev, timeGap: value }
                  })
                }
                value={form.timeGap}
              >
                <Option value="10">10</Option>
                <Option value="15">15</Option>
                <Option value="30">30</Option>
                <Option value="60">60</Option>
              </StyledSelect>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleSettingsSave}>
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  )
}

export default CalendarSettingsCard

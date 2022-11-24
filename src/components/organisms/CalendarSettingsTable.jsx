import { Card, Spin, TimePicker } from 'antd'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { EditFilled, CheckCircleOutlined } from '@ant-design/icons'
import moment from 'moment'

import { selectSettings } from '../selectors/settingsSelector'
import { addSettings } from '../reducers/settingsComposeReducer'

const format = 'h:mm a'

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: 50px;
  align-items: center;
  margin-bottom: 0.5px solid grey;
`

const CalendarSettingsTable = () => {
  const dispatch = useDispatch()
  let { isLoading, data } = useSelector(selectSettings)

  const handleWeekdayChange = ({ day, startTime, endTime }) => {
    const updatedWeekdayHours = data?.weekdayHours.map((weekday) =>
      weekday.day === day ? { ...weekday, startTime, endTime } : weekday,
    )

    let payload = {
      weekdayHours: updatedWeekdayHours,
    }
    dispatch(addSettings(payload)).then((res) => {
      window.location.reload()
    })
  }

  return (
    <Card title={'Work Hours Table'}>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <StyledTable>
            <h1>Weekday</h1>
            <h1>Start Time</h1>
            <h1>End Time</h1>
          </StyledTable>
          {data?.weekdayHours.map((weekday) => (
            <Weekday key={weekday._id} weekday={weekday} onSave={handleWeekdayChange} />
          ))}
        </>
      )}
    </Card>
  )
}

export default CalendarSettingsTable

const Weekday = ({ weekday, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [startTime, setStartTime] = useState(moment(weekday.startTime, format))
  const [endTime, setEndTime] = useState(moment(weekday.endTime, format))

  const handleEdit = () => setIsEditing(true)

  const handleSave = () => {
    onSave({
      day: weekday.day,
      startTime: moment(startTime).format('HH:mm'),
      endTime: moment(endTime).format('HH:mm'),
    })
    setIsEditing(false)
  }

  return isEditing ? (
    <StyledTable>
      <h1>{weekday.day}</h1>
      <TimePicker
        use12Hours
        format="h:mm a"
        onChange={(value) => {
          setStartTime(value)
        }}
        value={startTime}
      />
      <TimePicker
        use12Hours
        format="h:mm a"
        onChange={(value) => {
          setEndTime(value)
        }}
        value={endTime}
      />
      <CheckCircleOutlined onClick={handleSave} />
    </StyledTable>
  ) : (
    <StyledTable>
      <h1>{weekday.day}</h1>
      <h1>{weekday.startTime}</h1>
      <h1>{weekday.endTime}</h1>
      <EditFilled onClick={handleEdit} />
    </StyledTable>
  )
}

Weekday.propTypes = {
  weekday: PropTypes.object,
  onSave: PropTypes.func,
}

import React, { useEffect, useState } from 'react'
import { Badge, Calendar, Card } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import { useSelector } from 'react-redux'

import AddEstimate from '../organisms/AddEstimate'
import DailyStatusDetails from '../organisms/DailyStatusDetails'
import { useQuery } from '../hooks'
import ViewEstimate from '../organisms/ViewEstimate'
import { selectAllBookings } from '../selectors/bookingSelector'

const StyledMainContainer = styled.div`
  display: grid;
  grid-template-columns: 600px auto;
  grid-gap: 20px;
`

const StyledEventsUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const StatusInfoBox = styled.div`
  padding-top: 10px;
  display: flex;
  gap: 8px;
`

const BookingCalendar = () => {
  let query = useQuery()
  const allBookings = useSelector(selectAllBookings)

  const [calendarValue, setCalendarValue] = useState(moment())
  const [selectedDate, setSelectedDate] = useState(moment())
  const [id, setId] = useState(query.get('id'))
  const [view, setView] = useState(query.get('view'))

  const getEventCount = (selectedDayBookings = [], eventType) => {
    return selectedDayBookings.filter((booking) => booking.eventType === eventType).length
  }

  function getListData(value) {
    let listData = []
    const dateValue = value.format('yyyy-MM-DD')
    const selectedDayBookings = allBookings[dateValue]

    const requestCount = getEventCount(selectedDayBookings, 'Request')
    const estimateCount = getEventCount(selectedDayBookings, 'Estimate')
    const bookingCount = getEventCount(selectedDayBookings, 'Booking')

    if (requestCount > 0) {
      listData = [...listData, { type: 'warning', content: `${requestCount}` }]
    }
    if (estimateCount > 0) {
      listData = [...listData, { type: 'processing', content: `${estimateCount}` }]
    }
    if (bookingCount > 0) {
      listData = [...listData, { type: 'success', content: `${bookingCount}` }]
    }

    return listData || []
  }

  const dateCellRender = (value) => {
    const listData = getListData(value)
    return (
      <StyledEventsUl className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </StyledEventsUl>
    )
  }

  const onSelect = (newValue) => {
    setCalendarValue(newValue)
    setSelectedDate(newValue)
  }

  const onPanelChange = (newValue) => {
    setCalendarValue(newValue)
  }

  useEffect(() => {
    setId(query.get('id'))
    setView(query.get('view'))
  }, [query])

  return (
    <>
      <StyledMainContainer>
        <Card title="Synced Calendar">
          <Calendar
            value={calendarValue}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
            dateCellRender={dateCellRender}
          />
          {id && <AddEstimate visible={id} />}
          {view && <ViewEstimate visible={view} />}
          <StatusInfoBox>
            <Badge status="warning" text="Requests" />
            <Badge status="processing" text="Estimates" />
            <Badge status="success" text="Bookings" />
          </StatusInfoBox>
        </Card>
        <Card title="Date information">
          <div className="">
            <DailyStatusDetails selectedDate={selectedDate.format('YYYY-MM-DD')} />
          </div>
        </Card>
      </StyledMainContainer>
    </>
  )
}

export default BookingCalendar

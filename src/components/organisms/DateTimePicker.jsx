import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment/moment'
import PropTypes from 'prop-types'

//@TO-DO: Remove this shit with proper weekday handling
const weekdayHoursEnum = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const DateTimePicker = ({ bookings, weekdayHours, onChange }) => {
  const getDisabledHours = (date) => {
    if (!date) {
      return
    }
    const selectedDate = new Date(date)
    const weekDay = selectedDate.getDay()
    const selectedDay = selectedDate.getDate()
    const selectedMonth = selectedDate.getMonth() + 1
    const selectedYear = selectedDate.getFullYear()

    const selectedDayBookings = bookings[`${selectedYear}-${selectedMonth}-${selectedDay}`]

    for (let i = 0; i < weekdayHours.length; i++) {
      if (weekdayHours[i].day === weekdayHoursEnum[weekDay]) {
        const disabledHours = []
        const startHour = parseInt(weekdayHours[i].startTime.split(':')[0])
        const endHour = parseInt(weekdayHours[i].endTime.split(':')[0])

        for (let j = 0; j < 24; j++) {
          if (j < startHour || j > endHour) {
            disabledHours.push(j)
          }
        }

        if (selectedDayBookings) {
          selectedDayBookings.forEach((booking) => {
            const startHour = parseInt(booking.startTime.split(':')[0])
            const endHour = parseInt(booking.endTime.split(':')[0])
            for (let k = startHour; k <= endHour; k++) {
              disabledHours.push(k)
            }
          })
        }
        return disabledHours
      }
    }
  }

  function getDisabledMinutes(date) {
    var minutes = []
    for (let i = 0; i < 60; i++) {
      if (i % 15 !== 0) {
        minutes.push(i)
      }
    }
    return minutes
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }

  const disabledRangeTime = (date) => {
    return {
      disabledHours: () => getDisabledHours(date),
      disabledMinutes: () => getDisabledMinutes(date),
    }
  }

  return (
    <DatePicker
      disabledDate={disabledDate}
      disabledTime={disabledRangeTime}
      format="YYYY-MM-DD HH:mm"
      showTime={{ defaultValue: moment('09:00', 'HH:mm') }}
      showNow={false}
      hideDisabledOptions
      onChange={onChange}
    />
  )
}

DateTimePicker.propTypes = {
  bookings: PropTypes.array,
  weekdayHours: PropTypes.array,
}

export default DateTimePicker

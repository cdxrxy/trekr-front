import PropTypes from 'prop-types'
import React from 'react'
import { CarFilled } from '@ant-design/icons'

const DailyStatus = ({ dailyBookingStatus }) => {
  return <CarFilled className="text-blue-400" />
}

DailyStatus.propTypes = {
  dailyBookingStatus: PropTypes.object,
}

export default DailyStatus

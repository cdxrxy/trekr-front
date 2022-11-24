import { Button, Spin } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Loader from '../atoms/Loader'
import { fetchBookingsForDate } from '../reducers/bookingsReducer'
import { selectBookingsForDate } from '../selectors/bookingSelector'

const DailyStatusDetails = ({ selectedDate }) => {
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector(selectBookingsForDate)

  useEffect(() => {
    dispatch(fetchBookingsForDate(selectedDate))
  }, [dispatch, selectedDate])

  if (isLoading) {
    return <Spin />
  }

  return (
    <>
      <div>
        <h3>{selectedDate}</h3>
        {data?.length <= 0 ? (
          <div>No reservation for this day</div>
        ) : (
          <>
            {data?.filter((x) => x.eventType === 'Request' && x.eventStatus === 'Pending').length >
              0 && <div className="text-lg font-bold">Estimates</div>}
            {data
              ?.filter((x) => x.eventType === 'Request' && x.eventStatus === 'Pending')
              .map((item, index) => (
                <div
                  key={index}
                  className="shadow-md p-2 rounded-md bg-white flex space-x-2 items-end mb-2"
                >
                  <div className="w-full">
                    <div>Email: {item?.email}</div>
                    <div>Phone: {item?.phone}</div>
                    <div>Fullname: {item?.fullname}</div>
                    <div>Start time: {item?.startTime}</div>
                  </div>
                  <Link to={`/calendar?id=${item?._id}&date=${item?.date}`} className="ml-2">
                    <Button type="primary">Send Estimate</Button>
                  </Link>
                </div>
              ))}
            {data?.filter((x) => x.eventType === 'Estimate').length > 0 && (
              <div className="text-lg font-bold">Estimated</div>
            )}
            {data
              ?.filter((x) => x.eventType === 'Estimate')
              .map((item, index) => (
                <div
                  key={index}
                  className="shadow-md p-2 rounded-md bg-white flex space-x-2 items-end mb-2"
                >
                  <div className="w-full">
                    <div>Email: {item?.email}</div>
                    <div>Phone: {item?.phone}</div>
                    <div>Fullname: {item?.fullname}</div>
                    <div>Start time: {item?.startTime}</div>
                  </div>
                  <Link to={`/calendar?view=${item?._id}&date=${item?.date}`} className="ml-2">
                    <Button type="primary">View Estimate</Button>
                  </Link>
                </div>
              ))}
            {data?.filter((x) => x.eventType === 'Booking' && x.eventStatus === 'Confirmed')
              .length > 0 && <div className="text-lg font-bold">Confirmed</div>}
            {data
              ?.filter((x) => x.eventType === 'Booking' && x.eventStatus === 'Confirmed')
              .map((item, index) => (
                <div
                  key={index}
                  className="shadow-md p-2 rounded-md bg-white flex space-x-2 items-end mb-2"
                >
                  <div className="w-full">
                    <div>Email: {item?.email}</div>
                    <div>Phone: {item?.phone}</div>
                    <div>Fullname: {item?.fullname}</div>
                    <div>Start time: {item?.startTime}</div>
                  </div>
                  <Link to={`/calendar?view=${item?._id}&date=${item?.date}`} className="ml-2">
                    <Button type="primary">View Estimate</Button>
                  </Link>
                </div>
              ))}

            {data?.filter((x) => x.eventType === 'Request' && x.eventStatus === 'Rejected').length >
              0 && <div className="text-lg font-bold">Rejected</div>}
            {data
              ?.filter((x) => x.eventType === 'Request' && x.eventStatus === 'Rejected')
              .map((item, index) => (
                <div
                  key={index}
                  className="shadow-md p-2 rounded-md bg-white flex space-x-2 items-end mb-2"
                >
                  <div className="w-full">
                    <div>Email: {item?.email}</div>
                    <div>Phone: {item?.phone}</div>
                    <div>Fullname: {item?.fullname}</div>
                    <div>Start time: {item?.startTime}</div>
                  </div>
                  <Link to={`/calendar?view=${item?._id}&date=${item?.date}`} className="ml-2">
                    <Button type="primary">View Estimate</Button>
                  </Link>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  )
}

DailyStatusDetails.propTypes = {
  selectedDate: PropTypes.string,
}

export default DailyStatusDetails

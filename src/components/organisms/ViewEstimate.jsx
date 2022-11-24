import { Form, Modal, Spin } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useQuery } from '../hooks'
import { fetchBookingByIdAndDate } from '../reducers/bookingsReducer'

const ViewEstimate = ({ visible }) => {
  let query = useQuery()
  const dispatch = useDispatch()
  const specificBooking = useSelector((state) => state.bookings.specificBooking)
  const isLoading = useSelector((state) => state.bookings.isLoading)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [id, setId] = useState(query.get('view'))
  const [date, setDate] = useState(query.get('date'))

  useEffect(() => {
    let tempId = query.get('view')
    let tempDate = query.get('date')

    setId(tempId)
    setDate(tempDate)
    if (tempId && tempDate) {
      dispatch(fetchBookingByIdAndDate({ id: tempId, date: tempDate }))
    }
  }, [dispatch, query])

  if (isLoading) {
    return (
      <Modal
        title={`View Estimate`}
        open={visible}
        onCancel={() => navigate('/calendar')}
        onOk={() => navigate('/calendar')}
      >
        <Spin />
      </Modal>
    )
  }

  return (
    <Modal
      title={`View Estimate`}
      open={visible}
      onCancel={() => navigate('/calendar')}
      onOk={() => navigate('/calendar')}
    >
      <div>Email: {specificBooking?.email}</div>
      <div>Phone: {specificBooking?.phone}</div>
      <div>Fullname: {specificBooking?.fullname}</div>
      <div>Start time: {specificBooking?.startTime}</div>
      {specificBooking?.properties?.map((item) => (
        <div key={item.label}>{`${item.label}: ${item.value}`}</div>
      ))}
      {specificBooking?.estimate &&
        Object?.entries(specificBooking?.estimate)?.map((item) => (
          <div key={item[0]}>{`${item[0]}: ${item[1]}`}</div>
        ))}
    </Modal>
  )
}

ViewEstimate.propTypes = {
  visible: PropTypes.string,
}

export default ViewEstimate

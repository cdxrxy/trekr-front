import { Form, Modal, Space, Spin, Select } from 'antd'
import moment from 'moment/moment'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Property from '../atoms/Property'
import { useQuery } from '../hooks'
import { addNewEstimate } from '../reducers/bookingComposeReducer'
import { fetchBookingByIdAndDate } from '../reducers/bookingsReducer'
import { fetchEmployees } from '../reducers/employeesReducer'
import { selectEmployeesForMultiselect } from '../selectors/employeeSelector'
import { selectVehiclesForMultiselect } from '../selectors/vehiclesSelector'

const AddEstimate = ({ visible }) => {
  let query = useQuery()
  const dispatch = useDispatch()
  const specificBooking = useSelector((state) => state.bookings.specificBooking)
  const isLoading = useSelector((state) => state.bookings.isLoading)
  const employees = useSelector(selectEmployeesForMultiselect)
  const vehicles = useSelector(selectVehiclesForMultiselect)

  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [id, setId] = useState(query.get('id'))
  const [date, setDate] = useState(query.get('date'))

  useEffect(() => {
    dispatch(fetchEmployees())

    let tempId = query.get('id')
    let tempDate = query.get('date')

    setId(tempId)
    setDate(tempDate)
    if (tempId && tempDate) {
      dispatch(fetchBookingByIdAndDate({ id: tempId, date: tempDate }))
    }
  }, [dispatch, query])

  const handleEmployeeSelect = (value) => {
    form.setFieldsValue({
      employees: value,
    })
  }

  const handleVehicleSelect = (value) => {
    form.setFieldsValue({
      vehicles: value,
    })
  }

  const handleSubmit = (values) => {
    const payload = {
      bookingEvent: {
        _id: specificBooking._id,
        date: specificBooking.date,
        startTime: moment(values.startTime).format('HH:mm'),
        email: specificBooking.email,
        fullname: specificBooking.fullname,
        phone: specificBooking.phone,
        properties: specificBooking?.properties,
        estimate: {
          ...values,
          endTime: moment(values.endTime).format('HH:mm'),
          employees: form.getFieldValue('employees'),
          vehicles: form.getFieldValue('vehicles'),
        },
      },
    }
    dispatch(addNewEstimate({ id, form: payload }))
    navigate('/calendar')
    window.location.reload()
  }

  return (
    <Modal
      title={`Estimate`}
      open={visible}
      onCancel={() => navigate('/calendar')}
      okButtonProps={{ form: 'add-estimate-form', htmlType: 'submit', loading: false }}
      okText="Save"
    >
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <div>Email: {specificBooking?.email}</div>
          <div>Phone: {specificBooking?.phone}</div>
          <div>Fullname: {specificBooking?.fullname}</div>
          <div>Start time: {specificBooking?.startTime}</div>
          {specificBooking?.properties?.map((item) => (
            <div key={item.label}>{`${item.label}: ${item.value}`} </div>
          ))}
          <Form layout="vertical" form={form} id="add-estimate-form" onFinish={handleSubmit}>
            <Form.Item noStyle>
              <Space wrap>
                <Property label={'Start Time'} required={true} type={'time'} />
                <Property label={'End Time'} required={true} type={'time'} />
                <Property label={'Hourly rate'} required={true} type={'number'} />
                <Property label={'Gas fee'} required={true} type={'number'} />
                <Property label={'Additional fee'} required={true} type={'number'} />
                <Property label={'Estimated Time'} required={true} type={'number'} />
                <Property label={'Total Cost'} required={true} type={'number'} />
              </Space>
            </Form.Item>
          </Form>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '50%' }}
            placeholder="Assign Employees"
            onChange={handleEmployeeSelect}
            options={employees}
          />
          <Select
            mode="multiple"
            allowClear
            style={{ width: '50%' }}
            placeholder="Assign Vehicles"
            onChange={handleVehicleSelect}
            options={vehicles}
          />
        </>
      )}
    </Modal>
  )
}

AddEstimate.propTypes = {
  visible: PropTypes.string,
}

export default AddEstimate

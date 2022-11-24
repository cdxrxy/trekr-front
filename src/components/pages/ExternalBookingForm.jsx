import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form, Card } from 'antd'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'

import Property from '../atoms/Property'
import { BASE_URL } from '../constants'
import { addToast } from '../reducers/toastComposeReducer'
import Loader from '../atoms/Loader'
import { inputTypes } from '../constants'
import DateTimePicker from '../organisms/DateTimePicker'

const ExternalBookingForm = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { formId } = useParams()
  const [form] = Form.useForm()
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [weekdayHours, setWeekdayHours] = useState([])
  const [bookings, setBookings] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedStartTime, setSelectedTime] = useState('')

  const handleDateTimeChange = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'))
    setSelectedTime(moment(date).format('HH:mm'))
  }

  const onFinish = async (values) => {
    setIsLoading(true)
    const payload = {
      properties: {
        ...values,
        startTime: selectedStartTime,
        date: selectedDate,
      },
      _id: formId,
    }

    const response = await axios.post(`${BASE_URL}/booking-forms/`, payload).then(
      (res) => {
        dispatch(
          addToast({
            title: 'Success',
            type: 'success',
            body: 'We will send confirmation mail',
          }),
        )
        setIsLoading(false)
      },
      (error) => {
        console.error(error)
        dispatch(
          addToast({
            title: 'Error',
            type: 'error',
            body: error.response.data.message,
          }),
        )
      },
    )
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/booking-forms/${formId}`).then((response) => {
      setIsLoading(false)
      setProperties(response.data.bookingForm.properties)
      setBookings(response.data.bookings)
      setWeekdayHours(response.data.weekdayHours)
    })
  }, [formId])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Card title="Form" className="max-w-sm w-full">
        <Form onFinish={onFinish} form={form} layout="vertical">
          {properties.map((item, index) => {
            if (item.propertyType === inputTypes.dateTime) {
              return (
                <>
                  Date & Time
                  <DateTimePicker
                    key={index}
                    bookings={bookings}
                    weekdayHours={weekdayHours}
                    onChange={handleDateTimeChange}
                  />
                </>
              )
            } else {
              return (
                <Property
                  key={index}
                  label={item.label}
                  required={item.required}
                  type={item.propertyType}
                />
              )
            }
          })}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ExternalBookingForm

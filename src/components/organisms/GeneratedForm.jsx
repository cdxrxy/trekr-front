import { Button, Card, Form } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Property from '../atoms/Property'
import { fetchBookingForm } from '../reducers/bookingFormsReducer'

const GeneratedForm = () => {
  const { formId } = useParams()
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector((state) => state.bookingForms)
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(fetchBookingForm(formId))
  }, [dispatch, formId])

  return (
    <>
      <Card loading={isLoading} title="Form">
        <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
          {data?.bookingForm?.properties?.map((item, index) => (
            <Property
              key={index}
              label={item.label}
              required={item.required}
              type={item.propertyType}
            />
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default GeneratedForm

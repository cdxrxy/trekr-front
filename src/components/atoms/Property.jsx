import { Checkbox, DatePicker, Form, Input, InputNumber, Select, TimePicker } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { useRef } from 'react'
import { EMAIL_MESSAGE, inputTypes, REQUIRED_MESSAGE } from '../constants'
import { camelize } from '../utils'

const Property = ({ label, type, required = false }) => {
  const name = useRef(camelize(label))

  switch (type) {
    case inputTypes.dateTime:
      return (
        <Form.Item
          name={name.current}
          label={label}
          rules={[{ required: required, message: REQUIRED_MESSAGE }]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
      )
    case inputTypes.time:
      return (
        <Form.Item
          name={name.current}
          label={label}
          rules={[{ required: required, message: REQUIRED_MESSAGE }]}
        >
          <TimePicker use12Hours format="h:mm a" />
        </Form.Item>
      )
    case inputTypes.text:
      return (
        <Form.Item
          name={name.current}
          label={label}
          rules={[{ required: required, message: REQUIRED_MESSAGE }]}
        >
          <Input />
        </Form.Item>
      )
    case inputTypes.phone:
      return (
        <Form.Item
          name={name.current}
          label={label}
          rules={[{ required: required, message: REQUIRED_MESSAGE }]}
        >
          <Input />
        </Form.Item>
      )
    case inputTypes.email:
      return (
        <Form.Item
          name={name.current}
          label={label}
          rules={[
            { required: required, message: REQUIRED_MESSAGE },
            { type: 'email', message: EMAIL_MESSAGE },
          ]}
        >
          <Input />
        </Form.Item>
      )
    case inputTypes.address:
      return (
        <Form.Item
          name={name.current}
          label={label}
          rules={[{ required: required, message: REQUIRED_MESSAGE }]}
        >
          <Input />
        </Form.Item>
      )
    case inputTypes.number:
      return (
        <Form.Item
          name={name.current}
          label={label}
          rules={[{ required: required, message: REQUIRED_MESSAGE }]}
        >
          <InputNumber min={0} type="number" />
        </Form.Item>
      )
    case inputTypes.select:
      return (
        <Form.Item
          name={name.current}
          label={label}
          rules={[{ required: required, message: REQUIRED_MESSAGE }]}
        >
          <Select />
        </Form.Item>
      )
    case inputTypes.checkbox:
      return (
        <Form.Item
          name={name.current}
          label={label}
          rules={[{ required: required, message: REQUIRED_MESSAGE }]}
          valuePropName="checked"
        >
          <Checkbox>{label}</Checkbox>
        </Form.Item>
      )
    default:
      return <Input type={type} label={label} required={required} />
  }
}

Property.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(Object.values(inputTypes)),
  required: PropTypes.bool,
}

export default Property

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Checkbox, Form, Input, Select, Space, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { MinusCircleOutlined, PlusOutlined, CopyOutlined } from '@ant-design/icons'
import { addToast } from '@/components/reducers/toastComposeReducer'
import styled from 'styled-components'

import { inputTypes, REQUIRED_MESSAGE } from '../constants'
import { createOrUpdateBookingForm } from '../reducers/bookingFormComposeReducer'
import { selectBookingFormId } from '../selectors/userSelector'
import { selectBookingForms } from '../selectors/bookingFormSelector'

const StyledTypeSelect = styled(Select)`
  width: 105px !important;
`

const { Option } = Select

const INITIAL_FORM_STATE = {
  label: '',
  propertyType: 'text',
  options: [],
  required: false,
  permanent: false,
}

const BookingForm = () => {
  const dispatch = useDispatch()
  const id = useSelector(selectBookingFormId)
  const bookingForm = useSelector(selectBookingForms)
  const [form] = Form.useForm()

  const onFinish = (values) => {
    const payload = {
      properties: [
        ...values.properties,
        ...bookingForm?.properties?.filter((item) => item?.permanent),
      ],
    }
    dispatch(createOrUpdateBookingForm(payload))
  }

  const handleCopyURL = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/#/external-form/${id}`)
    dispatch(addToast({ title: 'Success', type: 'success', body: 'Copied to clipboard' }))
  }

  return (
    <>
      <Card title="Booking form dashboard">
        <Form
          disabled
          initialValues={{
            properties: bookingForm?.properties?.filter((item) => item?.permanent),
          }}
        >
          <Form.List name="properties">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Form.Item key={key}>
                    <Space align="center" size={[16, 16]} wrap>
                      <Form.Item
                        {...restField}
                        name={[name, 'label']}
                        label="Label"
                        rules={[{ required: true, message: REQUIRED_MESSAGE }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'propertyType']}
                        label="Type"
                        rules={[{ required: true, message: REQUIRED_MESSAGE }]}
                      >
                        <Select>
                          {Object.values(inputTypes).map((inputType, index) => (
                            <Option value={inputType} key={`${index}-${inputType}`}>
                              {inputType}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'required']}
                        valuePropName="checked"
                        label="Required"
                      >
                        <Checkbox />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                ))}
              </>
            )}
          </Form.List>
        </Form>
        <Form
          onFinish={onFinish}
          form={form}
          initialValues={{
            properties: bookingForm?.properties?.filter((item) => !item?.permanent),
          }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.List name="properties">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Form.Item key={key}>
                    <Space align="center" size={[16, 16]} wrap>
                      <Form.Item
                        {...restField}
                        name={[name, 'label']}
                        label="Label"
                        rules={[{ required: true, message: REQUIRED_MESSAGE }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'propertyType']}
                        label="Type"
                        rules={[{ required: true, message: REQUIRED_MESSAGE }]}
                      >
                        <StyledTypeSelect>
                          {Object.values(inputTypes).map((inputType, index) => (
                            <Option value={inputType} key={`${index}-${inputType}`}>
                              {inputType}
                            </Option>
                          ))}
                        </StyledTypeSelect>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'required']}
                        valuePropName="checked"
                        label="Required"
                      >
                        <Checkbox />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add(INITIAL_FORM_STATE)}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="primary" onClick={() => handleCopyURL(id)}>
                Copy <CopyOutlined />
              </Button>
              <Link to={`/external-form/${id}`} target="_blank" rel="noopener noreferrer">
                <Button type="secondary">Preview</Button>
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default BookingForm

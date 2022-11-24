import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Card, Form, Input } from 'antd'

import { register } from '@/components/reducers/authReducer'
import { addToast } from '@/components/reducers/toastComposeReducer'
import { EMAIL_MESSAGE, REQUIRED_MESSAGE } from '@/components/constants'

const INITIAL_VALUES = {
  fullname: '',
  email: '',
  phone: '',
  password: '',
  passwordRepeat: '',
}

const Register = () => {
  let navigateTo = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = (values) => {
    if (values.password !== values.passwordRepeat) {
      dispatch(addToast({ title: 'Error', type: 'error', body: "Passwords doesn't match" }))
      return
    }
    dispatch(register(form.getFieldsValue())).then((response) => {
      if (response.payload === 'success') {
        form.resetFields()
        navigateTo('/login')
      }
    })
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-row justify-center items-center">
      <Card title="Register" className="w-full max-w-md">
        <Form
          name="basic"
          layout="vertical"
          form={form}
          initialValues={INITIAL_VALUES}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: REQUIRED_MESSAGE },
              { type: 'email', message: EMAIL_MESSAGE },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm password"
            name="passwordRepeat"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <div className="flex justify-center items-center">
            <Link to={'/login'}>
              <Button type="link">Already have an account?</Button>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Register

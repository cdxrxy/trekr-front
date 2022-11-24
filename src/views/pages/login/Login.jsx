import { Button, Card, Checkbox, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import React from 'react'

import { login } from '@/components/reducers/authReducer'
import { EMAIL_MESSAGE, REQUIRED_MESSAGE } from '@/components/constants'
import { Link } from 'react-router-dom'

const INITIAL_VALUES = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = (values) => dispatch(login(values))

  return (
    <div className="bg-gray-100 min-h-screen flex flex-row justify-center items-center">
      <Card title="Login" className="w-full max-w-md">
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
            label="Password"
            name="password"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <div className="flex justify-center items-center">
            <Link to={'/register'}>
              <Button type="link">Need an account?</Button>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Login

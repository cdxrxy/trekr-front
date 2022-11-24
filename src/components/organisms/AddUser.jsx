import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Modal, Select } from 'antd'

import { EMAIL_MESSAGE, REQUIRED_MESSAGE, userRoles } from '../constants'
import { addNewUser } from '../reducers/userComposeReducer'

const INITIAL_VALUES = {
  fullname: '',
  email: '',
  phone: '',
  role: userRoles.owner,
}

const AddUser = ({ visible, setVisible }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    dispatch(addNewUser(values)).then(() => {
      window.location.reload()
    })
  }

  return (
    <>
      <Modal
        title="New user form"
        open={visible}
        onCancel={() => setVisible(false)}
        okButtonProps={{ form: 'add-user-form', htmlType: 'submit' }}
        okText="Save"
      >
        <Form
          form={form}
          id="add-user-form"
          initialValues={INITIAL_VALUES}
          autoComplete="off"
          onFinish={handleSubmit}
        >
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
            label="Email"
            name="email"
            rules={[
              { required: true, message: REQUIRED_MESSAGE },
              { type: 'email', message: EMAIL_MESSAGE },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="User role" name="role">
            <Select>
              {Object.values(userRoles).map((role, index) => (
                <Select.Option key={index} value={role}>
                  {role.toUpperCase()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

AddUser.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}

export default AddUser

import { Form, Input, InputNumber, Modal, Select } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EMAIL_MESSAGE, employeeRoles, REQUIRED_MESSAGE } from '../constants'
import { updateEmployee } from '../reducers/employeeComposeReducer'
import { selectEmployeeComposeLoading } from '../selectors/employeeComposeSelector'

const EditEmployee = ({ employee, visible, setVisible }) => {
  const dispatch = useDispatch()
  let isLoading = useSelector(selectEmployeeComposeLoading)

  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    dispatch(updateEmployee({ ...values, _id: employee._id }))
    setVisible(false)
  }

  return (
    <>
      <Modal
        title="Edit employee form"
        open={visible}
        onCancel={() => setVisible(false)}
        okButtonProps={{ form: 'edit-employee-form', htmlType: 'submit', loading: isLoading }}
        okText="Save"
      >
        <Form form={form} id="edit-employee-form" initialValues={employee} onFinish={handleSubmit}>
          <Form.Item
            label="Employee name"
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

          <Form.Item label="Employee role" name="role">
            <Select>
              {Object.values(employeeRoles).map((role, index) => (
                <Select.Option key={index} value={role}>
                  {role.toUpperCase()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Hourly wage"
            name="rate"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

EditEmployee.propTypes = {
  employee: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}

export default EditEmployee

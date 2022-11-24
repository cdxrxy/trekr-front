import { Form, InputNumber, Modal } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { REQUIRED_MESSAGE } from '../constants'

import { updateVehicle } from '../reducers/vehiclesComposeReducer'
import { selectVehiclesComposeLoading } from '../selectors/vehiclesComposeSelector'

const EditVehicle = ({ vehicle, visible, setVisible }) => {
  const dispatch = useDispatch()
  let isLoading = useSelector(selectVehiclesComposeLoading)

  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    dispatch(updateVehicle({ ...values, _id: vehicle._id }))
    setVisible(false)
  }

  return (
    <>
      <Modal
        title="Edit vehicle form"
        open={visible}
        onCancel={() => setVisible(false)}
        okButtonProps={{ form: 'edit-vehicle-form', htmlType: 'submit', loading: isLoading }}
        okText="Save"
      >
        <Form
          form={form}
          id="edit-vehicle-form"
          initialValues={vehicle}
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Vehicle number"
            name="number"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Length in feet"
            name="length"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Height"
            name="height"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Max load"
            name="max_load"
            rules={[{ required: true, message: REQUIRED_MESSAGE }]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

EditVehicle.propTypes = {
  vehicle: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}

export default EditVehicle

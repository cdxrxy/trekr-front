import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addNewVehicle } from '../reducers/vehiclesComposeReducer'
import { selectVehiclesComposeLoading } from '../selectors/vehiclesComposeSelector'
import { Form, InputNumber, Modal } from 'antd'
import { REQUIRED_MESSAGE } from '../constants'

const INITIAL_VALUES = {
  number: '',
  capacity: '',
  length: '',
  height: '',
  max_load: '',
}

const AddVehicle = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  let isLoading = useSelector(selectVehiclesComposeLoading)
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    dispatch(addNewVehicle(values))
    setVisible(false)
  }

  return (
    <>
      <Modal
        title="New vehicle form"
        open={visible}
        onCancel={() => setVisible(false)}
        okButtonProps={{ form: 'add-vehicle-form', htmlType: 'submit', loading: isLoading }}
        okText="Save"
      >
        <Form
          layout="vertical"
          form={form}
          id="add-vehicle-form"
          initialValues={INITIAL_VALUES}
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

AddVehicle.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}

export default AddVehicle

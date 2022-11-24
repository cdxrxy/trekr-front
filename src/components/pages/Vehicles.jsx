import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Modal, Space, Table, Tooltip } from 'antd'

import AddVehicle from '../organisms/AddVehicle'
import EditVehicle from '../organisms/EditVehicle'
import { selectVehicles } from '../selectors/vehiclesSelector'
import { deleteVehicle } from '../reducers/vehiclesComposeReducer'

const Vehicles = () => {
  const [modal, contextHolder] = Modal.useModal()
  const dispatch = useDispatch()
  const { list } = useSelector(selectVehicles)
  const [vehicle, setVehicle] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleRemove = (id) => {
    dispatch(deleteVehicle({ _id: id }))
  }

  const columns = useMemo(
    () => [
      {
        key: 'number',
        title: 'Number',
        dataIndex: 'number',
      },
      {
        key: 'capacity',
        title: 'Capacity',
        dataIndex: 'capacity',
      },
      {
        key: 'length',
        title: 'Length',
        dataIndex: 'length',
      },
      {
        key: 'height',
        title: 'Height',
        dataIndex: 'height',
      },
      {
        key: 'max_load',
        title: 'Max load',
        dataIndex: 'max_load',
      },
      {
        key: 'actions',
        title: 'actions',
        dataIndex: 'actions',
        render: (text, record) => (
          <>
            <Space>
              <Tooltip title="Edit">
                <Button
                  onClick={() => {
                    setVehicle(record)
                    setIsEditModalOpen(true)
                  }}
                  shape="circle"
                  icon={<EditOutlined />}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  onClick={() =>
                    modal.confirm({
                      title: 'Attention! Confirm deletion',
                      onOk: () => handleRemove(record._id),
                    })
                  }
                  shape="circle"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Space>
          </>
        ),
      },
    ],
    [modal],
  )

  return (
    <>
      <Card
        title="Vehicles dashboard"
        actions={[
          <Tooltip title="Add Vehicle" key="Add Vehicle">
            <PlusOutlined onClick={() => setIsAddModalOpen((prev) => !prev)} />
          </Tooltip>,
        ]}
      >
        <Table columns={columns} dataSource={list} />
      </Card>
      <AddVehicle visible={isAddModalOpen} setVisible={setIsAddModalOpen} />
      {vehicle && (
        <EditVehicle vehicle={vehicle} visible={isEditModalOpen} setVisible={setIsEditModalOpen} />
      )}
      {contextHolder}
    </>
  )
}

export default Vehicles

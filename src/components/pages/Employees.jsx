import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Modal, Space, Table, Tooltip } from 'antd'

import AddEmployee from '../organisms/AddEmployee'
import EditEmployee from '../organisms/EditEmployee'
import { selectEmployees } from '../selectors/employeeSelector'
import { deleteEmployee } from '../reducers/employeeComposeReducer'

const Employees = () => {
  const [modal, contextHolder] = Modal.useModal()
  const dispatch = useDispatch()
  const { list } = useSelector(selectEmployees)
  const [employee, setEmployee] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleRemove = (id) => {
    dispatch(deleteEmployee({ _id: id }))
  }

  const columns = useMemo(
    () => [
      {
        key: 'fullname',
        title: 'Fullname',
        dataIndex: 'fullname',
      },
      {
        key: 'email',
        title: 'Email',
        dataIndex: 'email',
      },
      {
        key: 'phone',
        title: 'Phone',
        dataIndex: 'phone',
      },
      {
        key: 'role',
        title: 'Role',
        dataIndex: 'role',
      },
      {
        key: 'rate',
        title: 'Rate',
        dataIndex: 'rate',
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
                    setEmployee(record)
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
        title="Employees dashboard"
        actions={[
          <Tooltip title="Add Employee" key="Add Employee">
            <PlusOutlined onClick={() => setIsAddModalOpen((prev) => !prev)} />
          </Tooltip>,
        ]}
      >
        <Table columns={columns} dataSource={list} />
      </Card>
      <AddEmployee visible={isAddModalOpen} setVisible={setIsAddModalOpen} />
      {employee && (
        <EditEmployee
          employee={employee}
          visible={isEditModalOpen}
          setVisible={setIsEditModalOpen}
        />
      )}
      {contextHolder}
    </>
  )
}

export default Employees

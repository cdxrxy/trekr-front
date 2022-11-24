import React, { useState } from 'react'
import AddUser from '../organisms/AddUser'
import { Card, Tooltip } from 'antd'
import { EditFilled } from '@ant-design/icons'

const Users = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <>
      <Card
        title="Users administration dashboard"
        actions={[
          <Tooltip title="Add User" key="Add User">
            <EditFilled onClick={() => setIsAddModalOpen((prev) => !prev)} />
          </Tooltip>,
        ]}
      ></Card>
      <AddUser visible={isAddModalOpen} setVisible={setIsAddModalOpen} />
    </>
  )
}

export default Users

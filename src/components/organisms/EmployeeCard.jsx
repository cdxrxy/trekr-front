import { CTableDataCell, CTableRow } from '@coreui/react'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'

import EditEmployee from './EditEmployee'

const StyledRow = styled(CTableRow)`
  &:hover {
    cursor: pointer;
  }
`
// TODO: Can be deleted
const EmployeeCard = ({ employee }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEmployeeClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <StyledRow onClick={handleEmployeeClick}>
        <CTableDataCell>{employee.fullname}</CTableDataCell>
        <CTableDataCell>{employee.email}</CTableDataCell>
        <CTableDataCell>{employee.phone}</CTableDataCell>
        <CTableDataCell>{employee.role}</CTableDataCell>
        <CTableDataCell>{employee.rate}</CTableDataCell>
        <CTableDataCell>{employee.availability}</CTableDataCell>
      </StyledRow>
      <EditEmployee employee={employee} visible={isModalOpen} setVisible={setIsModalOpen} />
    </>
  )
}

EmployeeCard.propTypes = {
  employee: PropTypes.object,
}

export default EmployeeCard

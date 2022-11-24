import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CTableRow, CTableDataCell } from '@coreui/react'

import EditVehicle from './EditVehicle'

const StyledRow = styled(CTableRow)`
  &:hover {
    cursor: pointer;
  }
`
// TODO: Can be deleted
const VehicleCard = ({ vehicle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEmployeeClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <StyledRow onClick={handleEmployeeClick}>
        <CTableDataCell>{vehicle.number}</CTableDataCell>
        <CTableDataCell>{vehicle.capacity}</CTableDataCell>
        <CTableDataCell>{vehicle.length}</CTableDataCell>
        <CTableDataCell>{vehicle.height}</CTableDataCell>
        <CTableDataCell>{vehicle.max_load}</CTableDataCell>
      </StyledRow>
      <EditVehicle vehicle={vehicle} visible={isModalOpen} setVisible={setIsModalOpen} />
    </>
  )
}

VehicleCard.propTypes = {
  vehicle: PropTypes.object,
}

export default VehicleCard

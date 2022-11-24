import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CTableRow, CTableDataCell, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash } from '@coreui/icons'
import axios from 'axios'

import EditProperty from './EditProperty'
import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'

const StyledRow = styled(CTableRow)`
  &:hover {
    cursor: pointer;
  }
`

const PropertyCard = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  const handlePropertyDelete = () => {
    if (window.confirm('Do you approve the removal of this item?')) {
      axios
        .delete(`${BASE_URL}/properties/${property._id}`, { headers: authHeader() })
        .then((res) => {
          window.location.reload()
        })
    }
  }

  return (
    <>
      <StyledRow>
        <CTableDataCell>{property.label}</CTableDataCell>
        <CTableDataCell>{property.type}</CTableDataCell>
        <CTableDataCell>{property.required.toString()}</CTableDataCell>
        <CTableDataCell>
          <CButton color="danger" onClick={handlePropertyDelete}>
            <CIcon icon={cilTrash} />
          </CButton>
          <CButton color="info" onClick={handleCardClick}>
            <CIcon icon={cilPen} />
          </CButton>
        </CTableDataCell>
      </StyledRow>
      <EditProperty property={property} visible={isModalOpen} setVisible={setIsModalOpen} />
    </>
  )
}

PropertyCard.propTypes = {
  property: PropTypes.object,
}

export default PropertyCard

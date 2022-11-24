import React, { useState } from 'react'
import styled from 'styled-components'
import { CFormInput, CButton } from '@coreui/react'

import DraggableList from '../atoms/DraggableList'

const StyledBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

const StyledInput = styled(CFormInput)`
  width: 80%;
`

const StyledButton = styled(CButton)`
  width: 20%;
`

const DraggableAddress = () => {
  const [inputField, setInputField] = useState('')
  const [addressList, setAddressList] = useState([])

  const handleInputChange = (event) => {
    setInputField(event.target.value)
  }

  const handleAddAddress = () => {
    if (!inputField) return

    setAddressList((prev) => [...prev, { id: `id-${prev.length}`, content: inputField }])
    setInputField('')
  }

  const handleDeleteAddress = (id) => {
    setAddressList((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <>
      <StyledBox>
        <StyledInput
          type="text"
          size="lg"
          placeholder="Add stops by order"
          onChange={handleInputChange}
          value={inputField}
        />
        <StyledButton color="primary" onClick={handleAddAddress}>
          Add
        </StyledButton>
      </StyledBox>
      {addressList.length > 0 && (
        <DraggableList list={addressList} onDelete={handleDeleteAddress} />
      )}
    </>
  )
}

export default DraggableAddress

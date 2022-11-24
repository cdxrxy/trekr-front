import React, { useState } from 'react'
import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { inputTypes, spacing } from '../constants'
import { addNewProperty } from '../reducers/propertyComposeReducer'
import { selectPropertyComposeLoading } from '../selectors/propertyComposeSelector'

const StyledFormInput = styled(CFormInput)`
  margin-bottom: ${spacing.md};
`

const StyledFormSelect = styled(CFormSelect)`
  margin-bottom: ${spacing.md};
`

// @TO-DO: move handling of state of the component to a mini service
const INITIAL_VALUES = {
  label: '',
  type: inputTypes.text,
  required: true,
}

const AddProperty = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  let isLoading = useSelector(selectPropertyComposeLoading)

  const [form, setForm] = useState(INITIAL_VALUES)

  const handleSubmit = async () => {
    dispatch(addNewProperty(form)).then(() => {
      setVisible(false)
      window.location.reload()
    })
  }

  return (
    <>
      <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>New property form</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <StyledFormInput
              type="text"
              label="Label"
              required
              onChange={(event) => setForm((prev) => ({ ...prev, label: event.target.value }))}
              value={form.label}
            />
            <StyledFormSelect
              type="text"
              label="Type"
              required
              options={Object.values(inputTypes)}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, type: event.target.value.trim() }))
              }
              value={form.type}
            />
            <CFormCheck
              label="Required"
              defaultChecked
              onChange={(event) => setForm((prev) => ({ ...prev, required: !form.required }))}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" type="submit" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? (
              <CSpinner component="span" size="sm" aria-hidden="true" />
            ) : (
              `Save changes`
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

AddProperty.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}

export default AddProperty

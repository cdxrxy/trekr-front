import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

const { Footer } = Layout

const StyledFooter = styled(Footer)`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AppFooter = () => {
  return (
    <StyledFooter style={{ backgroundColor: '#fff' }}>
      <a
        href="https://eyesofdaveed.github.io/personal-portfolio"
        target="_blank"
        rel="noopener noreferrer"
      >
        eyesofdaveed
      </a>
      <span className="ms-1">&copy; {new Date().getFullYear()} autoDispatcher.</span>
    </StyledFooter>
  )
}

export default React.memo(AppFooter)

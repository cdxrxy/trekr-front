import { Result } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../atoms/Loader'

const ConfirmationPage = () => {
  const { status } = useParams()
  const [titleText, setTitleText] = useState('')
  const [displayStatus, setDisplayStatus] = useState('')

  useEffect(() => {
    switch (status) {
      case 'confirmed':
        setTitleText('Successfully Confirmed!')
        setDisplayStatus('success')
        break
      case 'rejected':
        setTitleText('Successfully Cancelled!')
        setDisplayStatus('error')
        break
      case 'expired':
        setTitleText('Link is expired!')
        setDisplayStatus('warning')
        break
      default:
        break
    }

    return () => {}
  }, [status])

  if (!status || !titleText || !displayStatus) {
    return <Loader />
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Result status={displayStatus} title={titleText} />
    </div>
  )
}

export default ConfirmationPage

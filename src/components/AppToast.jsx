import { notification } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetToasts } from './reducers/toastComposeReducer'
import { selectToasts } from './selectors/toastSelector'

const AppToast = () => {
  const dispatch = useDispatch()
  let toasts = useSelector(selectToasts)

  useEffect(() => {
    const toastMessage = ({ title, body, type }) =>
      notification[type]({
        message: title,
        description: body,
        onClose: () => dispatch(resetToasts()),
      })

    if (toasts.length > 0) {
      toasts.map((toastItem) => toastMessage(toastItem))
    }
  }, [toasts, toasts.length, dispatch])

  return
}

export default AppToast

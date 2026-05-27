import { useState, useEffect } from 'react'

export default function Notification({ type = 'success', message = '', duration = 4000, onClose = () => {} }) {
  const [isVisible, setIsVisible] = useState(!!message)

  useEffect(() => {
    if (message) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [message, duration, onClose])

  if (!isVisible) return null

  return (
    <div className={`notification-toast notification-${type}`}>
      <span className="notification-icon">{type === 'success' ? '✓' : type === 'warning' ? '⚠' : '✕'}</span>
      <span className="notification-message">{message}</span>
    </div>
  )
}

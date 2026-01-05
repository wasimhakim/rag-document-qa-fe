type ToastProps = {
  message: string
  onClose?: () => void
}

function Toast({ message, onClose }: ToastProps) {
  return (
    <div className="toast-host" role="status" aria-live="polite">
      <div className="toast">
        <span className="toast-message">{message}</span>
        {onClose ? (
          <button type="button" className="button-secondary" onClick={onClose}>
            Close
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Toast

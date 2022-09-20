const Notification = ({ notification }) => {
  return (
    <div className={`alert alert-${notification.type} mt-3`}>
      {notification.message}
    </div>
  )
}

export default Notification;
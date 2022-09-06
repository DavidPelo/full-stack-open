import React from 'react'

const History = ({ history }) => {
  if (history.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {history.join(' ')}
    </div>
  )
}

export default History
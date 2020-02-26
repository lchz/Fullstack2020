import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(({ notification }) => {
    return notification ? notification : null
  })

  return (
    <div>
      {notification &&
        <div style={style}>
          {notification}
        </div>}
    </div>
  )
}

export default Notification
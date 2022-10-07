import React, { useEffect, useRef } from 'react'

const Message = ({ from, content, isMine, last }) => {
  const ref = useRef()

  useEffect(() => {
    if (last) {
      console.log(ref)
      ref.current.scrollIntoView()
    }
  }, [last])

  return (
    <div className={`message ${isMine ? 'mine' : ''}`} ref={ref}>
      <div>
        <p>{from}</p>
        <span>{content}</span>
      </div>
    </div>
  )
}

export default Message

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import Message from './Message'

const Chat = ({ name }) => {
  const [value, setValue] = useState('')
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setSocket(io('https://websockets-konexio.herokuapp.com/'))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    const message = {
      from: name,
      content: value
    }

    setValue('')

    socket.emit('new message from frontend', message)
  }

  if (!socket) {
    return <p>loading</p>
  } else {
    socket.on('new message from backend', payload => {
      setMessages([...messages, payload])
    })
  }

  return (
    <>
      <section className='messages-container' id='chat-feed'>
        {messages.map((message, i) => {
          return (
            <Message
              content={message.content}
              from={message.from}
              isMine={message.from === name}
              last={messages.length - 1 === i}
            />
          )
        })}
      </section>
      <form onSubmit={handleSubmit}>
        <label htmlFor='chat' className='sr-only'>
          Your message
        </label>
        <div className='flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700'>
          <input
            id='chat'
            rows='1'
            className='block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Your message...'
            onChange={e => setValue(e.target.value)}
            value={value}
          ></input>
          <button
            type='submit'
            className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'
          >
            <svg
              aria-hidden='true'
              className='w-6 h-6 rotate-90'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
            </svg>
            <span className='sr-only'>Send message</span>
          </button>
        </div>
      </form>
    </>
  )
}

export default Chat

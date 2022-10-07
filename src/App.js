import { useState } from 'react'
import Chat from './components/Chat'
import NameForm from './components/NameForm'

import './App.css'

const App = () => {
  const [name, setName] = useState('')

  return (
    <main className='bg-gray-700'>
      {!name ? (
        <NameForm name={name} setName={setName} />
      ) : (
        <Chat name={name} />
      )}
    </main>
  )
}

export default App

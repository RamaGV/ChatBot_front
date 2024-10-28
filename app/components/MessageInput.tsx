import React, { useState } from 'react'

export default function MessageInput() {
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el mensaje
    console.log('Mensaje enviado:', message)
    setMessage('')
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-4 flex items-center">
      <input
        type="text"
        placeholder="Escribe un mensaje"
        className="flex-1 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className={`ml-2 bg-blue-500 text-white px-4 py-2 rounded-full ${
          !message ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
        disabled={!message}
      >
        Enviar
      </button>
    </form>
  )
}

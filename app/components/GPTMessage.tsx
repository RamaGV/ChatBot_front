import React, { useState, useEffect, useRef } from 'react'
import AIResponseDropdown from './AIResponseDropdownProps'
import { Contact, Message } from '@/types/interfaces'

interface ChatWithAIProps {
  contact: Contact
  onSendMessage: (message: string) => void
}

export default function GPTMessage({ contact, onSendMessage }: ChatWithAIProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState('')
    const [isGeneratingResponses, setIsGeneratingResponses] = useState(false)
    const [aiResponses, setAiResponses] = useState<string[]>([])
    const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contact) {
        if (contact.estado === 'pendiente') {
            setIsGeneratingResponses(true)
            // Simular la generación de respuestas de IA
            setTimeout(() => {
              setAiResponses([
                `¿Necesitas ayuda con algo relacionado a ${contact.localidad}?`,
                `¿Puedo asistirte con alguna información sobre ${contact.name}?`
              ])
              setIsGeneratingResponses(false)
            }, 2000)
          } else {
            setAiResponses([])
          }
    }
  }, [contact])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (text: string) => {
    setInputMessage('')
    onSendMessage(text)
  }
    useEffect(() => {
    // Fetch messages from API or some other data source
    const fetchedMessages = [...messages]; // Replace with actual data
    setMessages(fetchedMessages);
    }, [messages]);
  const handleAIResponseSelect = (response: string) => {
    handleSendMessage(response)
    setAiResponses([])
  }
  
  return (
    <div className="flex flex-col h-full bg-gray-100 ">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === 'gpt' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                message.senderId === 'user' ? 'bg-green-200' : 'bg-white'
              }`}
            >
              <p>{message.contenido as string}</p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <AIResponseDropdown
        isGenerating={isGeneratingResponses}
        responses={aiResponses}
        onSelect={handleAIResponseSelect}
      />

      <div className="bg-white p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && inputMessage.trim()) {
                handleSendMessage(inputMessage.trim())
              }
            }}
            className="flex-1 border rounded-full py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe un mensaje..."
          />
          <button
            onClick={() => inputMessage.trim() && handleSendMessage(inputMessage.trim())}
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
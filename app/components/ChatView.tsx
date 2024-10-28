import React, { useEffect, useRef } from 'react'
import { ChatViewProps, Contact } from '@/types/interfaces'
import TextMessage from './TextMessage'
import ImageMessage from './ImageMessage'
import AudioMessage from './AudioMessage'
import GPTMessage from './GPTMessage'

export default function ChatView({ messages }: ChatViewProps, contact: Contact ){
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll hacia el final cada vez que cambian los mensajes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5]">
      {
        messages.map(message => (
          message.tipo_mensaje === 'imagen' ? (
            <ImageMessage key={message.id} message={message} />
          ) : message.tipo_mensaje === 'audio' ? (
            <AudioMessage key={message.id} message={message} />
          ) : message.tipo_mensaje === 'generado' ? (
            <GPTMessage key={message.id} contact={contact} onSendMessage={(message: string) => console.log(message)}
            />
          ) : (
            <TextMessage key={message.id} message={message} />
          )
        ))
      }
    </div>
  )
}

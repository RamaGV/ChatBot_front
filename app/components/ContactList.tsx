import React from 'react'
import Image from 'next/image'
import { ContactListProps } from '@/types/interfaces'


export default function ContactList({ contacts, selectedContact, onSelectContact }: ContactListProps) {
  return (
    <div className="overflow-y-auto h-[calc(100vh-72px)]">
      {contacts.map(contact => (
        <div
          key={contact.id}
          className={`flex items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${selectedContact.id === contact.id ? 'bg-gray-200' : ''}`}
          onClick={() => onSelectContact(contact)}
        >
          <Image
            src={contact.avatar}
            alt={contact.name}
            width={30}
            height={30}
            className="rounded-full mr-3"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{contact.name}</h3>
            <p className="text-sm text-gray-600 truncate">{contact.last_message}</p>
          </div>
          <span className="text-xs text-gray-500">{contact.last_message_time}</span>
        </div>
      ))}
    </div>
  )
}

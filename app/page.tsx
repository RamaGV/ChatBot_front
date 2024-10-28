'use client'

import React, { useState, useEffect } from "react"
import { Search } from 'lucide-react'
import Image from 'next/image';

import ContactList from "./components/ContactList"
import ChatView from "./components/ChatView"

import { Contact } from '@/types/interfaces'

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Cargar contactos desde la API
    const loadContacts = async () => {
      try {
        const response = await fetch('http://localhost:8000/contacts');
        const data = await response.json();
        // Truncar los mensajes a 40 caracteres sin cortar palabras
        const updatedContacts = data.map((contact: Contact) => {
          if (contact.last_message.length > 40) {
            const truncatedMessage = contact.last_message.substring(0, 40);
            const lastSpaceIndex = truncatedMessage.lastIndexOf(' ');
            contact.last_message = lastSpaceIndex > 0 ? truncatedMessage.substring(0, lastSpaceIndex) + '...' : truncatedMessage + '...';
          }
          return contact;
        });
        setContacts(updatedContacts);
        if (updatedContacts.length > 0) {
          setSelectedContact(updatedContacts[0]);
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };
    loadContacts();
  }, []);
  
  useEffect(() => {
    // Cargar mensajes para el contacto seleccionado
    const loadMessages = async () => {
      if (!selectedContact) return;
      try {
        const response = await fetch(`http://localhost:8000/messages/${selectedContact.id}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    loadMessages();
  }, [selectedContact]);
  
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Panel de contactos */}
        <div className="w-1/3 bg-white border-r border-gray-300">
          <div className="p-4 bg-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar o empezar un nuevo chat"
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute top-2.5 left-3 text-gray-400" size={20} />
            </div>
          </div>
          {selectedContact && (
            <ContactList
              contacts={filteredContacts}
              selectedContact={selectedContact}
              onSelectContact={setSelectedContact}
            />
          )}
        </div>
        
        {/* Panel del chat con el contacto seleccionado */}
        <div className="flex-1 flex flex-col">
          {/* Encabezado del chat */}
          <div className="bg-gray-200 p-4 flex items-center border-b border-gray-300">
            {selectedContact && (
              <>
                <Image
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full mr-3"
                  width={40}
                  height={40}
                />
                
                <h2 className="font-semibold">
                  {selectedContact.name}
                  <span className="text-xs text-gray-500 ml-2">{selectedContact.estado}</span>
                </h2>
              </>
            )}
          </div>
            {selectedContact && (
              <ChatView messages={messages} contact={selectedContact} />
            )}
        </div>
      </div>
    </>
  );
}

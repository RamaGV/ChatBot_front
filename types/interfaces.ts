
export interface Contact {
    id: number
    name: string
    direccion: string
    avatar: string
    localidad: string
    destinatario: string
    last_message: string
    last_message_time: string
    numero_telefono: string
    estado: string
    prioridad: string
    etiquetaS: [string]
    memoria: string
  }
  
export interface ContactListProps {
    contacts: Contact[]
    selectedContact: Contact
    onSelectContact: (contact: Contact) => void
  }

  //---------------------------------//
  //        MENSAJES DE CHAT         //
  //---------------------------------//

  export interface ChatViewProps {
    messages: Message[]
    contact: Contact | null
  }
  
export interface Message {
    id: number
    senderId: number | string
    tipo_mensaje: string
    hora: string
    contenido: ImageMessageProps | AudioMessageProps | string
  }
  
export interface ImageMessageProps {
    url_img: string
    summary: string
  }
  
export interface AudioMessageProps {
    audio_path: string
    transcription: string
  }

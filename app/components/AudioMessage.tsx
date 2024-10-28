import { Message, AudioMessageProps } from '@/types/interfaces'

export default function AudioMessage({ message }: { message: Message }) {
    return (
      <div
        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
            message.senderId === 'me' ? 'bg-[#dcf8c6]' : 'bg-white'
          }`}
        >
          <p>{(message.contenido as AudioMessageProps).audio_path}</p>
          <p>{(message.contenido as AudioMessageProps).transcription}</p>
          <span className="text-xs text-gray-500 mt-1 block text-right">{message.hora}</span>
        </div>
      </div>
    )
  }
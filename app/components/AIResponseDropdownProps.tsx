import React from 'react'
import { Loader2 } from 'lucide-react'

interface AIResponseDropdownProps {
  isGenerating: boolean
  responses: string[]
  onSelect: (response: string) => void
}

export default function AIResponseDropdown({ isGenerating, responses, onSelect }: AIResponseDropdownProps) {
  if (!isGenerating && responses.length === 0) return null

  return (
    <div className="bg-gray-100 border-t border-gray-200 p-4 space-y-4">
      {isGenerating ? (
        <div className="flex items-center justify-center text-gray-500">
          <Loader2 className="animate-spin mr-2" />
          <span>Generando respuestas...</span>
        </div>
      ) : (
        responses.map((response, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow">
            <p className="mb-2">{response}</p>
            <button
              onClick={() => onSelect(response)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Seleccionar
            </button>
          </div>
        ))
      )}
    </div>
  )
}
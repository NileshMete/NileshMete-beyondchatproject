export interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  status?: "open" | "waiting" | "resolved"
  avatar?: string
}

export interface ChatMessage {
  id: string
  content: string
  isBot: boolean
  timestamp: string
  sources?: string[]
}

export interface ToneOption {
  id: string
  label: string
  description: string
}

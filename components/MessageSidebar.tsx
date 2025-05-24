"use client"

import type { Message } from "../types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MessageSidebarProps {
  messages: Message[]
  selectedMessage?: string
  onSelectMessage: (messageId: string) => void
}

export function MessageSidebar({ messages, selectedMessage, onSelectMessage }: MessageSidebarProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "open":
        return "bg-green-500"
      case "waiting":
        return "bg-yellow-500"
      case "resolved":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "waiting":
        return (
          <Badge variant="secondary" className="text-xs">
            Waiting
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900">Your inbox</h2>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <span>5 Open</span>
          <span>•</span>
          <span>Waiting longest</span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => onSelectMessage(message.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                selectedMessage === message.id
                  ? "bg-blue-50 border border-blue-200 shadow-sm"
                  : "hover:bg-gray-50 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs font-medium">{message.avatar}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(message.status)}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{message.sender}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getStatusBadge(message.status)}
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

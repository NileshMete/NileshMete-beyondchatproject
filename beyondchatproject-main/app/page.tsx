"use client"

import { useState } from "react"
import { MessageSidebar } from "../components/MessageSidebar"
import { ResponseEditor } from "../components/ResponseEditor"
import { ChatInterface } from "../components/ChatInterface"
import { demoMessages, toneOptions } from "../data/demoData"
import type { ChatMessage } from "../types"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function ChatbotTestingInterface() {
  const [selectedMessage, setSelectedMessage] = useState<string>("1")
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleEditResponse = (message: ChatMessage) => {
    setEditingMessage(message)
  }

  const handleSaveEdit = (messageId: string, newContent: string) => {
    console.log("Saving edited response:", { messageId, newContent })
    setEditingMessage(null)
  }

  const handleClearEdit = () => {
    setEditingMessage(null)
  }

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex h-full">
        {/* Left Sidebar */}
        <div
          className={`
            fixed lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out z-50
            w-80 h-full bg-white border-r border-gray-200 flex-shrink-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Mobile close button */}
          <div className="lg:hidden p-4 border-b border-gray-200 flex justify-end">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <MessageSidebar
            messages={demoMessages}
            selectedMessage={selectedMessage}
            onSelectMessage={setSelectedMessage}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row min-w-0 h-full">
          {/* Mobile Header */}
          <div className="lg:hidden p-4 bg-white border-b border-gray-200 flex-shrink-0">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 lg:w-1/2 xl:w-2/5 border-r border-gray-200 h-full overflow-hidden">
            <ResponseEditor
              editingMessage={editingMessage}
              toneOptions={toneOptions}
              onSaveEdit={handleSaveEdit}
              onClearEdit={handleClearEdit}
            />
          </div>

          <div className="flex-1 lg:w-1/2 xl:w-3/5 h-full overflow-hidden">
            <ChatInterface onEditResponse={handleEditResponse} />
          </div>
        </div>
      </div>
    </div>
  )
}

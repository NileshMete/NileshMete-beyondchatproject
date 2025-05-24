"use client"

import type React from "react"

import { useState } from "react"
import type { ChatMessage } from "../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Edit } from "lucide-react"

interface ChatInterfaceProps {
  onEditResponse: (message: ChatMessage) => void
}

export function ChatInterface({ onEditResponse }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content:
        "Namaste! I'm your AI Assistant. I can help you with questions about our services, policies, and technical support. How may I assist you today?",
      isBot: true,
      timestamp: new Date().toISOString(),
      sources: ["Knowledge Base", "Regional Guidelines"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("refund") || lowerMessage.includes("return")) {
      return "Namaste! I understand you're looking for information about refunds. As per our India-specific policy, we allow returns within 30 days of purchase with original packaging. Would you like me to help you start the refund process?"
    } else if (lowerMessage.includes("api") || lowerMessage.includes("integration")) {
      return "For API integration questions, I recommend checking our developer documentation. Our API supports REST endpoints with JSON responses and is optimized for Indian payment gateways like UPI, Paytm, and Razorpay. Do you need help with a specific integration?"
    } else if (lowerMessage.includes("pricing") || lowerMessage.includes("cost")) {
      return "Our pricing is flexible and designed for the Indian market. We offer starter plans from ₹999/month, professional at ₹2,999/month, and enterprise solutions. All prices include GST. Would you like detailed pricing information?"
    } else if (lowerMessage.includes("partnership") || lowerMessage.includes("collaborate")) {
      return "We're always excited about partnership opportunities in India! Our team works with fintech companies, banks, and startups across Mumbai, Delhi, Bangalore, and other major cities. Let me connect you with our partnerships team."
    } else {
      return "Thank you for reaching out! I'm here to assist you with any questions. Our support team is available 24/7 to help customers across India. Could you provide more details so I can give you the most accurate information?"
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date().toISOString(),
        sources: ["Knowledge Base", "Support Documentation", "Policy Database"],
      }

      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">AI Copilot</h3>
            <p className="text-sm text-gray-600">Ask me anything about this conversation</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.isBot ? "justify-start" : "justify-end"}`}>
              {message.isBot && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback>
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-[85%] sm:max-w-[80%] ${message.isBot ? "order-2" : "order-1"}`}>
                <div
                  className={`p-3 rounded-lg ${message.isBot ? "bg-gray-100 text-gray-900" : "bg-blue-600 text-white"}`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>

                {message.isBot && (
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditResponse(message)}
                      className="h-7 text-xs hover:bg-blue-50 transition-colors duration-200"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit Response
                    </Button>
                  </div>
                )}
              </div>

              {!message.isBot && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback>
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

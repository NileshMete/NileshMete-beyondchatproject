"use client"

import { useState } from "react"
import type { ChatMessage, ToneOption } from "../types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit3, ExternalLink, Palette, Wand2 } from "lucide-react"
import { dataSources } from "../data/demoData"

interface ResponseEditorProps {
  editingMessage: ChatMessage | null
  toneOptions: ToneOption[]
  onSaveEdit: (messageId: string, newContent: string) => void
  onClearEdit: () => void
}

export function ResponseEditor({ editingMessage, toneOptions, onSaveEdit, onClearEdit }: ResponseEditorProps) {
  const [editedContent, setEditedContent] = useState("")
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null)
  const [isAdjustingTone, setIsAdjustingTone] = useState(false)

  const handleSave = () => {
    if (editingMessage && editedContent.trim()) {
      onSaveEdit(editingMessage.id, editedContent)
      setEditedContent("")
    }
  }

  const handleToneChange = (tone: ToneOption) => {
    if (editingMessage) {
      setIsAdjustingTone(true)

      // Simulate tone adjustment with different responses based on tone
      let adjustedContent = ""

      switch (tone.id) {
        case "soft":
          adjustedContent = `I completely understand your concern, and I'm here to help you in the best way possible. ${editingMessage.content.replace(/^[^.]*\./, "").trim()}`
          break
        case "professional":
          adjustedContent = `Thank you for your inquiry. ${editingMessage.content.replace(/Namaste!|Hi there,|Hey there,/gi, "").trim()}`
          break
        case "friendly":
          adjustedContent = `Hi there! 😊 ${editingMessage.content.replace(/^[^.]*\./, "").trim()}`
          break
        case "concise":
          adjustedContent = editingMessage.content.split(".")[0] + ". Please let me know if you need more details."
          break
        case "detailed":
          adjustedContent = `${editingMessage.content} Additionally, I'd like to provide you with comprehensive information about this topic. Our team has extensive experience in handling such requests, and we follow industry best practices to ensure the best outcome for our customers.`
          break
        case "cultural":
          adjustedContent = `Namaste! ${editingMessage.content.replace(/^[^.]*\./, "").trim()} We respect and understand the cultural nuances important to our Indian customers.`
          break
        default:
          adjustedContent = editingMessage.content
      }

      setEditedContent(adjustedContent)

      // Reset the adjusting state after a short delay
      setTimeout(() => setIsAdjustingTone(false), 500)
    }
  }

  if (!editingMessage) {
    return (
      <div className="w-full h-full bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center text-gray-500 max-w-sm">
          <Edit3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No response selected for editing</h3>
          <p className="text-sm text-gray-400">
            Click "Edit Response" on a chatbot message to start editing and improving the response tone
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Response Editor</h2>
        <p className="text-sm text-gray-600">Edit and improve the chatbot response with tone adjustments</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              Original Response
              {isAdjustingTone && (
                <div className="flex items-center gap-1 text-blue-600">
                  <Wand2 className="w-3 h-3 animate-pulse" />
                  <span className="text-xs">Adjusting tone...</span>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="relative p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100"
              onMouseEnter={() => setHoveredMessage(editingMessage.id)}
              onMouseLeave={() => setHoveredMessage(null)}
            >
              <p className="text-sm text-gray-700 leading-relaxed">{editingMessage.content}</p>

              {/* Tone Adjustment Menu */}
              {hoveredMessage === editingMessage.id && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 bg-white shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <Palette className="w-3 h-3 mr-1" />
                        <span className="text-xs">Adjust Tone</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="p-2">
                        <p className="text-xs font-medium text-gray-500 mb-2">Choose a tone style:</p>
                        {toneOptions.map((tone) => (
                          <DropdownMenuItem
                            key={tone.id}
                            onClick={() => handleToneChange(tone)}
                            className="cursor-pointer p-3 rounded-md hover:bg-blue-50"
                          >
                            <div className="w-full">
                              <div className="font-medium text-sm">{tone.label}</div>
                              <div className="text-xs text-gray-500 mt-1">{tone.description}</div>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            {/* Data Sources */}
            {editingMessage.sources && editingMessage.sources.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Data Sources:</p>
                <div className="flex flex-wrap gap-2">
                  {editingMessage.sources.map((sourceName, index) => {
                    const source = dataSources.find((s) => s.name === sourceName)
                    return (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        <a
                          href={source?.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600"
                          title={source?.description}
                        >
                          {sourceName}
                        </a>
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Editing Section */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Edited Response
              {editedContent && editedContent !== editingMessage.content && (
                <span className="ml-2 text-xs text-green-600">(Modified)</span>
              )}
            </label>
            <Textarea
              value={editedContent || editingMessage.content}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Edit the response here..."
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="flex-1"
              disabled={!editedContent.trim() || editedContent === editingMessage.content}
            >
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClearEdit}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

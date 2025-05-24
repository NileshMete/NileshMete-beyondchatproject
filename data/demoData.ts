import type { Message, ToneOption } from "../types"

export const demoMessages: Message[] = [
  {
    id: "1",
    sender: "Arjun Sharma - GitHub",
    content: "Namaste! I have a question about API integration with our system...",
    timestamp: "2 min",
    status: "open",
    avatar: "A",
  },
  {
    id: "2",
    sender: "Priya Patel - Nike",
    content: "Hi there, I have a question about product returns and exchange policy...",
    timestamp: "5 min",
    status: "waiting",
    avatar: "P",
  },
  {
    id: "3",
    sender: "Rajesh Kumar - New Delhi",
    content: "Good morning, let me know about pricing for enterprise solutions...",
    timestamp: "10 min",
    status: "open",
    avatar: "R",
  },
  {
    id: "4",
    sender: "Booking API - Technical",
    content: "Bug report - booking system not working properly for Mumbai region",
    timestamp: "15 min",
    status: "resolved",
    avatar: "B",
  },
  {
    id: "5",
    sender: "Kavya Reddy - HDFC Bank",
    content: "Hey there, I'm here to discuss partnership opportunities for fintech integration",
    timestamp: "20 min",
    status: "waiting",
    avatar: "K",
  },
]

export const toneOptions: ToneOption[] = [
  { id: "soft", label: "Soft Tone", description: "Gentle and empathetic" },
  { id: "professional", label: "Professional", description: "Formal and business-like" },
  { id: "friendly", label: "Friendly", description: "Warm and approachable" },
  { id: "concise", label: "Concise", description: "Brief and to the point" },
  { id: "detailed", label: "Detailed", description: "Comprehensive and thorough" },
  { id: "cultural", label: "Culturally Aware", description: "Respectful of Indian cultural context" },
]

export const dataSources = [
  {
    id: "kb",
    name: "Knowledge Base",
    url: "https://support.example.com/kb",
    description: "Comprehensive product documentation",
  },
  {
    id: "support",
    name: "Support Documentation",
    url: "https://docs.example.com/support",
    description: "Technical support guidelines",
  },
  {
    id: "policy",
    name: "Policy Database",
    url: "https://policies.example.com",
    description: "Company policies and procedures",
  },
  {
    id: "faq",
    name: "FAQ Database",
    url: "https://faq.example.com",
    description: "Frequently asked questions",
  },
  {
    id: "api",
    name: "API Documentation",
    url: "https://api.example.com/docs",
    description: "Developer API reference",
  },
  {
    id: "regional",
    name: "Regional Guidelines",
    url: "https://regional.example.com/india",
    description: "India-specific policies and guidelines",
  },
]

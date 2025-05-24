# 💬 Chatbot Response Testing and Tuning Environment

A sleek frontend interface to **test**, **edit**, and **fine-tune** chatbot responses — built for developers, designers, and QA teams.

![Chatbot Testing Interface](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Chatbot+Testing+Interface)

---

## ✨ Features

- 🖥 **Three-Panel Layout** — Inbox, Response Editor, and Chat Interface  
- 🗨 **Real-time Chat Simulation** — With typing indicators  
- 🎨 **Tone Customization** — Soft, Professional, Friendly, Concise, and more  
- ✏️ **Editable Responses** — Refine chatbot answers on the fly  
- 🔗 **Source Attribution** — View and link to knowledge base articles  
- 📱 **Responsive Design** — Fully mobile and desktop friendly  

---

## 🧰 Tech Stack

| Layer         | Tech                             |
|---------------|----------------------------------|
| Framework     | Next.js 14+, React 18+, TypeScript |
| UI Library    | shadcn/ui, Radix UI, Tailwind CSS |
| Icons         | Lucide React                     |
| Utilities     | clsx, class-variance-authority   |
| Linting & Style | ESLint, Prettier, PostCSS     |

---

## ⚙️ Requirements

Before starting, ensure you have:

\`\`\`bash
Node.js >= 18
npm >= 8 or yarn >= 1.22
Git
Check versions with:

bash
Copy
Edit
node --version
npm --version
git --version
🚀 Getting Started
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/NileshMete/beyondchatproject

cd beyondchatproject
2️⃣ Install Dependencies
bash

npm install        # or yarn install / pnpm install
3️⃣ Install UI Components (shadcn/ui)
bash

npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add scroll-area
npx shadcn@latest add dropdown-menu
4️⃣ Run Dev Server
bash

npm run dev        # or yarn dev / pnpm dev
Open http://localhost:3000 to view the app.

🧪 Interface Overview
Panel	Description
Inbox	See user queries with status (Open, Waiting, Resolved)
Response Editor	Tweak responses, apply tones, link sources
Chat Interface	Interact with chatbot in real-time

🎭 Tone Styles
🧸 Soft – Empathetic and warm

💼 Professional – Clear and formal

😊 Friendly – Conversational and casual

📝 Concise – To-the-point responses

📚 Detailed – In-depth explanations


🔧 Customization
➕ Add More Tones
Edit data/demoData.ts:

📦 Build for Production
bash
Copy
Edit
npm run build
npm start

email: nilesh1234mete@gmail.com

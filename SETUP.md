# Amo - AI Shopping Assistant - Setup Guide

## Prerequisites

1. **OpenAI API Key**: You'll need an OpenAI API key to use the ChatGPT integration
   - Sign up at [OpenAI Platform](https://platform.openai.com/)
   - Generate an API key from your dashboard
   - Make sure you have credits available

## Environment Setup

1. **Create Environment Variables File**
   Create a `.env.local` file in your project root with:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3090
   ```

2. **Install Dependencies** (already done)
   ```bash
   npm install openai ai uuid zod
   ```

## Running the Application

1. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:3090

2. **Navigate to Search Page**
   - Visit http://localhost:3090 for the landing page
   - Click "Start Shopping with AI" to begin chatting
   - Or go directly to http://localhost:3090/search

## Features Implemented

### ✅ Phase 1: Core MVP
- [x] Basic chat interface with AI assistant
- [x] ChatGPT API integration
- [x] Conversation state management
- [x] Message history display
- [x] Loading states and error handling
- [x] Responsive design
- [x] Beautiful landing page

### 🚧 Coming Next (Phase 2)
- [ ] Recommendation page with product cards
- [ ] Price tier analysis
- [ ] Product comparison tools
- [ ] Enhanced conversation memory
- [ ] Mock product database

## File Structure Created

```
app/
├── search/
│   ├── page.tsx              # Main search interface
│   └── components/
│       ├── ChatInput.tsx     # Message input component
│       ├── MessageList.tsx   # Message display
│       └── MessageBubble.tsx # Individual message bubbles
├── api/
│   └── chat/
│       └── route.ts          # ChatGPT API integration
├── lib/
│   ├── types.ts              # TypeScript types
│   └── openai.ts             # OpenAI client setup
└── page.tsx                  # Updated landing page
```

## Troubleshooting

### Common Issues

1. **OpenAI API Error**
   - Check your API key is correct in `.env.local`
   - Verify you have credits in your OpenAI account
   - Ensure the environment variable name is exactly `OPENAI_API_KEY`

2. **Port Already in Use**
   - The app is configured to run on port 3090
   - If you need a different port, update the scripts in `package.json`

3. **Build Errors**
   - Make sure all dependencies are installed: `npm install`
   - Check that TypeScript types are properly imported

### Testing Amo

Try these example prompts:
- "I need a pickleball paddle"
- "Help me choose a couch for my living room"
- "Looking for a stroller for my newborn"
- "I want to buy furniture but don't know where to start"

Amo will:
1. Ask diagnostic questions to understand your needs
2. Show you visual examples and comparisons
3. Teach you about price tiers and features
4. Give you personalized recommendations
5. Help you make the final decision

Watch for "Show image:" directives - Amo will search and display relevant product images!

## Next Steps

Once you have the basic chat working, we can implement:
1. Product recommendation display
2. Price tier analysis
3. Comparison tools
4. Better conversation memory
5. Integration with real product APIs 
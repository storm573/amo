# Amo – AI Expert Shopping Assistant

**"Every big purchase, perfectly picked."**

A conversational agent that learns a shopper's context, cuts through option overload, and guides the shopper to find the single best product for big-ticket or complex buys.

## Features

🎤 **Voice-First Shopping Assistant**: Natural conversation with Amo through voice interface
📊 **Interactive Product Guides**: Visual buying guides with interactive questionnaires  
🧠 **Smart Product Detection**: Automatically displays relevant guides based on conversation
💡 **Expert Recommendations**: 6-stage advisory process from diagnosis to final recommendation
🛒 **Big-Ticket Focus**: Specialized for complex purchases like car seats, laptops, strollers, etc.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Voice Interface
Navigate to `/voice` to access the voice-powered shopping assistant where you can:
- Start a voice conversation with Amo
- Get personalized product recommendations
- View interactive buying guides
- Complete shopping questionnaires

## Project Structure

- `app/voice/page.tsx` - Voice interface with OpenAI Realtime API integration
- `app/search/data/` - Interactive product buying guides (e.g., baby car seats)
- `app/search/components/` - Visual components for product displays

## Technology Stack

This project uses:
- [Next.js](https://nextjs.org) - React framework
- [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime) - Voice conversation
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

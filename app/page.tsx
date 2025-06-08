import Link from "next/link";
import { ShoppingBag, MessageCircle, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              AI
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Meet Amo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your personal shopping expert who finds the single best option for big purchases. Get brand-agnostic advice for laptops, couches, strollers, cameras, and more.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Diagnostic Questions</h3>
            <p className="text-muted-foreground">
              Amo asks smart, targeted questions to understand exactly what you need and how you'll use it.
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Market Education</h3>
            <p className="text-muted-foreground">
              Learn about price tiers, key features, and "unknown unknowns" that matter for your purchase.
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <ShoppingBag className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Top 3-5 Picks</h3>
            <p className="text-muted-foreground">
              Get ranked recommendations with clear trade-offs, all tailored to your specific criteria.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Text Shopping
            </Link>
            <Link
              href="/voice"
              className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🎤
              <span className="ml-2">Voice Shopping</span>
            </Link>
            <Link
              href="/realtime"
              className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ⚡
              <span className="ml-2">Real-time Voice</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Choose your preferred interaction mode - text, voice recording, or real-time conversation
          </p>
        </div>

        {/* How it Works */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Tell Amo What You're Shopping For</h3>
              <p className="text-muted-foreground">
                Just say what you need - "I'm looking for a laptop" or "I need a stroller for twins."
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Go Through Amo's Process</h3>
              <p className="text-muted-foreground">
                She'll diagnose your needs, educate you about the market, and narrow down options systematically.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Your Single Best Option</h3>
              <p className="text-muted-foreground">
                Receive Amo's top ranked picks with clear reasoning and trade-offs explained.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

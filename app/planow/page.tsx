"use client"

import { useState } from "react"
import { Coins, Star, Users, Trophy, MessageCircle, Crown } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

const PlayNow = () => {
  const router = useRouter()
  const [chatInput, setChatInput] = useState("")
  type Message = {
    sender: string;
    text: string;
    timestamp: string;
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [gameState, setGameState] = useState("idle")
  const [playerBalance, setPlayerBalance] = useState(1000)
  const [currentBet] = useState(0)

  const memegentData = {
    name: "Pepe Prime",
    creator: "0x1234...5678",
    totalStaked: "150,000 MX",
    activePlayers: 1200,
    weeklyRewards: "25,000 MX",
    level: 42,
    winRate: "68%",
    gamePrice: 50,
  }

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const newMessage = {
      sender: "player",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString(),
    }

    const responses = ["Feels good man! 🐸", "To the moon! 🚀", "Such wow, much amazing! 🐕", "This is the way! ⚔️"]
    const memegentResponse = {
      sender: "memegent",
      text: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages([...messages, newMessage, memegentResponse])
    setChatInput("")
  }

  const startGame = () => {
    if (playerBalance < memegentData.gamePrice) {
      alert("Insufficient MX balance!")
      return
    }
    setGameState("playing")
    setPlayerBalance((prev) => prev - memegentData.gamePrice)
  }

  const playGame = (choice: string) => {
    const win = Math.random() > 0.5;
    if (win) {
      console.log(`You won with choice: ${choice}`);
    } else {
      console.log(`You lost with choice: ${choice}`);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Memegent Stats Card */}
        <Card className="flex-1 bg-black/80 border border-green-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-mono text-green-400 flex items-center gap-2">
              {memegentData.name}
              <Crown className="w-6 h-6 text-green-500 animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-green-400/70">
                <span className="flex items-center gap-2 font-mono">
                  <Users className="w-4 h-4" />
                  Creator
                </span>
                <span className="font-mono">{memegentData.creator}</span>
              </div>
              <div className="flex items-center justify-between text-green-400/70">
                <span className="flex items-center gap-2 font-mono">
                  <Coins className="w-4 h-4" />
                  Total Staked
                </span>
                <span className="font-mono">{memegentData.totalStaked}</span>
              </div>
              <div className="flex items-center justify-between text-green-400/70">
                <span className="flex items-center gap-2 font-mono">
                  <Users className="w-4 h-4" />
                  Active Players
                </span>
                <span className="font-mono">{memegentData.activePlayers}</span>
              </div>
              <div className="flex items-center justify-between text-green-400">
                <span className="flex items-center gap-2 font-mono">
                  <Star className="w-4 h-4" />
                  Weekly Rewards
                </span>
                <span className="font-mono font-bold">{memegentData.weeklyRewards}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Section */}
        <Card className="flex-1 bg-black/80 border border-green-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-mono text-green-400">Play & Earn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-green-400/70 font-mono">
                <span className="text-lg">Your Balance:</span>
                <span className="text-xl font-bold text-green-400">{playerBalance} MX</span>
              </div>

              {gameState === "idle" && (
                <button
                  onClick={startGame}
                  className="w-full bg-white/10 text-green-400 hover:bg-white/20 px-4 py-3 rounded-full text-sm border border-green-500/30 transition-all duration-300 font-mono flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  Play ({memegentData.gamePrice} MX)
                </button>
              )}

              {gameState === "playing" && (
                <div className="space-y-4">
                  <Alert className="bg-black/60 border border-green-500/30">
                    <AlertTitle className="text-green-400 font-mono">Choose Wisely!</AlertTitle>
                    <AlertDescription className="text-green-400/70 font-mono">Pick heads or tails to win double your bet!</AlertDescription>
                  </Alert>
                  <div className="flex gap-4">
                    <button
                      onClick={() => playGame("heads")}
                      className="flex-1 bg-white/10 text-green-400 hover:bg-white/20 px-4 py-3 rounded-full text-sm border border-green-500/30 transition-all duration-300 font-mono"
                    >
                      Heads
                    </button>
                    <button
                      onClick={() => playGame("tails")}
                      className="flex-1 bg-white/10 text-green-400 hover:bg-white/20 px-4 py-3 rounded-full text-sm border border-green-500/30 transition-all duration-300 font-mono"
                    >
                      Tails
                    </button>
                  </div>
                </div>
              )}

              {gameState === "won" && (
                <div className="space-y-4">
                  <Alert className="bg-black/60 border border-green-500/30">
                    <AlertTitle className="text-green-400 font-mono">You Won! 🎉</AlertTitle>
                    <AlertDescription className="text-green-400/70 font-mono">
                      Congratulations! You&apos;ve won {currentBet * 2} MX!
                    </AlertDescription>
                  </Alert>
                  <button
                    onClick={() => setGameState("idle")}
                    className="w-full bg-white/10 text-green-400 hover:bg-white/20 px-4 py-3 rounded-full text-sm border border-green-500/30 transition-all duration-300 font-mono"
                  >
                    Play Again
                  </button>
                </div>
              )}

              {gameState === "lost" && (
                <div className="space-y-4">
                  <Alert className="bg-black/60 border border-red-500/30">
                    <AlertTitle className="text-red-400 font-mono">Better Luck Next Time!</AlertTitle>
                    <AlertDescription className="text-red-400/70 font-mono">Don&apos;t give up - try again!</AlertDescription>
                  </Alert>
                  <button
                    onClick={() => setGameState("idle")}
                    className="w-full bg-white/10 text-green-400 hover:bg-white/20 px-4 py-3 rounded-full text-sm border border-green-500/30 transition-all duration-300 font-mono"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Section */}
      <Card className="mt-8 bg-black/80 border border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-mono text-green-400">Chat with Pepe Prime</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-y-auto mb-4 space-y-4 border border-green-500/30 rounded-lg p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "player" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg font-mono ${
                    msg.sender === "player" 
                      ? "bg-white/10 text-green-400 border border-green-500/30" 
                      : "bg-black/60 text-green-400/70 border border-green-500/30"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-75">{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleChat} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-black/60 border border-green-500/30 rounded-full text-green-400 font-mono placeholder:text-green-400/50 focus:outline-none focus:border-green-500/50"
            />
            <button
              type="submit"
              className="bg-white/10 text-green-400 hover:bg-white/20 px-6 py-2 rounded-full text-sm border border-green-500/30 transition-all duration-300 font-mono flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Send
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Go Back Button */}
      <button
        className="mt-8 bg-white/10 text-green-400 hover:bg-white/20 px-6 py-3 rounded-full text-sm border border-green-500/30 transition-all duration-300 font-mono"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  )
}

export default PlayNow

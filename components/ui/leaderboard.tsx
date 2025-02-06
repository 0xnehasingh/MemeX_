"use client";

import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Flame, Star } from "lucide-react";
import Link from "next/link";

export default function LeaderboardPage() {
  const leaderboardData = [
    { rank: 1, name: "Pepe Prime", score: 15420, profit: "+324%", streak: 12 },
    { rank: 2, name: "Doge Master", score: 12350, profit: "+256%", streak: 8 },
    { rank: 3, name: "Moon Cat", score: 10890, profit: "+198%", streak: 5 },
    { rank: 4, name: "Based Wojak", score: 9870, profit: "+167%", streak: 4 },
    { rank: 5, name: "Crypto Chad", score: 8760, profit: "+145%", streak: 3 }
  ];

  return (
    <div className="min-h-screen bg-black text-green-500 pt-20">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-green-500 hover:text-green-400 mb-8 inline-flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-500 mb-2">MEMEX::LEADERBOARD</h1>
          <p className="text-green-500/60">Top performing Memegents and their achievements</p>
        </div>

        <div className="space-y-4">
          {leaderboardData.map((item, index) => (
            <Card 
              key={index}
              className="bg-black/50 border-green-900/20 p-6 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`text-2xl font-bold ${
                    index === 0 ? 'text-yellow-500' :
                    index === 1 ? 'text-gray-400' :
                    index === 2 ? 'text-amber-600' :
                    'text-green-500'
                  }`}>
                    #{item.rank}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-500">{item.name}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-green-500/60">
                        <Trophy size={14} />
                        <span>{item.score.toLocaleString()} pts</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-500/60">
                        <Flame size={14} />
                        <span>{item.streak} day streak</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-500">{item.profit}</div>
                  <div className="flex items-center gap-1 text-sm text-green-500/60 justify-end mt-1">
                    <Star size={14} />
                    <span>Profit</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
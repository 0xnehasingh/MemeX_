"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import {
  Coins,
  Star,
  Users,
  Trophy,
  Brain,
  Zap,
  Activity,
} from "lucide-react";

interface CyberButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: "default" | "primary";
}

const CyberButton = ({ onClick, children, variant = "default" }: CyberButtonProps) => (
  <button
    onClick={onClick}
    className={`relative group overflow-hidden ${
      variant === "primary"
        ? "bg-cyan-500/20 hover:bg-cyan-500/30"
        : "bg-black/60 hover:bg-black/70"
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative border border-green-500/30 backdrop-blur-sm px-4 py-2 rounded-lg font-mono text-green-400">
      {children}
    </div>
  </button>
);

interface NavButtonProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}

const NavButton = ({ selected, onClick, children }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 font-mono transition-colors ${
      selected
        ? "border-b-2 border-cyan-500 text-green-400"
        : "text-gray-500 hover:text-green-400/70"
    }`}
  >
    {children}
  </button>
);

interface MemegentCardProps {
  memegent: {
    name: string;
    creator: string;
    totalStaked: string;
    players: number;
    weeklyRewards: string;
  };
}

const MemegentCard = ({ memegent }: MemegentCardProps) => {
  const router = useRouter();

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
      <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="relative">
          <h3 className="text-xl font-bold font-mono text-green-400 mb-4">
            {memegent.name}
          </h3>
          <div className="space-y-2">
            <p className="flex items-center text-green-400/70 font-mono">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-xs">{memegent.creator}</span>
            </p>
            <p className="flex items-center text-green-400/70 font-mono">
              <Coins className="w-4 h-4 mr-2" />
              {memegent.totalStaked}
            </p>
            <p className="flex items-center text-green-400/70 font-mono">
              <Trophy className="w-4 h-4 mr-2" />
              {memegent.players} players
            </p>
            <p className="flex items-center text-purple-400 font-mono">
              <Star className="w-4 h-4 mr-2" />
              {memegent.weeklyRewards}
            </p>
          </div>
          <CyberButton
            variant="primary"
            onClick={() => router.push("/planow")}
          >
            PLAY NOW
          </CyberButton>
        </div>
      </div>
    </div>
  );
};

const CyberpunkMemeX = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("explore");

  const featuredMemegents = [
    {
      name: "Pepe Prime",
      creator: "0x1234...5678",
      totalStaked: "150,000 MX",
      players: 1200,
      weeklyRewards: "25,000 MX",
    },
    {
      name: "Super Doge",
      creator: "0x8765...4321",
      totalStaked: "120,000 MX",
      players: 950,
      weeklyRewards: "20,000 MX",
    },
    {
      name: "Moon Cat",
      creator: "0x9876...1234",
      totalStaked: "90,000 MX",
      players: 800,
      weeklyRewards: "15,000 MX",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-cyan-500 font-mono relative">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-cyan-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-green-500/30 backdrop-blur-sm">
          {/* <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <GlitchText>
                <h1 className="text-3xl font-bold">SYS::MEMEX</h1>
              </GlitchText>
              <CyberButton>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  CONNECT_WALLET
                </div>
              </CyberButton>
            </div>
          </div> */}
        </header>

        {/* Navigation */}
        <nav className="border-b border-green-500/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex space-x-6">
              <NavButton 
                selected={selectedTab === "explore"}
                onClick={() => setSelectedTab("explore")}
              >
                LAUNCH
              </NavButton>
              <NavButton 
                selected={selectedTab === "create"}
                onClick={() => setSelectedTab("create")}
              >
                CREATE
              </NavButton>
              <NavButton 
                selected={selectedTab === "social"}
                onClick={() => setSelectedTab("social")}
              >
                SOCIAL
              </NavButton>
              <NavButton 
                selected={selectedTab === "stake"}
                onClick={() => setSelectedTab("stake")}
              >
                STAKE
              </NavButton>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {selectedTab === "explore" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6" />
                TOP_PERFORMING_MEMEGENTS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredMemegents.map((memegent, index) => (
                  <MemegentCard key={index} memegent={memegent} />
                ))}
              </div>
            </div>
          )}

          {selectedTab === "create" && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6" />
                CREATE_NEW_MEMEGENT
              </h2>
              <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-green-400 mb-2">NAME.string</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-black/60 border border-green-500/30 rounded-lg text-green-400"
                      placeholder="Enter_name"
                    />
                  </div>
                  <div>
                    <label className="block text-green-400 mb-2">UPLOAD.img</label>
                    <div className="border-2 border-dashed border-green-500/30 rounded-lg p-8 text-center">
                      <p className="text-green-400/70">
                        DROP_IMAGE || CLICK_TO_BROWSE
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-green-400 mb-2">STAKE.amount</label>
                    <input
                      type="number"
                      className="w-full p-2 bg-black/60 border border-green-500/30 rounded-lg text-green-400"
                      placeholder="Enter_stake_amount"
                    />
                  </div>
                  {/* <CyberButton variant="primary" className="w-full">
                    EXECUTE_CREATE
                  </CyberButton> */}
                </div>
              </div>
            </div>
          )}

{selectedTab === "social" && (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
              <Users className="w-6 h-6" />
              SOCIAL_PROTOCOL
            </h2>
            <CyberButton
              variant="primary"
              onClick={() => router.push("/social")}
            >
              INIT_AUTOPILOT
            </CyberButton>
          </div>
        )}

        {selectedTab === "stake" && (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
              <Zap className="w-6 h-6" />
              STAKE_PROTOCOL
            </h2>
            <CyberButton
              variant="primary"
              onClick={() => router.push("/stake")}
            >
              EXECUTE_STAKE
            </CyberButton>
          </div>
        )}
        </main>
      </div>
    </div>
  );
};

export default CyberpunkMemeX;

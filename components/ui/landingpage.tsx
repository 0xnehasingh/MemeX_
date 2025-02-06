"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Star,
  Award,
  Power,
  Trophy,
  Gift,
  Rocket,
  Zap,
  CircleDot,
  Brain,
  Plus,
  Compass,
} from "lucide-react";

const GlitchText = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inline-block">
    <span className="relative z-10">{children}</span>
    <span className="absolute top-0 left-0.5 text-red-500 opacity-50 animate-pulse z-0">
      {children}
    </span>
    <span className="absolute top-0 -left-0.5 text-blue-500 opacity-50 animate-pulse z-0">
      {children}
    </span>
  </div>
);

interface StatsCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  label,
  value,
  description,
}: StatsCardProps) => (
  <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
    <Icon className="w-6 h-6 text-green-400 mb-2" />
    <div className="text-2xl font-bold mb-1 font-mono text-green-400">{value}</div>
    <div className="text-green-600 text-sm font-mono">{label}</div>
    <div className="text-green-600/60 text-xs">{description}</div>
  </div>
);

interface ActionButtonProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  variant?: "default" | "primary";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  variant = "default",
}: ActionButtonProps) => (
  <button
    className={`w-full p-4 rounded-lg flex items-center justify-center gap-2 font-mono transition-colors
      ${
        variant === "primary"
          ? "bg-green-500/20 hover:bg-green-500/30"
          : "bg-black/60 hover:bg-black/70"
      }
      border border-green-500/30`}
  >
    <Icon className="w-5 h-5 text-green-400" />
    <span className="text-green-400">{label}</span>
  </button>
);

interface ActivityCardProps {
  title: string;
  time: string;
  points?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  time,
  points,
}: ActivityCardProps) => (
  <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-1 h-8 bg-green-500/50 rounded-full" />
      <span className="text-green-400 font-mono">{title}</span>
    </div>
    <div className="flex items-center gap-4">
      {points && (
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-4 h-4" />
          <span className="font-mono">{points}</span>
        </div>
      )}
      <span className="text-green-600 font-mono">{time}</span>
    </div>
  </div>
);

interface Character {
  id: string;
  name: string;
  emoji: string;
  power: number;
  memeLevel: number;
  rarity: "legendary" | "rare" | "common";
}

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
  isSelected: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSelect,
  isSelected,
}) => (
  <div
    onClick={() => onSelect(character)}
    className={`bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 cursor-pointer
      transition-all hover:scale-105 ${isSelected ? "ring-2 ring-green-500" : ""}`}
  >
    <div className="relative">
      <div className="text-6xl mb-4">{character.emoji}</div>
      <div className="absolute -top-2 -right-2">
        {character.rarity === "legendary" && (
          <Award className="w-6 h-6 text-yellow-400 animate-pulse" />
        )}
        {character.rarity === "rare" && (
          <Star className="w-6 h-6 text-cyan-400" />
        )}
      </div>
    </div>

    <h3 className="text-lg font-bold mb-2 font-mono text-green-400">
      {character.name}
    </h3>

    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-green-500">PWR_LVL</span>
        <div className="w-20 h-2 bg-black/50 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
            style={{ width: `${character.power}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-green-500">MEME_VAL</span>
        <div className="w-20 h-2 bg-black/50 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full"
            style={{ width: `${character.memeLevel}%` }}
          />
        </div>
      </div>
    </div>

    <div className="mt-4 flex justify-between text-xs font-mono">
      <span className="text-green-600">ID_{character.id}</span>
      <span className="text-green-600 uppercase">
        {character.rarity}::class
      </span>
    </div>
  </div>
);

const CyberpunkUI = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [powerUpProgress, setPowerUpProgress] = useState(56);

  const characters: Character[] = [
    {
      id: "001",
      name: "Doge Master",
      emoji: "🐕",
      power: 85,
      memeLevel: 92,
      rarity: "legendary",
    },
    {
      id: "002",
      name: "Pepe King",
      emoji: "🐸",
      power: 78,
      memeLevel: 88,
      rarity: "rare",
    },
    {
      id: "003",
      name: "Cate Lord",
      emoji: "🐱",
      power: 72,
      memeLevel: 84,
      rarity: "rare",
    },
    {
      id: "004",
      name: "Monke Epic",
      emoji: "🐒",
      power: 68,
      memeLevel: 76,
      rarity: "common",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPowerUpProgress((prev) => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 overflow-hidden font-mono">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 container mx-auto p-8">
        <header className="text-center mb-16">
          <GlitchText>
            <h1 className="text-6xl font-bold mt-20">MemeX!</h1>
          </GlitchText>
          <p className="text-green-500/60">
            EXECUTING neural_transfer.sh: Evolving static memes into dynamic AI
            entities...
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={CircleDot}
            label="Total Memegents"
            value="164"
            description="Active characters"
          />
          <StatsCard
            icon={Brain}
            label="Daily Invocations"
            value="43K"
            description="AI interactions"
          />
          <StatsCard
            icon={Zap}
            label="MX Supply"
            value="1B"
            description="Total tokens"
          />
          <StatsCard
            icon={Trophy}
            label="Current APY"
            value="72%"
            description="Staking rewards"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/create">
            <ActionButton icon={Plus} label="Create Memegent" variant="primary" />
          </Link>
          <Link href="/explore">
            <ActionButton
              icon={Compass}
              label="Explore Memegents"
              variant="primary"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={setSelectedCharacter}
              isSelected={selectedCharacter?.id === character.id}
            />
          ))}
        </div>

        {selectedCharacter && (
          <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-mono text-green-400">
              <Power className="w-6 h-6" />
              POWER_UP::{selectedCharacter.name}
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <ActionButton icon={Rocket} label="Train" />
              <ActionButton icon={Star} label="Evolve" />
              <ActionButton icon={Gift} label="Send Gift" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-400">Progress</span>
                <span className="text-green-400">{powerUpProgress}%</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all"
                  style={{ width: `${powerUpProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 font-mono text-green-400">
            LETEST ACTIVITY::
          </h2>
          <div className="space-y-3">
            <ActivityCard title="Pepe Prime completed training" time="2m ago" />
            <ActivityCard
              title="Earned MX from battle"
              time="5m ago"
              points="50"
            />
            <ActivityCard
              title="Updated Doge Master skills"
              time="15m ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkUI;

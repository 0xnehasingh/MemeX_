"use client";

import React, { useState, FormEvent } from 'react';
import { SendHorizontal, Loader2, Brain } from 'lucide-react';

interface Message {
  type: 'user' | 'assistant' | 'error';
  content: string;
}

interface Tool {
  id: string;
  name: string;
}

interface Chain {
  id: number;
  name: string;
  description?: string;
}

interface CyberButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const CyberButton = ({ onClick, children, disabled, type = 'button' }: CyberButtonProps) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className="relative group overflow-hidden bg-black/60 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative border border-green-500/30 backdrop-blur-sm px-4 py-2 rounded-lg font-mono text-green-400">
      {children}
    </div>
  </button>
);

const CyberpunkMechChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTool, setSelectedTool] = useState('');
  const [selectedChain, setSelectedChain] = useState('3'); // Default chain ID

  const tools: Tool[] = [
    { id: 'openai-gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    { id: 'prediction-online', name: 'Prediction Online' },
  ];

  const chains: Chain[] = [
    // Gnosis Chain Mechs
    { 
      id: 3, 
      name: 'GNOSIS.ORACLE', 
      description: 'Dynamic Oracle (0x327E...F7F9)' 
    },
    { 
      id: 6, 
      name: 'GNOSIS.PRIME', 
      description: 'Standard Protocol (0x77a...786a)' 
    },
    // Arbitrum Mechs
    { 
      id: 1, 
      name: 'ARB.ORACLE', 
      description: 'Dynamic Oracle (0x0eA...B82c)' 
    },
    { 
      id: 2, 
      name: 'ARB.PRIME', 
      description: 'Standard Protocol (0x1FD...4597)' 
    },
    // Polygon Mechs
    { 
      id: 1, 
      name: 'POLY.ORACLE', 
      description: 'Dynamic Oracle (0xCF1...188)' 
    },
    { 
      id: 2, 
      name: 'POLY.PRIME', 
      description: 'Standard Protocol (0xbF9...a8a)' 
    },
    // Base Mechs
    { 
      id: 1, 
      name: 'BASE.ORACLE', 
      description: 'Dynamic Oracle (0x37C...BDA)' 
    },
    { 
      id: 2, 
      name: 'BASE.PRIME', 
      description: 'Standard Protocol (0x111...c6c)' 
    },
    // Celo Mechs
    { 
      id: 1, 
      name: 'CELO.ORACLE', 
      description: 'Dynamic Oracle (0xeC2...245)' 
    },
    { 
      id: 2, 
      name: 'CELO.PRIME', 
      description: 'Standard Protocol (0x230...912)' 
    },
    // Optimism Mechs
    { 
      id: 1, 
      name: 'OPT.ORACLE', 
      description: 'Dynamic Oracle (0xbA4...498)' 
    },
    { 
      id: 2, 
      name: 'OPT.PRIME', 
      description: 'Standard Protocol (0xDd4...71a)' 
    }
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const newMessage: Message = { type: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);

    try {
      const response = await fetch('http://localhost:8000/api/mech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          agent_id: parseInt(selectedChain),
          tool: selectedTool || undefined,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to get response from Mech');
      }
      
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: data.result,
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'error',
        content: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
      }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="relative group">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
      
      {/* Main container */}
      <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 relative">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] rounded-lg" />
        
        <div className="relative">
          {/* Title */}
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold font-mono text-green-400">MECH_INTERFACE</h2>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto border border-green-500/30 rounded-lg p-4 space-y-4 mb-4 bg-black/40">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 font-mono backdrop-blur-sm ${
                    message.type === 'user'
                      ? 'bg-cyan-500/20 border border-cyan-500/30 text-green-400'
                      : message.type === 'error'
                      ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                      : 'bg-purple-500/20 border border-purple-500/30 text-green-400'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <select
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className="w-[200px] p-2 bg-black/60 border border-green-500/30 rounded-lg text-green-400 
                  font-mono focus:outline-none focus:border-cyan-500/50 backdrop-blur-sm"
              >
                <option value="">SELECT_TOOL</option>
                {tools.map((tool) => (
                  <option key={tool.id} value={tool.id}>
                    {tool.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="w-[300px] p-2 bg-black/60 border border-green-500/30 rounded-lg text-green-400 
                  font-mono focus:outline-none focus:border-cyan-500/50 backdrop-blur-sm"
              >
                <option value="">SELECT_NETWORK_AND_PRICING</option>
                {chains.map((chain) => (
                  <option key={`${chain.name}-${chain.id}`} value={chain.id}>
                    {chain.name} - {chain.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="ENTER_COMMAND"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 p-2 bg-black/60 border border-green-500/30 rounded-lg text-green-400 
                  font-mono focus:outline-none focus:border-cyan-500/50 backdrop-blur-sm"
              />
              <CyberButton type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <SendHorizontal className="w-4 h-4" />
                )}
              </CyberButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkMechChat;
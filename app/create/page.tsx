// app/create/page.tsx
"use client"

import { BitteChat } from '../../components/MemeTokenChat';
import { ConnectButton } from '../../components/ConnectButton';
import { ArrowLeft, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-black text-green-500 overflow-hidden font-mono">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Link>
          
          <ConnectButton />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Create Memegent</h1>
          <div className="flex items-center justify-center space-x-2 text-green-500/60">
            <Terminal className="w-4 h-4" />
            <p>INITIALIZING memegen_protocol.sh: Configure your meme token parameters...</p>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-green-400 mb-2">TOKEN_CONFIGURATION::</h2>
            <p className="text-green-500/60 text-sm">
              Connect your wallet and interact with the AI assistant to create your meme token.
            </p>
          </div>
          
          <div className="h-[600px] bg-black/40 rounded-lg overflow-hidden">
            <BitteChat />
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
            <h3 className="text-green-400 font-bold mb-2">SECURITY_CHECK::</h3>
            <p className="text-green-500/60 text-sm">
              Smart contracts verified and audited for maximum security.
            </p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
            <h3 className="text-green-400 font-bold mb-2">GAS_OPTIMIZER::</h3>
            <p className="text-green-500/60 text-sm">
              Automated gas optimization for efficient token deployment.
            </p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
            <h3 className="text-green-400 font-bold mb-2">COMMUNITY_SYNC::</h3>
            <p className="text-green-500/60 text-sm">
              Direct integration with major DeFi platforms and DEXs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
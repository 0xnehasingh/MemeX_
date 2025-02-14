// components/MemeTokenChat.tsx
"use client";

import { BitteAiChat } from "@bitte-ai/chat";
import { useAppKitAccount } from '@reown/appkit/react';
import { useSendTransaction, useSwitchChain } from 'wagmi';
import { useCallback, useMemo } from 'react';

export function BitteChat() {
  // Get wallet states
  const { address } = useAppKitAccount();
  const { data: hash, sendTransaction } = useSendTransaction();
  const { switchChain } = useSwitchChain();

  // Memoize the colors object to prevent recreation on every render
  const colors = useMemo(() => ({
    generalBackground: "rgba(0, 0, 0, 0.8)",
    messageBackground: "rgba(37, 38, 43, 0.9)",
    textColor: "#00ff00",
    buttonColor: "#00ff00",
    borderColor: "rgba(0, 255, 0, 0.3)"
  }), []);

  // Memoize the options object
  const options = useMemo(() => ({
    agentName: "MEME_ARCHITECT::v1.0",
    chatId: `meme-token-${address || 'guest'}`
  }), [address]);

  // Memoize the wallet object
  const wallet = useMemo(() => ({
    evm: {
      address,
      hash,
      sendTransaction,
      switchChain
    }
  }), [address, hash, sendTransaction, switchChain]);

  // Custom welcome message component
  const WelcomeMessage = useCallback(() => (
    <div className="p-4 bg-black/60 rounded-lg text-green-400 mb-4 border border-green-500/30">
      <h2 className="text-xl font-bold mb-2">INIT_MEME_PROTOCOL:: 🚀</h2>
      <p>{address ? 'Ready to create your meme token...' : 'Connect wallet to begin...'}</p>
    </div>
  ), [address]);

  return (
    <BitteAiChat
      agentId="meme-cooking-bitte-agent.vercel.app"
      apiUrl="/api/chat"
      historyApiUrl="/api/history"
      wallet={wallet}
      colors={colors}
      options={options}
      welcomeMessageComponent={<WelcomeMessage />}
    />
  );
}
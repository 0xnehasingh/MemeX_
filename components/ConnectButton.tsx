// components/ConnectButton.tsx
"use client";

import { useAppKitAccount } from '@reown/appkit/react';
import { appKit } from '@/app/context';
import { useMemo } from 'react';

export function ConnectButton() {
  const { address, isConnected } = useAppKitAccount();

  const buttonText = useMemo(() => {
    if (isConnected && address) {
      return `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return 'Connect Wallet';
  }, [isConnected, address]);

  return (
    <button
      onClick={() => appKit.open()}
      className="px-4 py-2 bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg 
                 text-green-400 hover:bg-black/70 transition-colors font-mono"
    >
      {buttonText}
    </button>
  );
}
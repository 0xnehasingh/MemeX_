// app/providers.tsx
'use client'

import { wagmiAdapter} from './config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { arbitrumSepolia, avalancheFuji, polygonAmoy } from 'viem/chains'

const queryClient = new QueryClient()

const metadata = {
  name: 'MemeX',
  description: 'Create and deploy meme tokens using AI',
  url: 'https://your-domain.com',
  icons: ['https://your-domain.com/logo.png']
}

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId: "e9014cd42fa6f9eb318412afee47f1f7",
  networks:[polygonAmoy , arbitrumSepolia,avalancheFuji],
  defaultNetwork: arbitrumSepolia,
  metadata,
  features: {
    analytics: true
  }
})

export function Providers({ 
  children, 
  cookies 
}: { 
  children: ReactNode; 
  cookies: string | null 
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  )

  return (
    <WagmiProvider 
      config={wagmiAdapter.wagmiConfig as Config} 
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
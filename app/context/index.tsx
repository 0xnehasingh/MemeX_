// context/index.tsx
'use client'

import { wagmiAdapter } from '../config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { type Chain } from 'viem'
import { mainnet, polygon, arbitrum, base, optimism } from 'wagmi/chains'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

const queryClient = new QueryClient()

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
    throw new Error('Project ID is not defined')
  }

const evmChains = [mainnet, polygon, arbitrum, base, optimism] as const

const metadata = {
  name: 'MemeX',
  description: 'Create and deploy meme tokens using AI',
  url: 'https://your-domain.com',
  icons: ['https://your-domain.com/logo.png']
}

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  networks: evmChains as unknown as [Chain, ...Chain[]],
  defaultNetwork: mainnet as Chain,
  metadata,
  features: {
    analytics: true
  }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
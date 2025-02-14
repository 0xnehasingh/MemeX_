// config/index.tsx
import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, polygon, arbitrum, base, optimism } from 'wagmi/chains'
import { http } from 'viem'

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, polygon, arbitrum, base, optimism]

// Create transport config for each chain
const transports = Object.fromEntries(
  networks.map((chain) => [
    chain.id,
    http()  // Use default RPC URL
  ])
)

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  networks: networks,
  transports
})

export const config = wagmiAdapter.wagmiConfig
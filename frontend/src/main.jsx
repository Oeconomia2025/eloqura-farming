import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'

// Create a wagmi config
const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http()
  }
})

// Create a query client for wagmi
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
import React, { useState } from 'react'
import { useFarming } from '../hooks/useFarming'
import './App.css'

function App() {
  const [masterChefAddress, setMasterChefAddress] = useState('')
  const [pid, setPid] = useState(0)
  const [amount, setAmount] = useState('')
  
  const { pending, deposit, withdraw } = useFarming(
    masterChefAddress && masterChefAddress.startsWith('0x') ? masterChefAddress : undefined, 
    BigInt(pid)
  )

  const handleDeposit = async () => {
    try {
      if (!masterChefAddress || !masterChefAddress.startsWith('0x')) {
        throw new Error('Please enter a valid MasterChef address')
      }
      await deposit(BigInt(amount))
    } catch (error) {
      console.error('Deposit failed:', error)
      alert('Deposit failed: ' + error.message)
    }
  }

  const handleWithdraw = async () => {
    try {
      if (!masterChefAddress || !masterChefAddress.startsWith('0x')) {
        throw new Error('Please enter a valid MasterChef address')
      }
      await withdraw(BigInt(amount))
    } catch (error) {
      console.error('Withdraw failed:', error)
      alert('Withdraw failed: ' + error.message)
    }
  }

  return (
    <div className="App">
      <h1>Eloqura Farming</h1>
      <div className="instructions">
        <h2>Instructions</h2>
        <ol>
          <li>Deploy the contracts using: <code>npx hardhat run deploy/deploy.js --network sepolia</code></li>
          <li>Copy the MasterChef contract address from the deployment output</li>
          <li>Add pools using: <code>npx hardhat run scripts/add-pools.js --network sepolia</code></li>
        </ol>
      </div>
      <div className="form-group">
        <label>MasterChef Address:</label>
        <input 
          type="text" 
          value={masterChefAddress} 
          onChange={(e) => setMasterChefAddress(e.target.value)} 
          placeholder="0x..."
        />
      </div>
      <div className="form-group">
        <label>Pool ID:</label>
        <input 
          type="number" 
          value={pid} 
          onChange={(e) => setPid(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Amount:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />
      </div>
      <div className="button-group">
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      <div className="info">
        <p>Pending Rewards: {pending?.toString()}</p>
        {!masterChefAddress || !masterChefAddress.startsWith('0x') ? (
          <p style={{color: 'red'}}>Please enter a valid MasterChef address starting with '0x'</p>
        ) : null}
      </div>
    </div>
  )
}

export default App
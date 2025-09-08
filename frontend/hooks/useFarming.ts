import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import MasterChefABI from '../abi/EloquraMasterChef.json';

// Set your deployed address in env or config and pass in here
export function useFarming(masterChefAddress: `0x${string}` | undefined, pid: bigint) {
  const { address } = useAccount();

  // Only fetch data if masterChefAddress is provided
  const { data: pending } = useReadContract({
    abi: MasterChefABI as any,
    address: masterChefAddress,
    functionName: 'pendingELOQ',
    args: [pid, address ?? '0x0000000000000000000000000000000000000000'],
    query: {
      enabled: !!masterChefAddress
    }
  });

  const { writeContractAsync: deposit } = useWriteContract();
  const { writeContractAsync: withdraw } = useWriteContract();

  return {
    pending,
    deposit: masterChefAddress ? (amountWei: bigint) =>
      deposit({ abi: MasterChefABI as any, address: masterChefAddress, functionName: 'deposit', args: [pid, amountWei] }) : 
      async () => { throw new Error('MasterChef address not provided'); },
    withdraw: masterChefAddress ? (amountWei: bigint) =>
      withdraw({ abi: MasterChefABI as any, address: masterChefAddress, functionName: 'withdraw', args: [pid, amountWei] }) :
      async () => { throw new Error('MasterChef address not provided'); },
  };
}

import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import MasterChefABI from '../abi/EloquraMasterChef.json';

// Set your deployed address in env or config and pass in here
export function useFarming(masterChefAddress: `0x${string}`, pid: bigint) {
  const { address } = useAccount();

  const { data: pending } = useReadContract({
    abi: MasterChefABI as any,
    address: masterChefAddress,
    functionName: 'pendingELOQ',
    args: [pid, address ?? '0x0000000000000000000000000000000000000000'],
  });

  const { writeContractAsync: deposit } = useWriteContract();
  const { writeContractAsync: withdraw } = useWriteContract();

  return {
    pending,
    deposit: (amountWei: bigint) =>
      deposit({ abi: MasterChefABI as any, address: masterChefAddress, functionName: 'deposit', args: [pid, amountWei] }),
    withdraw: (amountWei: bigint) =>
      withdraw({ abi: MasterChefABI as any, address: masterChefAddress, functionName: 'withdraw', args: [pid, amountWei] }),
  };
}

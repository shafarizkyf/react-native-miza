import {getSenderAddress} from 'permissionless';
import {Hex, concat, createPublicClient, encodeFunctionData, http} from 'viem';
import {privateKeyToAccount} from 'viem/accounts';
import {polygonMumbai} from 'viem/chains';
import {
  ENTRY_POINT_ADDRESS,
  RPC_URL,
  SIMPLE_ACCOUNT_FACTORY_ADDRESS,
} from './config';

export const getERC4337Address = async (
  privateKey: Hex,
  salt: bigint,
): Promise<Hex> => {
  // CREATE THE CLIENTS
  const publicClient = createPublicClient({
    transport: http(RPC_URL),
    chain: polygonMumbai,
  });

  const owner = privateKeyToAccount(privateKey);

  console.log('private key to account: ', owner.address);

  const initCode = concat([
    SIMPLE_ACCOUNT_FACTORY_ADDRESS as Hex,
    encodeFunctionData({
      abi: [
        {
          inputs: [
            {name: 'owner', type: 'address'},
            {name: 'salt', type: 'uint256'},
          ],
          name: 'createAccount',
          outputs: [{name: 'ret', type: 'address'}],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [owner.address, salt],
    }),
  ]);

  // CALCULATE THE SENDER ADDRESS
  return getSenderAddress(publicClient, {
    initCode,
    entryPoint: ENTRY_POINT_ADDRESS as Hex,
  });
};

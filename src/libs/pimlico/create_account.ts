import {
  UserOperation,
  bundlerActions,
  signUserOperationHashWithECDSA,
} from 'permissionless';
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from 'permissionless/actions/pimlico';
import {Hex, concat, createClient, encodeFunctionData, http} from 'viem';
import {privateKeyToAccount} from 'viem/accounts';
import {polygonMumbai} from 'viem/chains';
import {
  ENTRY_POINT_ADDRESS,
  PRIVATE_KEY,
  SIMPLE_ACCOUNT_FACTORY_ADDRESS,
  PIMLICO_API_KEY,
  CHAIN,
} from './config';
import {getERC4337Address} from './utils';

const createAccount = async () => {
  // CREATE THE CLIENTS
  const bundlerClient = createClient({
    transport: http(
      `https://api.pimlico.io/v1/${CHAIN}/rpc?apikey=${PIMLICO_API_KEY}`,
    ),
    chain: polygonMumbai,
  })
    .extend(bundlerActions)
    .extend(pimlicoBundlerActions);

  const paymasterClient = createClient({
    transport: http(
      `https://api.pimlico.io/v2/${CHAIN}/rpc?apikey=${PIMLICO_API_KEY}`,
    ),
    chain: polygonMumbai,
  }).extend(pimlicoPaymasterActions);

  // GENERATE THE INITCODE
  const owner = privateKeyToAccount(PRIVATE_KEY as Hex);

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
      args: [owner.address, BigInt(0)],
    }),
  ]);

  console.log('Generated initCode:', initCode);

  // CALCULATE THE SENDER ADDRESS
  const senderAddress = await getERC4337Address(PRIVATE_KEY as Hex, BigInt(0));

  console.log('senderAddress: ', senderAddress);

  // GENERATE THE CALLDATA
  const to = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // vitalik
  const value = BigInt(0);
  const data = '0x68656c6c6f'; // "hello" encoded to utf-8 bytes

  const callData = encodeFunctionData({
    abi: [
      {
        inputs: [
          {name: 'dest', type: 'address'},
          {name: 'value', type: 'uint256'},
          {name: 'func', type: 'bytes'},
        ],
        name: 'execute',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    args: [to, value, data],
  });

  console.log('Generated callData:', callData);

  // FILL OUT REMAINING USER OPERATION VALUES
  const gasPrice = await bundlerClient.getUserOperationGasPrice();

  const userOperation = {
    sender: senderAddress,
    nonce: BigInt(0),
    initCode,
    callData,
    maxFeePerGas: gasPrice.fast.maxFeePerGas,
    maxPriorityFeePerGas: gasPrice.fast.maxPriorityFeePerGas,
    // dummy signature
    signature: '0x00' as Hex,
  };

  // REQUEST PIMLICO VERIFYING PAYMASTER SPONSORSHIP
  const sponsorUserOperationResult = await paymasterClient.sponsorUserOperation(
    {
      userOperation,
      entryPoint: ENTRY_POINT_ADDRESS as Hex,
    },
  );

  const sponsoredUserOperation: UserOperation = {
    ...userOperation,
    preVerificationGas: sponsorUserOperationResult.preVerificationGas,
    verificationGasLimit: sponsorUserOperationResult.verificationGasLimit,
    callGasLimit: sponsorUserOperationResult.callGasLimit,
    paymasterAndData: sponsorUserOperationResult.paymasterAndData,
  };

  console.log('Received paymaster sponsor result:', sponsorUserOperationResult);

  // SIGN THE USER OPERATION
  const signature = await signUserOperationHashWithECDSA({
    account: owner,
    userOperation: sponsoredUserOperation,
    chainId: polygonMumbai.id,
    entryPoint: ENTRY_POINT_ADDRESS as Hex,
  });
  sponsoredUserOperation.signature = signature;

  console.log('Generated signature:', signature);

  // SUBMIT THE USER OPERATION TO BE BUNDLED
  const userOperationHash = await bundlerClient.sendUserOperation({
    userOperation: sponsoredUserOperation,
    entryPoint: ENTRY_POINT_ADDRESS as Hex,
  });

  console.log('Received User Operation hash:', userOperationHash);

  // let's also wait for the userOperation to be included, by continually querying for the receipts
  console.log('Querying for receipts...');
  const receipt = await bundlerClient.waitForUserOperationReceipt({
    hash: userOperationHash,
  });
  const txHash = receipt.receipt.transactionHash;

  console.log(
    `UserOperation included: https://mumbai.polygonscan.com/tx/${txHash}`,
  );
};

export default createAccount;

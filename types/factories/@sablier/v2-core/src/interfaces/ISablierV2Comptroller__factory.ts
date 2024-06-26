/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ISablierV2Comptroller,
  ISablierV2ComptrollerInterface,
} from "../../../../../@sablier/v2-core/src/interfaces/ISablierV2Comptroller";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "UD60x18",
        name: "oldFlashFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "UD60x18",
        name: "newFlashFee",
        type: "uint256",
      },
    ],
    name: "SetFlashFee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "UD60x18",
        name: "oldProtocolFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "UD60x18",
        name: "newProtocolFee",
        type: "uint256",
      },
    ],
    name: "SetProtocolFee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "newFlag",
        type: "bool",
      },
    ],
    name: "ToggleFlashAsset",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "TransferAdmin",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "flashFee",
    outputs: [
      {
        internalType: "UD60x18",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
    ],
    name: "isFlashAsset",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
    ],
    name: "protocolFees",
    outputs: [
      {
        internalType: "UD60x18",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "UD60x18",
        name: "newFlashFee",
        type: "uint256",
      },
    ],
    name: "setFlashFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
      {
        internalType: "UD60x18",
        name: "newProtocolFee",
        type: "uint256",
      },
    ],
    name: "setProtocolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
    ],
    name: "toggleFlashAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "transferAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ISablierV2Comptroller__factory {
  static readonly abi = _abi;
  static createInterface(): ISablierV2ComptrollerInterface {
    return new Interface(_abi) as ISablierV2ComptrollerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ISablierV2Comptroller {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ISablierV2Comptroller;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ISablierV2NFTDescriptor,
  ISablierV2NFTDescriptorInterface,
} from "../../../../../@sablier/v2-core/src/interfaces/ISablierV2NFTDescriptor";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC721Metadata",
        name: "sablier",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ISablierV2NFTDescriptor__factory {
  static readonly abi = _abi;
  static createInterface(): ISablierV2NFTDescriptorInterface {
    return new Interface(_abi) as ISablierV2NFTDescriptorInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ISablierV2NFTDescriptor {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ISablierV2NFTDescriptor;
  }
}

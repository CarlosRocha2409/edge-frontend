import { IMetadata } from "./metadata.dto";

interface TransactionData {
    action?: string;
    device?: string;
    memo: string;
    signature?: string;
    stake?: string;
    destination?: string;
    ref?: string;
    token?: string;
}

interface Block {
    height: number;
    hash: string;
}

export interface IBlock {
    timestamp: number;
    sender: string;
    recipient: string;
    amount: number;
    data: TransactionData;
    nonce: number;
    signature: string;
    hash: string;
    block: Block;
    confirmations: number;
}

export interface IBlockResponse{
    results:  IBlock[];
    metadata: IMetadata
}

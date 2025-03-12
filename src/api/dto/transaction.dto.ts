import { IMetadata } from "./metadata.dto";

export interface ITransaction {
    timestamp: number,
    sender: string,
    recipient: string,
    amount: number,
    data: {
        memo: string,
        ref: string
    },
    nonce: number,
    signature: string,
    hash: string,
    block: {
        height: number,
        hash: string,
    },
    confirmations: number
}

export interface ITransactionResponse{
    results:  ITransaction[];
    metadata: IMetadata
}




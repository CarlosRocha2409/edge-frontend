export interface IMetadata {
    count: number,
    limit: number,
    page: number,
    skip: number,
    totalCount: number
    timestamp?: {
        gt: number
    },
}


import { History } from '../BaseApi'

export interface ExplorerDataParser {
  parseTransactionAsHistoryItem: (transaction: any) => Promise<History>
}

export interface Explorer {
  soraNetwork: string;
  getAccountTransactions: (accountAddress: string) => Promise<Array<any>>;
  getTransaction: (hash: string) => Promise<any>
}

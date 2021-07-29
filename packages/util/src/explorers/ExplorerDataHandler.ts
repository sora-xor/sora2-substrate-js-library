import { History } from '../BaseApi'
import { Explorer, ExplorerDataParser} from './types'

export default class ExplorerDataHandler {
  protected explorer: Explorer
  protected parser: ExplorerDataParser

  constructor (explorer: Explorer, parser: ExplorerDataParser) {
    this.explorer = explorer
    this.parser = parser
  }

  public async transformAccountTransactionsToHistory (accountAddress: string): Promise<Array<History>> {
    const history = []

    const transactions = await this.explorer.getAccountTransactions(accountAddress)

    for (const transaction of transactions) {
      const historyItem = await this.parser.parseTransactionAsHistoryItem(transaction)

      history.push(historyItem)
    }

    return history.filter(item => !!item)
  }
}

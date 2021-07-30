import { History } from '../BaseApi'
import { Explorer, ExplorerDataParser} from './types'

export default class ExplorerDataHandler {
  protected explorer: Explorer
  protected parser: ExplorerDataParser

  public setExplorer (explorer: Explorer) {
    this.explorer = explorer
  }

  public setParser (parser: ExplorerDataParser) {
    this.parser = parser
  }

  public async transformAccountTransactionsToHistory (accountAddress: string): Promise<Array<History>> {
    this.checkDependencies()

    const history = []

    const transactions = await this.explorer.getAccountTransactions(accountAddress)

    for (const transaction of transactions) {
      const historyItem = await this.parser.parseTransactionAsHistoryItem(transaction)

      history.push(historyItem)
    }

    return history.filter(item => !!item)
  }

  private checkDependencies (): void {
    if (!this.explorer) {
      throw new Error('[ExplorerDataParser]: "explorer" is not defined. Please use "setExplorer" method to set explorer instance')
    }
    if (!this.parser) {
      throw new Error('[ExplorerDataParser]: "parser" is not defined. Please use "setParser" method to set parser instance')
    }
  }
}

export class Storage {
  protected namespace: string

  constructor (namespace = 'sora') {
    this.namespace = namespace 
  }

  public all (): Array<Array<any>> {
    return Object.entries(localStorage).filter(([key]) => key.startsWith(this.namespace))
  }

  public get (key: string): string {
    return localStorage.getItem(`${this.namespace}.${key}`)
  }

  public set (key: string, value: any): void {
    localStorage.setItem(`${this.namespace}.${key}`, value)
  }

  public remove (key: string): void {
    localStorage.removeItem(`${this.namespace}.${key}`)
  }

  public clear (): void {
    this.all().forEach(([key]) => localStorage.removeItem(key))
  }
}

export class AccountStorage extends Storage {
  constructor (accountAddress: string) {
    if (!accountAddress) {
      throw new Error('AccountStorage: accountAddress is required')
    }
    super('account')
    this.setIdentity(accountAddress)
  }

  public setIdentity (identity: string) {
    this.namespace = `${this.namespace}:${identity}`
  }
}

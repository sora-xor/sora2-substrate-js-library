export class NamespacedStorageAdapter {
  protected namespace: string
  protected storage: Storage

  constructor (namespace = 'sora', webStorage = localStorage) {
    this.namespace = namespace
    this.storage = webStorage
  }

  public all (): Array<Array<any>> {
    return Object.entries(this.storage).filter(([key]) => key.startsWith(this.namespace))
  }

  public get (key: string): any {
    const item = this.storage.getItem(`${this.namespace}.${key}`)

    try {
      return JSON.parse(item)
    } catch (error) {
      console.error(error)
      return item
    }
  }

  public set (key: string, value: any): void {
    this.storage.setItem(`${this.namespace}.${key}`,  JSON.stringify(value))
  }

  public remove (key: string): void {
    this.storage.removeItem(`${this.namespace}.${key}`)
  }

  public clear (): void {
    this.all().forEach(([key]) => this.remove(key))
  }
}

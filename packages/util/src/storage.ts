export class Storage {
  constructor () {}

  public all (): Array<Array<any>> {
    return Object.entries(localStorage).filter(([key]) => key.startsWith('sora'))
  }

  public get (key: string): string {
    return localStorage.getItem(`sora.${key}`)
  }

  public set (key: string, value: any): void {
    localStorage.setItem(`sora.${key}`, value)
  }

  public remove (key: string): void {
    localStorage.removeItem(`sora.${key}`)
  }

  public clear (): void {
    this.all().forEach(([key]) => localStorage.removeItem(key))
  }
}

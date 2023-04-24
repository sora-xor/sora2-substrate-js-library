export class Storage<T = string> {
  protected namespace: string;

  constructor(namespace = 'sora') {
    this.namespace = namespace;
  }

  public all(): Array<Array<any>> {
    return Object.entries(localStorage).filter(([key]) => key.startsWith(this.namespace));
  }

  public get(key: T): string {
    return localStorage.getItem(`${this.namespace}.${key}`) ?? '';
  }

  public set(key: T, value: any): void {
    localStorage.setItem(`${this.namespace}.${key}`, value);
  }

  public remove(key: T): void {
    localStorage.removeItem(`${this.namespace}.${key}`);
  }

  public clear(): void {
    this.all().forEach(([key]) => localStorage.removeItem(key));
  }
}

export class AccountStorage<T = string> extends Storage<T> {
  constructor(identity: string) {
    if (!identity) {
      throw new Error('AccountStorage: identity is required');
    }
    super(`account:${identity}`);
  }
}

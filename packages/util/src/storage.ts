export class Storage<T = string> {
  constructor(protected namespace = 'sora', protected delimeter = '.', protected storage = localStorage) {
    this.namespace = namespace;
  }

  public all(): Array<Array<any>> {
    return Object.entries(this.storage).filter(([key]) => key.startsWith(this.namespace));
  }

  public get(key: T): string {
    return this.storage.getItem(`${this.namespace}${this.delimeter}${key}`) ?? '';
  }

  public set(key: T, value: any): void {
    this.storage.setItem(`${this.namespace}${this.delimeter}${key}`, value);
  }

  public remove(key: T): void {
    this.storage.removeItem(`${this.namespace}${this.delimeter}${key}`);
  }

  public clear(): void {
    this.all().forEach(([key]) => this.storage.removeItem(key));
  }
}

export class AccountStorage<T = string> extends Storage<T> {
  constructor(identity: string, storage = localStorage) {
    if (!identity) {
      throw new Error('AccountStorage: identity is required');
    }
    super(`account:${identity}`, '.', storage);
  }
}

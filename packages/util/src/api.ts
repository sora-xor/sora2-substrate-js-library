import { connection } from '@sora-substrate/connection';

import { BaseApi } from './BaseApi';
import { AccountManager } from './accountManager';

class Api<T = void> extends BaseApi<T> {
  public readonly accountManager = new AccountManager();
}

const api = new Api(connection);

export { api, Api };

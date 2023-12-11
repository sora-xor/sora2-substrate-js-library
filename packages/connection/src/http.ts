import axios from 'axios';

const throwError = (fnName: string, arg: string) => {
  throw new Error(`${fnName}: argument ${arg} is required`);
};

export const axiosInstance = axios.create();

export function getRpcEndpoint(wsEndpoint: string): string {
  // for soramitsu nodes
  if (/^wss:\/\/ws\.(?:.+\.)*sora2\.soramitsu\.co\.jp\/?$/.test(wsEndpoint)) {
    return wsEndpoint.replace(/^wss:\/\/ws/, 'https://rpc');
  }
  return wsEndpoint.replace(/^ws(s)?:/, 'http$1:');
}

export async function fetchRpc(url: string, method: string, params?: any): Promise<any> {
  if (!url) return throwError(fetchRpc.name, 'url');
  if (!method) return throwError(fetchRpc.name, 'method');

  const { data } = await axiosInstance.post(url, {
    id: 1,
    jsonrpc: '2.0',
    method,
    params,
  });

  return data.result;
}

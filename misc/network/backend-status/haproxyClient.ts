import { buildApiClient } from '../network-hooks';

export type HaproxyStatus =
  | 'UP'
  | 'DOWN'
  | 'MAINT (resolution)'
  | 'NOLB'
  | 'DRAIN'
  | 'no check';
class HaproxyClient {
  constructor(_: unknown, private basePath: string) {}

  async getHaproxyCsv() {
    const response = await fetch(`${this.basePath};csv`);
    const data = await response.text();

    return { data, response };
  }

  async getHaproxyJson() {
    const response = await fetch(`${this.basePath};json`);
    const data = await response.json();

    return { data, response };
  }
}

export const haproxyClient = buildApiClient(HaproxyClient, '/healthcheck');

// https://www.haproxy.com/blog/exploring-the-haproxy-stats-page/#server-1
export const backendStatesToReasons: { [K in HaproxyStatus]: string } = {
  UP: 'The server is reporting as healthy.',
  DOWN: 'The server is reporting as unhealthy and unable to receive requests.',
  NOLB:
    'You’ve added http-check disable-on-404 to the backend and the health checked URL has returned an HTTP 404 response.',
  'MAINT (resolution)':
    'The server has been disabled or put into maintenance mode.',
  DRAIN: 'The server has been put into drain mode.',
  'no check': 'Health checks are not enabled for this server.',
};

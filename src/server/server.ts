import http from 'node:http';
import { Router, RouterRequest, RouterResponse } from './router';
// import { DBConnect } from './dbconnect';

export class Server extends Router {
  #server: http.Server;
  // constructor(db: DBConnect) {
  constructor() {
    super();
    // this.db = db;
    const listener = (req: RouterRequest, res: RouterResponse): void => {
      let inData = '';
      req.on('data', (data) => { inData += data; });
      req.on('end', () => {
        this.execute(req, res, {}, req.url ?? '', inData);
      });
    };
    this.#server = http.createServer(listener);
  }

  async start(port: number, host: string): Promise<void> {
    const listenPromise = new Promise<void>((res) => {
      this.#server.listen(port, host, () => { res(); });
    });
    await Promise.all([listenPromise]);
    console.info('Start server');
  }

  async exit(): Promise<void> {
    const closePromise = new Promise<void>((res, rej) => {
      this.#server.close((err) => {
        if (err) { rej(err); }
        res();
      });
    });
    await Promise.all([closePromise]);
    console.info('Exit server');
  }
}

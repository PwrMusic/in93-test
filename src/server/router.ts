import http from 'node:http';
import url from 'node:url';
import fs from 'node:fs';
// import { DBAuth, DBConnect } from './dbconnect';

export type RouterRequest = http.IncomingMessage;
export type RouterResponse = http.ServerResponse;
export type RouterHandler = (req: RouterRequest, res: RouterResponse, params: RouterParams, url: string) => void;

export interface RouterParams {
  [key: string]: string;
}

export class Router {
  // db!: DBConnect;
  htmlPath = './static';
  jsPath = './dist';

  execute(req: RouterRequest, res: RouterResponse, params: RouterParams, urll: string, inData: string): void {
    const urlParsed = url.parse(urll, true);
    const path = urlParsed.pathname;
    console.info('---------------------------------------------------------------------------------------------------------------------');
    // console.info(req);
    console.info(path);
    let html: Buffer;
    try {
      if (path?.slice(-3) === 'api') {
        console.info('json');
        //this.apiRun(req, res, inData);
      } else if (path?.slice(-3) === '.js') {
        html = fs.readFileSync(this.jsPath + path);
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(html);
        // this.db.addUser(1, 'one', 'two');
      } else if (path?.slice(-5) === '.html') {
        html = fs.readFileSync(this.htmlPath + path);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      } else {
        console.info('error type');
      }
    } catch (err) {
      html = fs.readFileSync('./static/pnf.html');
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  }

  // apiRun(req: RouterRequest, res: RouterResponse, inData: string): void {
  //   const data = JSON.parse(inData) as DBAuth;
  //   console.info(data);
  //   this.db.addUser(data.login, data.password);
  //   // res.writeHead(200, { 'Content-Type': 'application/json' });
  //   // res.end({ 'status': 'success' });
  // }
}

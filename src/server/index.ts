import { Server } from './server';
// import { DBConnect } from './dbconnect';

//const db = new DBConnect();
const server = new Server();
server.start(8080, '0.0.0.0');

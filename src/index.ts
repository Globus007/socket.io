import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg: string) => {
    io.emit('chat message', msg);
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`listening on *:${SERVER_PORT}`);
});

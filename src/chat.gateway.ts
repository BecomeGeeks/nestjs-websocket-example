import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  // Called when a client connects
  handleConnection(client: any) {
    this.server.emit('message', 'Welcome to the chat!');
    this.server.emit('userConnected', 'A new user has joined the chat.');
  }

  // Called when a client disconnects
  handleDisconnect(client: any) {
    this.server.emit('userDisconnected', 'A user has left the chat.');
  }

  // Called when a client sends a message
  @SubscribeMessage('message')
  handleMessage(client: any, message: string) {
    this.server.emit('message', message);
  }
}

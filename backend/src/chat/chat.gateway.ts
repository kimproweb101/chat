import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  @WebSocketServer() server?: Server;

  handleConnection(socket: Socket) {
    if (!socket) return;
    console.log(`클라이언트 연결됨: ${socket.id}`);
  }

  @SubscribeMessage('send_message')
  sendMessage(@MessageBody() message: string) {
    console.log(`받은 메시지: ${message}`);
    this.server?.emit('send_message', message);
    return message;
  }
}

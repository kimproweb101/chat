import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(socket: Socket) {
    console.log(`클라이언트 연결됨: ${socket.id}`);    
  }

  @SubscribeMessage('enter_chat')
  enterChat(
    @MessageBody() data: number[],
    @ConnectedSocket() socket: Socket,
  ){
    console.log('enterChat')
    console.log(data)    
    for(const chatId of data){
      socket.join(chatId.toString());
    }
  }


  @SubscribeMessage('send_message')
  sendMessage(
    @MessageBody() message:{message:string, chatId:number},
    @ConnectedSocket() socket:Socket,
  ) {    
  //  this.server.in(message.chatId.toString()).emit('receive_message', {message:message.message, socket: socket.id})
  socket.to(message.chatId.toString()).emit('receive_message', {message:message.message, socket: socket.id})
  }
}

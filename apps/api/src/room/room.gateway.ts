import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { SOCKET_EVENT, SOCKET_NAMESPACE } from '../../../../packages/constants/socket-event';
import { RoomService } from './room.service';

@WebSocketGateway({ namespace: SOCKET_NAMESPACE.GAME })
export class RoomGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  constructor(private readonly roomService: RoomService) {}

  async onModuleInit() {
    await this.roomService.createRoom('1');
  }

  @SubscribeMessage(SOCKET_EVENT.CHECK_ROOM_AVAILABILITY)
  async handleCheckRoomAvailability(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    const { roomId } = data;

    await client.join(roomId);

    const availability = await this.roomService.getRoomAvailability(roomId);

    client.emit(SOCKET_EVENT.CHECK_ROOM_AVAILABILITY, availability);

    return availability;
  }
}

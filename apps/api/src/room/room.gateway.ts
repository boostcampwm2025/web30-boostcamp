import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { SOCKET_NAMESPACE } from '../../../../packages/constants/socket-event';
import { RoomService } from './room.service';

@WebSocketGateway({ namespace: SOCKET_NAMESPACE.GAME })
export class RoomGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  constructor(private readonly roomService: RoomService) {}

  async onModuleInit() {
    await this.roomService.createRoom('1');
  }
}

import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { SOCKET_NAMESPACE } from '../../../../packages/constants/socket-event';
import { GameService } from './game.service';

@WebSocketGateway({ namespace: SOCKET_NAMESPACE.GAME })
export class GameGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  constructor(private readonly gameService: GameService) {}

  async onModuleInit() {
    await this.gameService.createRoom('1');
  }
}

import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import {
  SOCKET_ERROR,
  SOCKET_EVENT,
  SOCKET_NAMESPACE,
} from '../../../../packages/constants/socket-event';
import { RoomUser, UserRole } from '../../../../packages/types/user';
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

  @SubscribeMessage(SOCKET_EVENT.JOIN_ROOM)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; requestedRole: UserRole; username: string },
  ) {
    const { roomId, requestedRole, username } = data;

    const room = await this.roomService.getRoom(roomId);

    if (!room) {
      client.emit(SOCKET_EVENT.ERROR, {
        code: SOCKET_ERROR.ROOM_NOT_FOUND,
        message: '방을 찾을 수 없습니다.',
      });
      return;
    }

    const currentPlayerCount = room.currentPlayers.length;

    if (requestedRole === 'player' && currentPlayerCount >= 2) {
      client.emit(SOCKET_EVENT.ERROR, {
        code: SOCKET_ERROR.ROOM_FULL,
        message: '방이 가득 찼습니다.',
      });
      return;
    }

    const newUser: RoomUser = {
      userId: client.id,
      username: username,
      socketId: client.id,
      role: requestedRole,
      joinedAt: new Date(),
    };

    if (requestedRole === 'player') {
      room.currentPlayers.push(newUser);
    } else {
      room.currentSpectators.push(newUser);
    }

    await this.roomService.saveRoom(room);

    await client.join(roomId);
  }
}

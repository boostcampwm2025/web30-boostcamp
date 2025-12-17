import { Injectable } from '@nestjs/common';

import { ROOM_CONFIG } from '../../../../packages/constants/socket-event';
import { Room } from '../../../../packages/types/room';

@Injectable()
export class GameService {
  createDefaultRoom(roomId: string): Room {
    return {
      roomId,
      title: `배틀룸 ${roomId}`,
      hostId: 'system',
      status: 'waiting',
      createdAt: new Date(),
      currentPlayers: [],
      currentSpectators: [],
      settings: {
        maxPlayers: ROOM_CONFIG.MAX_PLAYERS,
      },
    };
  }
}

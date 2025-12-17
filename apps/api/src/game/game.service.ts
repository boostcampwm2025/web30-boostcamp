import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/redis/redis.module';

import { ROOM_CONFIG } from '../../../../packages/constants/socket-event';
import { Room } from '../../../../packages/types/room';

@Injectable()
export class GameService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async createRoom(roomId: string): Promise<Room> {
    const room = this.createDefaultRoom(roomId);
    await this.redis.set(`room:${room.roomId}:info`, JSON.stringify(room));
    return room;
  }

  private createDefaultRoom(roomId: string): Room {
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

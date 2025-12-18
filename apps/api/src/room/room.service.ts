import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { ROOM_CONFIG } from '../../../../packages/constants/socket-event';
import { Room } from '../../../../packages/types/room';
import { REDIS_CLIENT } from '../redis/redis.module';
import { RedisKeys } from '../redis/redis-key.constant';

@Injectable()
export class RoomService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async createRoom(roomId: string): Promise<Room> {
    const room = this.createDefaultRoom(roomId);
    const key = RedisKeys.room(room.roomId);
    await this.redis.set(key, JSON.stringify(room));
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

  async getRoom(roomId: string): Promise<Room | null> {
    const key = RedisKeys.room(roomId);
    const data = await this.redis.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as Room;
  }

  async getRoomAvailability(
    roomId: string,
  ): Promise<{ playerCount: number; isAvailable: boolean }> {
    const room = await this.getRoom(roomId);

    if (!room) {
      return { playerCount: 0, isAvailable: false };
    }

    const playerCount = room.currentPlayers.length;
    const isAvailable = playerCount < ROOM_CONFIG.MAX_PLAYERS;

    return { playerCount, isAvailable };
  }
}

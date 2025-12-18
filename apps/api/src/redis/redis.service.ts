import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { Battle } from '../../../../packages/types/battle';
import { REDIS_CLIENT } from './redis.module';
import { RedisKeys } from './redis-key.constant';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  async createBattle(battle: Battle): Promise<void> {
    try {
      const key = RedisKeys.battle(battle.battleId);
      await this.redis.set(key, JSON.stringify(battle));

      // roomId로 battleId 매핑 저장
      const roomKey = RedisKeys.battleByRoom(battle.roomId);
      await this.redis.set(roomKey, battle.battleId);
    } catch (error) {
      // TODO: 에러 로깅 추가
      console.error('Failed to create battle in Redis:', error);
    }
  }

  async getBattle(battleId: string): Promise<Battle | null> {
    const key = RedisKeys.battle(battleId);
    const data = await this.redis.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as Battle;
  }
}

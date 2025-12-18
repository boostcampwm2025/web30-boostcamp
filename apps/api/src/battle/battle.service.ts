import { Injectable } from '@nestjs/common';

import { BATTLE_CONFIG } from '../../../../packages/constants/battle';
import { Battle, BattleUser, CreateBattleDTO } from '../../../../packages/types/battle';
import { RedisService } from './../redis/redis.service';

@Injectable()
export class BattleService {
  constructor(private readonly redisService: RedisService) {}

  async createBattle(dto: CreateBattleDTO): Promise<Battle> {
    // TODO: 배틀 ID 생성 로직 추가
    const battleId = `battle-${Date.now()}`;

    const users: BattleUser[] = dto.users.map((userId) => ({
      userId,
      battleId,
      code: '',
      language: BATTLE_CONFIG.DEFAULT_LANGUAGE,
      progress: {
        passedCount: 0,
        totalCount: 0,
      },
      isConnected: true,
      isFinished: false,
    }));

    const battle: Battle = {
      battleId,
      roomId: dto.roomId,
      status: 'running',
      config: {
        duration: dto.config.duration || BATTLE_CONFIG.DURATION,
      },
      startedAt: new Date(),
      users,
    };

    await this.redisService.createBattle(battle);

    return battle;
  }
}

import { Injectable } from '@nestjs/common';
import { BATTLE_CONFIG } from '@packages/constants/battle';
import { Battle, BattleUser, CreateBattleDTO, UpdateUserCodeDTO } from '@packages/types/battle';

import { BattleRedisService } from '@/battle/battle-redis.service';

@Injectable()
export class BattleService {
  constructor(private readonly battleRedisService: BattleRedisService) {}

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

    await this.battleRedisService.createBattle(battle);

    return battle;
  }

  async getBattle(battleId: string): Promise<Battle | null> {
    // TODO: 권한 체크 추가 (사용자가 해당 배틀에 접근 가능한지 또는 비밀번호 존재 등)
    return this.battleRedisService.getBattle(battleId);
  }

  async getBattleByRoomId(roomId: string): Promise<Battle | null> {
    // TODO: 권한 체크 추가 (사용자가 해당 방에 참여 중인지 또는 비밀번호 존재 등)
    // TODO: 배틀 상태 검증 (종료된 배틀인지 등)
    return this.battleRedisService.getBattleByRoomId(roomId);
  }

  async updateUserCode(dto: UpdateUserCodeDTO): Promise<Battle | null> {
    // TODO: 권한 체크 추가 (해당 userId가 코드를 수정할 권한이 있는지)
    // TODO: 배틀 상태 검증 (종료된 배틀은 수정 불가)
    return this.battleRedisService.updateUserCode(dto);
  }
}

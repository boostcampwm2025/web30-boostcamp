import { Test, TestingModule } from '@nestjs/testing';
import { BattleService } from './battle.service';
import { RedisService } from '../redis/redis.service';
import { CreateBattleDTO } from '../../../../packages/types/battle';
import { BATTLE_CONFIG } from '../../../../packages/constants/battle';

describe('BattleService', () => {
  let service: BattleService;
  let mockRedisService: Partial<RedisService>;

  beforeEach(async () => {
    mockRedisService = {
      createBattle: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BattleService,
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
      ],
    }).compile();

    service = module.get<BattleService>(BattleService);
  });

  it('정의되어야 한다', () => {
    expect(service).toBeDefined();
  });

  describe('createBattle', () => {
    it('올바른 구조로 배틀을 생성해야 한다', async () => {
      const dto: CreateBattleDTO = {
        roomId: 'room-123',
        users: ['user-1', 'user-2'],
        config: {
          duration: 600,
        },
      };

      const result = await service.createBattle(dto);

      expect(result).toBeDefined();
      expect(result.battleId).toMatch(/^battle-\d+$/);
      expect(result.roomId).toBe('room-123');
      expect(result.status).toBe('running');
      expect(result.config.duration).toBe(600);
      expect(result.users).toHaveLength(2);
      expect(result.startedAt).toBeInstanceOf(Date);
    });

    it('올바른 초기 상태로 사용자를 생성해야 한다', async () => {
      const dto: CreateBattleDTO = {
        roomId: 'room-123',
        users: ['user-1'],
        config: {
          duration: 300,
        },
      };

      const result = await service.createBattle(dto);

      const user = result.users[0];
      expect(user.userId).toBe('user-1');
      expect(user.battleId).toBe(result.battleId);
      expect(user.code).toBe('');
      expect(user.language).toBe(BATTLE_CONFIG.DEFAULT_LANGUAGE);
      expect(user.progress.passedCount).toBe(0);
      expect(user.progress.totalCount).toBe(0);
      expect(user.isConnected).toBe(true);
      expect(user.isFinished).toBe(false);
    });

    it('duration이 제공되지 않으면 기본값을 사용해야 한다', async () => {
      const dto: CreateBattleDTO = {
        roomId: 'room-123',
        users: ['user-1'],
        config: {},
      };

      const result = await service.createBattle(dto);

      expect(result.config.duration).toBe(BATTLE_CONFIG.DURATION);
    });

    it('배틀을 Redis에 저장해야 한다', async () => {
      const dto: CreateBattleDTO = {
        roomId: 'room-123',
        users: ['user-1'],
        config: {
          duration: 300,
        },
      };

      const result = await service.createBattle(dto);

      expect(mockRedisService.createBattle).toHaveBeenCalledTimes(1);
      expect(mockRedisService.createBattle).toHaveBeenCalledWith(
        expect.objectContaining({
          battleId: result.battleId,
          roomId: 'room-123',
          status: 'running',
        })
      );
    });

    it('여러 사용자를 처리해야 한다', async () => {
      const dto: CreateBattleDTO = {
        roomId: 'room-123',
        users: ['user-1', 'user-2', 'user-3'],
        config: {
          duration: 300,
        },
      };

      const result = await service.createBattle(dto);

      expect(result.users).toHaveLength(3);
      expect(result.users[0].userId).toBe('user-1');
      expect(result.users[1].userId).toBe('user-2');
      expect(result.users[2].userId).toBe('user-3');

      result.users.forEach((user) => {
        expect(user.battleId).toBe(result.battleId);
      });
    });
  });
});

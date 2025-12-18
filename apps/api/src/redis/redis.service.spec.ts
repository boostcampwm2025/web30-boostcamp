/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';

import { Battle } from '../../../../packages/types/battle';
import { REDIS_CLIENT } from './redis.module';
import { RedisService } from './redis.service';

describe('RedisService', () => {
  let service: RedisService;
  let mockRedis: any;

  beforeEach(async () => {
    mockRedis = {
      set: jest.fn().mockResolvedValue('OK'),
      get: jest.fn(),
      del: jest.fn().mockResolvedValue(1),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: REDIS_CLIENT,
          useValue: mockRedis,
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('정의되어야 한다', () => {
    expect(service).toBeDefined();
  });

  describe('createBattle', () => {
    it('올바른 키로 배틀을 Redis에 저장해야 한다', async () => {
      const battle: Battle = {
        battleId: 'battle-123',
        roomId: 'room-456',
        status: 'running',
        config: {
          duration: 300,
        },
        startedAt: new Date('2025-01-01'),
        users: [
          {
            userId: 'user-1',
            battleId: 'battle-123',
            code: '',
            language: 'javascript',
            progress: {
              passedCount: 0,
              totalCount: 0,
            },
            isConnected: true,
            isFinished: false,
          },
        ],
      };

      await service.createBattle(battle);

      expect(mockRedis.set).toHaveBeenCalledTimes(2);
      expect(mockRedis.set).toHaveBeenCalledWith('battle:battle-123', JSON.stringify(battle));
      expect(mockRedis.set).toHaveBeenCalledWith('battle:room:room-456', 'battle-123');
    });

    it('Redis 실패 시 에러를 던져야 한다', async () => {
      mockRedis.set.mockRejectedValueOnce(new Error('Redis error'));

      const battle: Battle = {
        battleId: 'battle-123',
        roomId: 'room-456',
        status: 'running',
        config: { duration: 300 },
        startedAt: new Date(),
        users: [],
      };

      await expect(service.createBattle(battle)).rejects.toThrow('Redis error');
    });
  });

  describe('getBattle', () => {
    it('Redis에서 배틀을 조회해야 한다', async () => {
      const battle: Battle = {
        battleId: 'battle-123',
        roomId: 'room-456',
        status: 'running',
        config: { duration: 300 },
        startedAt: new Date('2025-01-01'),
        users: [],
      };

      mockRedis.get.mockResolvedValueOnce(JSON.stringify(battle));

      const result = await service.getBattle('battle-123');

      expect(mockRedis.get).toHaveBeenCalledWith('battle:battle-123');
      expect(result).toEqual({
        ...battle,
        startedAt: battle.startedAt!.toISOString(),
      });
    });

    it('배틀이 존재하지 않으면 null을 반환해야 한다', async () => {
      mockRedis.get.mockResolvedValueOnce(null);

      const result = await service.getBattle('non-existent-battle');

      expect(result).toBeNull();
    });
  });
});

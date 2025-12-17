export type BattleStatus = 'running' | 'completed';

export type BattleResult = 'win' | 'lose' | 'draw';

export interface Battle {
    battleId: string;
    roomId: string;
    status: BattleStatus;

    config: {
        duration: number;
    }
    startedAt?: Date;
    endedAt?: Date;

    users: BattleUser[];
}

export interface BattleUser {
    userId: string;
    code: string;
    language: string;

    progress: {
        passedCount: number;
        totalCount: number;
    };

    isConnected: boolean;
    isFinished: boolean;
    finishedAt?: Date;
    disconnectedAt?: Date;

    result?: BattleResult;
}
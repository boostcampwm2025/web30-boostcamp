export class RedisKeys {
  // Battle 관련
  static battle(battleId: string): string {
    return `battle:${battleId}`;
  }

  static battleByRoom(roomId: string): string {
    return `battle:room:${roomId}`;
  }
}
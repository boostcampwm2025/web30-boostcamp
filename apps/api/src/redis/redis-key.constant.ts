export class RedisKeys {
  // Battle 관련
  static battle(battleId: string): string {
    return `battle:${battleId}`;
  }

  static battleByRoom(roomId: string): string {
    return `battle:room:${roomId}`;
  }
  
  // Room 관련
  static room(roomId: string): string {
    return `room:${roomId}:info`;
  }
}

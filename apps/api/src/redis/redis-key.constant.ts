export class RedisKeys {
  // Room 관련
  static room(roomId: string): string {
    return `room:${roomId}:info`;
  }
}

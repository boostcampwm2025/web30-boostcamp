import { Module } from '@nestjs/common';

import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';

@Module({
  providers: [RoomService, RoomGateway],
})
export class RoomModule {}

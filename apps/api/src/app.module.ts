import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // 1. MySQL (TypeORM) 연결 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',      
      port: 3306,
      username: 'root',
      password: 'rootpassword', // docker-compose.yaml에 설정된 비밀번호
      database: 'nest_monorepo_db', // docker-compose.yaml에 설정된 DB 이름
      entities: [
        // 여기에 Entity 클래스들을 나열해야 합니다.
        // 예: User
      ],
      synchronize: true, // 개발 단계에서는 true (Entity와 DB 스키마 동기화)
      logging: ['error'], // 에러만 로그로 출력
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

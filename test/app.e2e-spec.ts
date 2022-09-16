import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '11072512',
          database: 'db_projeto_teste',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  // Inserir um tema no banco
  it('deve inserir um tema', async () => {
    let response = await request(app.getHttpServer())
      .post('/tema')
      .send({
        nome : 'Cavalo'
      })
      .expect(200)
  })

  // Parar a execução do programa de testes.
  afterAll(async () => {
    await app.close
  })
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { randomInt } from 'crypto';
import * as request from 'supertest';
import { setupApp } from '../src/setup-app';
import { AppModule } from './../src/app.module';

describe('Authentication System, (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setupApp(app);
    await app.init();
  });

  it('handles a signup request', () => {
    const email = `david${randomInt(0, 1000)}@web.de`;
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: email,
        password: 'alnwldkn',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
});

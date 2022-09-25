import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { randomInt } from 'crypto';
import * as request from 'supertest';
import { setupApp } from '../src/setup-app';
import { AppModule } from './../src/app.module';

describe('Authentication System, (e2e)', () => {
  let app: INestApplication;
  const email = `david${randomInt(0, 1000)}@we3b.de`;
  const password = 'password1';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setupApp(app);
    await app.init();
  });

  it('handles a signup request', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password,
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password })
      .expect(201);

    const cookie = response.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    console.log('body ', body);
    expect(body.email).toEqual(email);
  });
});

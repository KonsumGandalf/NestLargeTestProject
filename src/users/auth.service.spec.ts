import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

const hardCodeUser = {
  email: 'testUser@test.com',
  password: 'test123',
};

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    // fake UserService
    const fakeUserService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as unknown as User);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of auth service ', async () => {
    expect(service).toBeDefined();
  }, 0.1);

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup(
      hardCodeUser.email,
      hardCodeUser.password,
    );
    expect(user.password).not.toEqual(hardCodeUser.password);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws error if user signs up with email that is in use', async (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: hardCodeUser.email,
          password: hardCodeUser.password,
        } as any as User,
      ]);
    try {
      await service.signup(hardCodeUser.email, hardCodeUser.password);
    } catch (err) {
      done();
    }
  });
});

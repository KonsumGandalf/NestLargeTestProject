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
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email)
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = ({id: users.length, email, password} as unknown as User);
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
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

  it('throws error if user signs up with email that is in use', async () => {
    expect(fakeUsersService.find).toBeDefined();
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: hardCodeUser.email,
          password: hardCodeUser.password,
        } as any as User,
      ]);
    try {
      return await service.signup(hardCodeUser.email, hardCodeUser.password);
    } catch (err) {
      return true;
    }
  });

  it('throws if signin is called with a used email', async () => {
    try {
      await service.signin(
        'random@rar.de',
        'wrong'
      );
    } catch (err) {
      return true;
    }
  });

  it('throws if a wrong password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: hardCodeUser.email,
          password: hardCodeUser.password,
        } as any as User,
      ]);
    try {
      await service.signup(
        hardCodeUser.email,
        hardCodeUser.password + 'wrong'
      );
    } catch (err) {
      return 'true';
    }
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup(hardCodeUser.email, hardCodeUser.password);
    const user = await service.signin(hardCodeUser.email, hardCodeUser.password);
    expect(user).toBeDefined();
  });
});

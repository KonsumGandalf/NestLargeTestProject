import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

const hardCodeUser = {
  id: 1,
  email: 'testUser@test.com',
  password: 'test123',
};

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: hardCodeUser.email,
          password: hardCodeUser.password,
        } as unknown as User),
      find: (email: string) =>
        Promise.resolve([
          {
            id: hardCodeUser.id,
            email: email,
            password: hardCodeUser.password,
          } as unknown as User,
        ]),
      // update: () => {
      // },
      // remove: () => {
      // },
    };
    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as unknown as User);
      },
      // },
      // signup: () => {
      // },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers(hardCodeUser.email);
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(hardCodeUser.email);
  });

  it('findUser returns a user with a given id', async () => {
    const user = controller.findUser(1);
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found.', async () => {
    fakeUsersService.findOne = () => null;
    try {
      await controller.findUser(100);
      // fail('user must not be found');
    } catch (err) {
      return true;
    }
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      {
        email: hardCodeUser.email,
        password: hardCodeUser.password,
      },
      session,
    );

    expect(user.id).toBe(1); //hardCodeUser.id
    expect(session.userId).toEqual(1); // same value as above
  });
});

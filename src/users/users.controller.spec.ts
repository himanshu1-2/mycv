import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService:Partial<UsersService>
  let fakeAuthService:Partial<AuthService>
  beforeEach(async () => {
    fakeAuthService={
      //signup:()=>{},
      signin:(email:string,password:string)=>{
        return Promise.resolve({id:1,email,password}as User)
      }
    }
    fakeUsersService={
      findOne:(id:number)=>{
        return Promise.resolve({id,email:'asadf@g.com',password:'asdf'} as User)
      },
      find:(email:string)=>{
        return Promise.resolve([{id:1,email,password:'asdf'} as User] )
      },
      //remove:()=>{},
      //update:()=>{}
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[{
        provide:UsersService,
        useValue:fakeUsersService
      },{

          provide:AuthService,
          useValue:fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('find all users return list of user with given email',async()=>{
     const users = await controller.findAllUsers('asdf@g.com')
     expect(users.length).toEqual(1)
     expect(users[0].email).toEqual('asdf@g.com')
  })
  it('findUser returns a single user with the given id',async()=>{
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
  })

  it('findUser throw error if given id is not found',async()=>{
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
  })

  it('signin updates session object and return user',async()=>{
    const session={userId:-10};
    const user =await controller.signin({email:'asdf@g.com',password:'asdf'},session)
    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  })
});



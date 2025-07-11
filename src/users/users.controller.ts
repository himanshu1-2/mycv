import { Body, Controller,Param,Post,Get,Query , Delete,Patch, UseInterceptors, Session} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';


@Controller('auth')
@Serialize(UserDto)
export class UsersController {
constructor(private usersService:UsersService,
    private authService:AuthService
){}

@Get('/whoami')
whoAmI(@CurrentUser() user:User){
   return user
}

@Post('/signout')
signOut(@Session()session:any){
  session.userId = null
}

@Post('/signup')
async createUser(@Body() body:CreateUserDto, @Session() session:any){
  const user= await this.authService.signup(body.email,body.password)
  session.userId = user.id
  return user
}


@Post('/signin')
async signin(@Body() body:CreateUserDto,@Session() session:any){
  const user= await this.authService.signin(body.email,body.password)
  session.userId = user.id
  console.log('session',session)
  return user
}

@Get('/:id')
findUser(@Param('id') id:string){
    return this.usersService.findOne(parseInt(id))
}

@Get()
findAllUsers(@Query('email')email:string){
  return this.usersService.find(email)
}

@Delete('/:id')
remove(@Param('id')id:string){
    return this.usersService.remove(parseInt(id))
}

@Patch('/:id')
updateUser(@Param('id')id:string,@Body() body:UpdateUserDto){
  return this.usersService.update(parseInt(id),body)
}

}

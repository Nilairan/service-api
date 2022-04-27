import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/role/role.model';
import { RoleModule } from 'src/role/role.module';
import { UserRole } from 'src/role/user_role.model';
import { Station } from 'src/station/station.model';
import { StationModule } from 'src/station/station.module';
import { StationService } from 'src/station/station.service';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole, Station]),
    RoleModule,
    forwardRef(() => AuthModule),
    forwardRef(() => StationModule)
  ],
  exports: [UserService]
})
export class UserModule {}

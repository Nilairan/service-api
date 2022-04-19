import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { RoleController } from './role.controller';
import { Role } from './role.model';
import { RoleService } from './role.service';
import { UserRole } from './user_role.model';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRole]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule)
  ],
  exports: [RoleService]
})
export class RoleModule {}

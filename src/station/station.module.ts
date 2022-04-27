import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/role.module';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { StationController } from './station.controller';
import { Station } from './station.model';
import { StationService } from './station.service';

@Module({
  controllers: [StationController],
  providers: [StationService],
  imports: [
    SequelizeModule.forFeature([Station, User]),
    RoleModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule)
  ],
  exports: [StationService]
})
export class StationModule {}

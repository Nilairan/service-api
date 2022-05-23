import { Module, forwardRef } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './client.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [ClientService],
  controllers: [ClientController],
  imports:[
    SequelizeModule.forFeature([Client]),
    RoleModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule)
  ],
  exports: [ClientService]
})
export class ClientModule {}

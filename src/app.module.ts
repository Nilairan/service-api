import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.model';
import { UserRole } from './role/user_role.model';
import { AuthModule } from './auth/auth.module';
import { StationModule } from './station/station.module';
import { Station } from './station/station.model';
import { CarModule } from './car/car.module';
import { Car } from './car/car.model';
import { ClientModule } from './client/client.module';
import { Client } from './client/client.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRole, Station, Car, Client],
      autoLoadModels: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    StationModule,
    CarModule,
    ClientModule
  ]
})
export class AppModule {}

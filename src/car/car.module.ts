import { forwardRef, Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './car.model';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [CarService],
  controllers: [CarController],
  imports: [
    SequelizeModule.forFeature([Car]),
    RoleModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule)
  ]
})
export class CarModule {}

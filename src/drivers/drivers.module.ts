import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Driver } from './entities/driver.entity';

@Module({
  imports: [TypegooseModule.forFeature([Driver])],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule {}

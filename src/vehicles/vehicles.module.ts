import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [TypegooseModule.forFeature([Vehicle])],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule {}

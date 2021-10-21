import { Module } from '@nestjs/common'
import { UtilizationService } from './utilization.service'
import { UtilizationController } from './utilization.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { Utilization } from './entities/utilization.entity'
import { Driver } from 'src/drivers/entities/driver.entity'
import { Vehicle } from 'src/vehicles/entities/vehicle.entity'

@Module({
  imports: [TypegooseModule.forFeature([Utilization, Driver, Vehicle])],
  controllers: [UtilizationController],
  providers: [UtilizationService],
})
export class UtilizationModule {}

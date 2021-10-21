import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { I18nModule } from 'nestjs-i18n'
import { TypegooseModule } from 'nestjs-typegoose'
import { typeGooseConfig } from './typeGooseConfig'
import { i18nOptions } from './i18nConfig'
import { VehiclesModule } from './vehicles/vehicles.module';
import { DriversModule } from './drivers/drivers.module';
import { UtilizationModule } from './utilization/utilization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypegooseModule.forRoot(process.env.DB_HOST, typeGooseConfig),
    I18nModule.forRoot(i18nOptions),
    VehiclesModule,
    DriversModule,
    UtilizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

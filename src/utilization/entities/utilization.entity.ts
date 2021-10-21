import {
  pre,
  prop,
  modelOptions,
  mongoose,
  Severity,
} from '@typegoose/typegoose'
import { IsDateString } from 'class-validator'
import { Date } from 'mongoose'
import { Driver } from 'src/drivers/entities/driver.entity'
import { Vehicle } from 'src/vehicles/entities/vehicle.entity'
import { Ref } from 'typegoose'

@modelOptions({
  schemaOptions: {
    collection: 'utilizations',
    timestamps: { createdAt: true, updatedAt: true },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<Utilization>('save', async function (next) {
  if (this._id === undefined || this._id === null) {
    this._id = mongoose.Types.ObjectId()
  }

  next()
})
export class Utilization {
  @prop()
  _id?: mongoose.Types.ObjectId

  @IsDateString()
  @prop({ nullable: false })
  dataInicio?: Date

  @IsDateString()
  @prop({ nullable: true })
  dataFinal?: Date

  @prop({ nullable: false, ref: Driver, autopopulate: true })
  motorista?: Ref<Driver>

  @prop({ nullable: false, ref: Vehicle, autopopulate: true })
  veiculo?: Ref<Vehicle>

  @prop({ nullable: false })
  motivo?: string

  constructor(utilization?: Partial<Utilization>) {
    this._id = utilization?._id
    this.dataInicio = utilization?.dataInicio
    this.dataFinal = utilization?.dataFinal
    this.motorista = utilization?.motorista
    this.veiculo = utilization?.veiculo
    this.motivo = utilization?.motivo
  }
}

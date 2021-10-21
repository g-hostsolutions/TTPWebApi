import {
  pre,
  prop,
  modelOptions,
  mongoose,
  Severity,
} from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    collection: 'vehicles',
    timestamps: { createdAt: true, updatedAt: true }
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<Vehicle>('save', async function (next) {
  if (this._id === undefined || this._id === null) {
    this._id = mongoose.Types.ObjectId()
  }

  next()
})
export class Vehicle {
  @prop()
  _id?: mongoose.Types.ObjectId

  @prop({ nullable: false })
  placa?: string

  @prop({ nullable: false })
  cor?: string

  @prop({ nullable: false })
  marca?: string

  constructor(vehicle?: Partial<Vehicle>) {
    this._id = vehicle?._id;
    this.placa = vehicle?.placa;
    this.cor = vehicle?.cor;
    this.marca = vehicle?.marca;
  }
}

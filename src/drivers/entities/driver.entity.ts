import {
  pre,
  prop,
  modelOptions,
  mongoose,
  Severity,
} from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    collection: 'drivers',
    timestamps: { createdAt: true, updatedAt: true }
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<Driver>('save', async function (next) {
  if (this._id === undefined || this._id === null) {
    this._id = mongoose.Types.ObjectId()
  }

  next()
})
export class Driver {
  @prop()
  _id?: mongoose.Types.ObjectId

  @prop({ nullable: false })
  nome?: string

  constructor(vehicle?: Partial<Driver>) {
    this._id = vehicle?._id;
    this.nome = vehicle?.nome;
  }
}

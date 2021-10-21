import { BadRequestException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { Vehicle } from './entities/vehicle.entity'

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle)
    private readonly vehiclesModel: ReturnModelType<typeof Vehicle>,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {
    try {
      const newVehicle = new this.vehiclesModel(createVehicleDto)
      return newVehicle.save()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  findAll(vehicle?: UpdateVehicleDto) {
    try {
      let query: {
        marca?: string | { $regex: string }
        cor?: string | { $regex: string }
      } = {}

      if (vehicle.marca) {
        const regex = { $regex: `.*${vehicle.marca}.*` }
        query = { marca: regex }
      }

      if (vehicle.cor) {
        const regex = { $regex: `.*${vehicle.cor}.*` }
        query.cor = regex
      }

      return this.vehiclesModel.find(query).exec()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  findOne(id: string) {
    try {
      return this.vehiclesModel.findOne({ _id: id }).exec()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    try {
      return this.vehiclesModel
        .findOneAndUpdate({ _id: id }, updateVehicleDto, { new: true })
        .exec()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  remove(id: string) {
    try {
      return this.vehiclesModel.deleteOne({ _id: id }).exec()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}

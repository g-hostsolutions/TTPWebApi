import { BadRequestException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CreateDriverDto } from './dto/create-driver.dto'
import { UpdateDriverDto } from './dto/update-driver.dto'
import { Driver } from './entities/driver.entity'

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Driver)
    private readonly driversModel: ReturnModelType<typeof Driver>,
  ) {}

  create(createDriverDto: CreateDriverDto) {
    try {
      const newDriver = new this.driversModel(createDriverDto)
      return newDriver.save()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  findAll() {
    try {
      return this.driversModel.find()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  findOne(id: string) {
    try {
      return this.driversModel.findOne({ _id: id })
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  update(id: string, updateDriverDto: UpdateDriverDto) {
    try {
      return this.driversModel.findOneAndUpdate({ _id: id }, updateDriverDto)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  remove(id: string) {
    try {
      return this.driversModel.deleteOne({ _id: id })
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}

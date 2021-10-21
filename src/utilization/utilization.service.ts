import { BadRequestException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { Driver } from 'src/drivers/entities/driver.entity'
import { Vehicle } from 'src/vehicles/entities/vehicle.entity'
import { CreateUtilizationDto } from './dto/create-utilization.dto'
import { UpdateUtilizationDto } from './dto/update-utilization.dto'
import { Utilization } from './entities/utilization.entity'

@Injectable()
export class UtilizationService {
  constructor(
    @InjectModel(Utilization)
    private readonly utilizationModel: ReturnModelType<typeof Utilization>,
    @InjectModel(Driver)
    private readonly driversModel: ReturnModelType<typeof Driver>,
    @InjectModel(Vehicle)
    private readonly vehiclesModel: ReturnModelType<typeof Vehicle>,
  ) {}

  // Valida a existência do motorista e do veículo no DB
  async checkExistency(createUtilizationDto: CreateUtilizationDto) {
    try {
      const driverExists = await this.driversModel.findById(
        createUtilizationDto.motorista,
      )

      if (!driverExists) throw new BadRequestException('Motorista inexistente!')

      const vehicleExists = await this.vehiclesModel.findById(
        createUtilizationDto.veiculo,
      )

      if (!vehicleExists) throw new BadRequestException('Veículo inexistente!')
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  // Valida se o motorista ou veículo já se encontra alocado no período
  async checkAllocation(
    createUtilizationDto: CreateUtilizationDto,
    id?: string,
  ) {
    try {
      const or: any = [
        {
          dataInicio: { $lte: createUtilizationDto.dataInicio },
          dataFinal: { $eq: null },
        },
        {
          dataInicio: { $lte: createUtilizationDto.dataInicio },
          dataFinal: { $gte: createUtilizationDto.dataInicio },
        },
      ]

      if (createUtilizationDto.dataFinal)
        or.push({
          dataInicio: { $lte: createUtilizationDto.dataFinal },
          dataFinal: { $gte: createUtilizationDto.dataFinal },
        })

      const query: any = {
        motorista: createUtilizationDto.motorista,
      }

      if (id) query._id = { $ne: id }

      query.$or = or

      const driverHasOtherVehicle = await this.utilizationModel.find(query)

      if (driverHasOtherVehicle.length)
        throw new BadRequestException(
          'Motorista já se encontra alocado com outro veículo no perídodo!',
        )

      const queryVehicle: any = {
        veiculo: createUtilizationDto.veiculo,
        dataInicio: { $lte: createUtilizationDto.dataInicio },
      }

      if (id) queryVehicle._id = { $ne: id }

      queryVehicle.$or = or

      const vehicleHasOtherDriver = await this.utilizationModel.find(
        queryVehicle,
      )

      if (vehicleHasOtherDriver.length)
        throw new BadRequestException(
          'Veículo já se encontra alocado com outro motorista no período!',
        )
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async create(createUtilizationDto: CreateUtilizationDto) {
    try {
      if (createUtilizationDto.dataFinal <= createUtilizationDto.dataInicio)
        throw new BadRequestException(
          'A data final não poderá ser menos que a data de início',
        )

      await this.checkExistency(createUtilizationDto)
      await this.checkAllocation(createUtilizationDto)
      const newUtilization = new this.utilizationModel(createUtilizationDto)
      return newUtilization.save()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  findAll() {
    try {
      return this.utilizationModel
        .find()
        .populate({
          path: 'motorista',
          populate: {
            path: 'motorista',
            model: 'drivers',
          },
        })
        .populate({
          path: 'veiculo',
          populate: {
            path: 'veiculo',
            model: 'vehicles',
          },
        })
        .populate('drivers vehicles')
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  findOne(id: string) {
    try {
      return this.utilizationModel
        .findOne({ _id: id })
        .populate({
          path: 'motorista',
          populate: {
            path: 'motorista',
            model: 'drivers',
          },
        })
        .populate({
          path: 'veiculo',
          populate: {
            path: 'veiculo',
            model: 'vehicles',
          },
        })
        .populate('drivers vehicles')
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async update(id: string, updateUtilizationDto: UpdateUtilizationDto) {
    try {
      const dataFinal = JSON.parse(
        JSON.stringify(updateUtilizationDto.dataFinal),
      )

      const utilization = await this.utilizationModel.findOne({ _id: id })

      if (!utilization)
        throw new BadRequestException('A utilização informada não existe!')

      if (
        new Date(dataFinal.toString()) <=
        new Date(utilization.dataInicio.toString())
      )
        throw new BadRequestException(
          'A data final não poderá ser menos que a data de início',
        )

      await this.checkAllocation(
        {
          dataFinal,
          dataInicio: new Date(utilization.dataInicio.toString()),
          motorista: utilization.motorista.toString(),
          veiculo: utilization.veiculo.toString(),
          motivo: '',
        },
        utilization._id.toString(),
      )

      return this.utilizationModel.findOneAndUpdate(
        { _id: id },
        { dataFinal },
        { new: true },
      )
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  remove(id: string) {
    try {
      return this.utilizationModel.deleteOne({ _id: id })
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}

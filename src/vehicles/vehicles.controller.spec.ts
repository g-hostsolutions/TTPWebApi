import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ObjectId } from 'bson'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { Vehicle } from './entities/vehicle.entity'
import { VehiclesController } from './vehicles.controller'
import { VehiclesService } from './vehicles.service'

const vehiclesEntityList: Vehicle[] = [
  new Vehicle({
    _id: new ObjectId('61707079af0c8142e2f9b512'),
    placa: '123',
    cor: 'azul',
    marca: 'voyagem',
  }),
  new Vehicle({
    _id: new ObjectId('61707079af0c8142e2f9b513'),
    placa: '145',
    cor: 'verde',
    marca: 'gol',
  }),
  new Vehicle({
    _id: new ObjectId('61707079af0c8142e2f9b514'),
    placa: '167',
    cor: 'branco',
    marca: 'CRV',
  }),
]

const newVehicleEntity = new Vehicle({
  _id: new ObjectId('61707079af0c8142e2f9b512'),
  placa: '123',
  cor: 'azul',
  marca: 'voyagem',
})

const updatedVehicleEntity = new Vehicle({
  _id: new ObjectId('61707079af0c8142e2f9b512'),
  placa: '123',
  cor: 'verde',
  marca: 'voyagem',
})

describe('VehiclesController', () => {
  let vehicleController: VehiclesController
  let vehicleService: VehiclesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        {
          provide: VehiclesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(vehiclesEntityList),
            create: jest.fn().mockResolvedValue(newVehicleEntity),
            findOne: jest.fn().mockResolvedValue(vehiclesEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedVehicleEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile()

    vehicleController = module.get<VehiclesController>(VehiclesController)
    vehicleService = module.get<VehiclesService>(VehiclesService)
  })

  it('should be defined', () => {
    expect(vehicleController).toBeDefined()
    expect(vehicleService).toBeDefined()
  })

  describe('findAll', () => {
    it('should return a vehicle list entity successfully', async () => {
      // Act
      const result = await vehicleController.findAll()

      // Assert
      expect(result).toEqual(vehiclesEntityList)
      expect(typeof result).toEqual('object')
      expect(vehicleService.findAll).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(vehicleService, 'findAll')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(vehicleController.findAll()).rejects.toThrowError()
    })
  })

  describe('create', () => {
    it('should create a new vehicle item successfully', async () => {
      // Arrange
      const body: CreateVehicleDto = {
        placa: '123',
        cor: 'azul',
        marca: 'voyagem',
      }

      // Act
      const result = await vehicleController.create(body)

      // Assert
      expect(result).toEqual(newVehicleEntity)
      expect(vehicleService.create).toHaveBeenCalledTimes(1)
      expect(vehicleService.create).toHaveBeenCalledWith(body)
    })

    it('should throw an exception', () => {
      // Arrange
      const body: CreateVehicleDto = {
        placa: '123',
        cor: 'azul',
        marca: 'voyagem',
      }

      jest
        .spyOn(vehicleService, 'create')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(vehicleController.create(body)).rejects.toThrowError()
    })
  })

  describe('find', () => {
    it('should get a vehicle item successfully', async () => {
      // Act
      const result = await vehicleController.findOne('61707079af0c8142e2f9b512')

      // Assert
      expect(result).toEqual(vehiclesEntityList[0])
      expect(vehicleService.findOne).toHaveBeenCalledTimes(1)
      expect(vehicleService.findOne).toHaveBeenCalledWith('61707079af0c8142e2f9b512')
    })

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(vehicleService, 'findOne')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(vehicleController.findOne('61707079af0c8142e2f9b512')).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('should update a vehicle item successfully', async () => {
      // Arrange
      const body: UpdateVehicleDto = {
        placa: '123',
        cor: 'verde',
        marca: 'voyagem',
      }

      // Act
      const result = await vehicleController.update('61707079af0c8142e2f9b512', body)

      // Assert
      expect(result).toEqual(updatedVehicleEntity)
      expect(vehicleService.update).toHaveBeenCalledTimes(1)
      expect(vehicleService.update).toHaveBeenCalledWith('61707079af0c8142e2f9b512', body)
    })

    it('should throw an exception', () => {
      // Arrange
      const body: UpdateVehicleDto = {
        placa: '123',
        cor: 'verde',
        marca: 'voyagem',
      }

      jest
        .spyOn(vehicleService, 'update')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(vehicleController.update('61707079af0c8142e2f9b512', body)).rejects.toThrowError()
    })
  })

  describe('remove', () => {
    it('should remove a vehicle item successfully', async () => {
      // Act
      const result = await vehicleController.remove('61707079af0c8142e2f9b512')

      // Assert
      expect(result).toBeUndefined()
    })

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(vehicleService, 'remove')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(vehicleController.remove('61707079af0c8142e2f9b512')).rejects.toThrowError()
    })
  })
})

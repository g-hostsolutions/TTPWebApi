import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ObjectId } from 'bson'
import { DriversController } from './drivers.controller'
import { DriversService } from './drivers.service'
import { CreateDriverDto } from './dto/create-driver.dto'
import { UpdateDriverDto } from './dto/update-driver.dto'
import { Driver } from './entities/driver.entity'

const driversEntityList: Driver[] = [
  new Driver({
    _id: new ObjectId('61707079af0c8142e2f9b512'),
    nome: 'Luis Felippe',
  }),
  new Driver({
    _id: new ObjectId('61707079af0c8142e2f9b513'),
    nome: 'Andre Nascimento',
  }),
  new Driver({
    _id: new ObjectId('61707079af0c8142e2f9b514'),
    nome: 'João Barboza',
  }),
]

const newDriversEntity = new Driver({
  _id: new ObjectId('61707079af0c8142e2f9b512'),
  nome: 'Luis Felippe',
})

const updatedDriversEntity = new Driver({
  _id: new ObjectId('61707079af0c8142e2f9b512'),
  nome: 'Luis Felippe Braga',
})

describe('DriversController', () => {
  let driversController: DriversController
  let driversService: DriversService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversController],
      providers: [
        {
          provide: DriversService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(driversEntityList),
            create: jest.fn().mockResolvedValue(newDriversEntity),
            findOne: jest.fn().mockResolvedValue(driversEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedDriversEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile()

    driversController = module.get<DriversController>(DriversController)
    driversService = module.get<DriversService>(DriversService)
  })

  it('should be defined', () => {
    expect(driversController).toBeDefined()
    expect(driversService).toBeDefined()
  })

  describe('findAll', () => {
    it('should return a driver list entity successfully', async () => {
      // Act
      const result = await driversController.findAll()

      // Assert
      expect(result).toEqual(driversEntityList)
      expect(typeof result).toEqual('object')
      expect(driversService.findAll).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(driversService, 'findAll')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(driversController.findAll()).rejects.toThrowError()
    })
  })

  describe('create', () => {
    it('should create a new driver item successfully', async () => {
      // Arrange
      const body: CreateDriverDto = {
        nome: 'Luis Felippe',
      }

      // Act
      const result = await driversController.create(body)

      // Assert
      expect(result).toEqual(newDriversEntity)
      expect(driversService.create).toHaveBeenCalledTimes(1)
      expect(driversService.create).toHaveBeenCalledWith(body)
    })

    it('should throw an exception', () => {
      // Arrange
      const body: CreateDriverDto = {
        nome: 'Luis Felippe',
      }

      jest
        .spyOn(driversService, 'create')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(driversController.create(body)).rejects.toThrowError()
    })
  })

  describe('find', () => {
    it('should get a driver item successfully', async () => {
      // Act
      const result = await driversController.findOne('61707079af0c8142e2f9b512')

      // Assert
      expect(result).toEqual(driversEntityList[0])
      expect(driversService.findOne).toHaveBeenCalledTimes(1)
      expect(driversService.findOne).toHaveBeenCalledWith(
        '61707079af0c8142e2f9b512',
      )
    })

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(driversService, 'findOne')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(
        driversController.findOne('61707079af0c8142e2f9b512'),
      ).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('should update a driver item successfully', async () => {
      // Arrange
      const body: UpdateDriverDto = {
        nome: 'Luis Felippe Braga',
      }

      // Act
      const result = await driversController.update(
        '61707079af0c8142e2f9b512',
        body,
      )

      // Assert
      expect(result).toEqual(updatedDriversEntity)
      expect(driversService.update).toHaveBeenCalledTimes(1)
      expect(driversService.update).toHaveBeenCalledWith(
        '61707079af0c8142e2f9b512',
        body,
      )
    })

    it('should throw an exception', () => {
      // Arrange
      const body: UpdateDriverDto = {
        nome: 'Luis Felippe Braga',
      }

      jest
        .spyOn(driversService, 'update')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(
        driversController.update('61707079af0c8142e2f9b512', body),
      ).rejects.toThrowError()
    })
  })

  describe('remove', () => {
    it('should remove a driver item successfully', async () => {
      // Act
      const result = await driversController.remove('61707079af0c8142e2f9b512')

      // Assert
      expect(result).toBeUndefined()
    })

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(driversService, 'remove')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(
        driversController.remove('61707079af0c8142e2f9b512'),
      ).rejects.toThrowError()
    })
  })
})

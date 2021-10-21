import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ObjectId } from 'mongodb'
import { CreateUtilizationDto } from './dto/create-utilization.dto'
import { UpdateUtilizationDto } from './dto/update-utilization.dto'
import { Utilization } from './entities/utilization.entity'
import { UtilizationController } from './utilization.controller'
import { UtilizationService } from './utilization.service'

const utilizationEntityList: Utilization[] = [
  new Utilization({
    _id: new ObjectId('61707079af0c8142e2f9b512'),
    dataInicio: JSON.parse(JSON.stringify('2021-07-04')),
    motorista: '61717e885ff93a57537afd57',
    veiculo: '61707079af0c8142e2f9b512',
    motivo: 'Foi comprar pão.',
    dataFinal: JSON.parse(JSON.stringify('2021-07-10')),
  }),
]

const newUtilizationEntity = new Utilization({
  _id: new ObjectId('61707079af0c8142e2f9b512'),
  dataInicio: JSON.parse(JSON.stringify('2021-07-04')),
  motorista: '61717e885ff93a57537afd57',
  veiculo: '61707079af0c8142e2f9b512',
  motivo: 'Foi comprar pão.',
})

const updatedUtilizationEntity = new Utilization({
  _id: new ObjectId('61707079af0c8142e2f9b512'),
  dataInicio: JSON.parse(JSON.stringify('2021-07-04')),
  motorista: '61717e885ff93a57537afd57',
  veiculo: '61707079af0c8142e2f9b512',
  motivo: 'Foi comprar pão.',
  dataFinal: JSON.parse(JSON.stringify('2021-07-10')),
})

describe('UtilizationController', () => {
  let utilizationController: UtilizationController
  let utilizationService: UtilizationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilizationController],
      providers: [
        {
          provide: UtilizationService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(utilizationEntityList),
            create: jest.fn().mockResolvedValue(newUtilizationEntity),
            findOne: jest.fn().mockResolvedValue(utilizationEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedUtilizationEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile()

    utilizationController = module.get<UtilizationController>(
      UtilizationController,
    )
    utilizationService = module.get<UtilizationService>(UtilizationService)
  })

  it('should be defined', () => {
    expect(utilizationController).toBeDefined()
    expect(utilizationService).toBeDefined()
  })

  describe('findAll', () => {
    it('should return a utilization list entity successfully', async () => {
      // Act
      const result = await utilizationController.findAll()

      // Assert
      expect(result).toEqual(utilizationEntityList)
      expect(typeof result).toEqual('object')
      expect(utilizationService.findAll).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(utilizationService, 'findAll')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(utilizationController.findAll()).rejects.toThrowError()
    })
  })

  describe('create', () => {
    it('should create a new utilization item successfully', async () => {
      // Arrange
      const body: CreateUtilizationDto = {
        dataInicio: JSON.parse(JSON.stringify('2021-07-04')),
        motorista: '61717e885ff93a57537afd57',
        veiculo: '61707079af0c8142e2f9b512',
        motivo: 'Foi comprar pão.',
      }

      // Act
      const result = await utilizationController.create(body)

      // Assert
      expect(result).toEqual(newUtilizationEntity)
      expect(utilizationService.create).toHaveBeenCalledTimes(1)
      expect(utilizationService.create).toHaveBeenCalledWith(body)
    })

    it('should throw an exception', () => {
      // Arrange
      const body: CreateUtilizationDto = {
        dataInicio: JSON.parse(JSON.stringify('2021-07-04')),
        motorista: '61717e885ff93a57537afd57',
        veiculo: '61707079af0c8142e2f9b512',
        motivo: 'Foi comprar pão.',
      }

      jest
        .spyOn(utilizationService, 'create')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(utilizationController.create(body)).rejects.toThrowError()
    })
  })

  describe('find', () => {
    it('should get a utilization item successfully', async () => {
      // Act
      const result = await utilizationController.findOne(
        '61707079af0c8142e2f9b512',
      )

      // Assert
      expect(result).toEqual(utilizationEntityList[0])
      expect(utilizationService.findOne).toHaveBeenCalledTimes(1)
      expect(utilizationService.findOne).toHaveBeenCalledWith(
        '61707079af0c8142e2f9b512',
      )
    })

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(utilizationService, 'findOne')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(
        utilizationController.findOne('61707079af0c8142e2f9b512'),
      ).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('should update a utilization item successfully', async () => {
      // Arrange
      const body: UpdateUtilizationDto = {
        dataFinal: JSON.parse(JSON.stringify('2021-07-10')),
      }

      // Act
      const result = await utilizationController.update(
        '61707079af0c8142e2f9b512',
        body,
      )

      // Assert
      expect(result).toEqual(updatedUtilizationEntity)
      expect(utilizationService.update).toHaveBeenCalledTimes(1)
      expect(utilizationService.update).toHaveBeenCalledWith(
        '61707079af0c8142e2f9b512',
        body,
      )
    })

    it('should throw an exception', () => {
      // Arrange
      const body: UpdateUtilizationDto = {
        dataFinal: JSON.parse(JSON.stringify('2021-07-10')),
      }

      jest
        .spyOn(utilizationService, 'update')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(
        utilizationController.update('61707079af0c8142e2f9b512', body),
      ).rejects.toThrowError()
    })
  })

  describe('remove', () => {
    it('should remove a utilization item successfully', async () => {
      // Act
      const result = await utilizationController.remove(
        '61707079af0c8142e2f9b512',
      )

      // Assert
      expect(result).toBeUndefined()
    })

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(utilizationService, 'remove')
        .mockRejectedValueOnce(new BadRequestException())

      // Assert
      expect(
        utilizationController.remove('61707079af0c8142e2f9b512'),
      ).rejects.toThrowError()
    })
  })
})

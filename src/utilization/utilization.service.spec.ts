import { Test, TestingModule } from '@nestjs/testing'
import { ObjectId } from 'mongodb'
import { Utilization } from './entities/utilization.entity'
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
  dataFinal: JSON.parse(JSON.stringify('2021-07-10')),
})

const updatedUtilizationEntity = new Utilization({
  _id: new ObjectId('61707079af0c8142e2f9b512'),
  dataInicio: JSON.parse(JSON.stringify('2021-07-04')),
  motorista: '61717e885ff93a57537afd57',
  veiculo: '61707079af0c8142e2f9b512',
  motivo: 'Foi comprar leite.',
  dataFinal: JSON.parse(JSON.stringify('2021-07-10')),
})

describe('UtilizationService', () => {
  let service: UtilizationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UtilizationService>(UtilizationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

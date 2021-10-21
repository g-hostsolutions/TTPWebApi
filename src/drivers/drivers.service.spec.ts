import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { DriversService } from './drivers.service';
import { Driver } from './entities/driver.entity';

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

describe('DriversService', () => {
  let service: DriversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<DriversService>(DriversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

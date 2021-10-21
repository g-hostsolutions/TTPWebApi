import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';

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

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

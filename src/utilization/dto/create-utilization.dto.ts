import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUtilizationDto {
  @IsNotEmpty()
  @IsDateString()
  readonly dataInicio: Date

  @IsOptional()
  @IsDateString()
  readonly dataFinal?: Date

  @IsNotEmpty()
  @IsString()
  readonly motorista: string

  @IsNotEmpty()
  @IsString()
  readonly veiculo: string

  @IsNotEmpty()
  @IsString()
  readonly motivo: string
}

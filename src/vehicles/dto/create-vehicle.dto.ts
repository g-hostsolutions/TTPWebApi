import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly placa: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly cor: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly marca: string
}

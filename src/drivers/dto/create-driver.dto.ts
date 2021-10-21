import { IsNotEmpty, IsString } from "class-validator"

export class CreateDriverDto {
  @IsNotEmpty()
  @IsString()
  readonly nome: string
}

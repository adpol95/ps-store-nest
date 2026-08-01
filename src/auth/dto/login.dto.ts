import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "johndoe1234",
    description: "Login of the user",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: "password123",
    description: "Password of the user",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

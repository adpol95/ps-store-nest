import {
  IsString,
  MinLength,
  IsDateString,
  IsOptional,
  IsNumber,
  IsEmail,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "John Doe",
    description: "Name of the user",
    required: true,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: "password123",
    description: "Password of the user",
    required: true,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: "2000-01-01T00:00:00.000Z",
    description: "Date of birth of the user",
    required: true,
  })
  @IsDateString()
  birthDay: Date;

  @ApiProperty({
    example: "https://example.com/avatar.jpg",
    description: "Avatar URL of the user",
    required: false,
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({
    example: "USA",
    description: "Country of the user",
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    example: 100,
    description: "Balance of the user",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiProperty({
    example: "example@example.com",
    description: "Email of the user",
    required: true,
  })
  @IsEmail()
  email: string;
}

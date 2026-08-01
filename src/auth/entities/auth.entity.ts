import { ApiProperty } from "@nestjs/swagger";

export class Auth {
  @ApiProperty()
  id: string;

  @ApiProperty()
  token: string;

  constructor(partial: Partial<Auth>) {
    Object.assign(this, partial);
  }
}

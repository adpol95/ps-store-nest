import { Exclude } from "class-transformer";

export class UserEntity {
  id: string;
  name: string;
  email: string;
  country?: string | null;
  avatarUrl?: string | null;
  birthDay: Date;
  balance: number;
  isOnline: boolean;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

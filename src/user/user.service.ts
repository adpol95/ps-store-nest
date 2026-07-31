import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const res = await this.prisma.user.create({ data: createUserDto });
    return new UserEntity(res);
  }

  async findAll() {
    const res = await this.prisma.user.findMany();
    return res.map((user) => new UserEntity(user));
  }

  async findOne(id: string) {
    const res = await this.prisma.user.findUniqueOrThrow({ where: { id } });

    // if (!res) {
    //   throw new NotFoundException(`User with ID "${id}" not found`);
    // }

    return new UserEntity(res);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const res = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return new UserEntity(res);
  }

  async remove(id: string) {
    const res = await this.prisma.user.delete({ where: { id } });
    return new UserEntity(res);
  }
}

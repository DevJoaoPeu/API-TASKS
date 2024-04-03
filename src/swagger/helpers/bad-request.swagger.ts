import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSwagger {
  @ApiProperty()
  statusCode: Number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}

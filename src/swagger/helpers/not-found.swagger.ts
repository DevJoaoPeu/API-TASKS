import { ApiProperty } from '@nestjs/swagger';

export class NotFoundSwagger {
  @ApiProperty()
  statusCode: Number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}

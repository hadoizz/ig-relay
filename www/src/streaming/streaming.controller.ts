import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { Response } from 'nestjs-sse';
import { StreamingService } from './streaming.service';

@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Get(':id')
  streaming(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const cleanup = this.streamingService.handleStreaming(
      id,
      (data: string) => {
        res.sse(`data:${data}\n\n`);
      },
    );

    req.on('close', cleanup);
  }
}

import { Controller, Get, Param, Res, Req } from '@nestjs/common'
import { Response } from 'nestjs-sse'
import { Request } from 'express'
import { StreamingService } from './streaming.service'

@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService){}

  @Get(':id')
  streaming(@Param('id') id: string, @Res() res: Response, @Req() req: Request){
    const cleanup = this.streamingService.createStreaming(id, 
      (data: string) => 
        res.sse(`data:${data}\n\n`) 
    )

    req.on('close', cleanup)
  }
}
 
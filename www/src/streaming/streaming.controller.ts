import { Controller, Get, Param, Res, Req } from '@nestjs/common'
import { Response, Request } from 'nestjs-sse'
import { BotsService } from '../bots/bots.service'

@Controller('streaming')
export class StreamingController {
  constructor(private readonly botsService: BotsService){}

  @Get(':id')
  streamBot(@Param('id') id: string, @Res() res: Response, @Req() req: Request){    
    const subscription = this.botsService.getBot(id).stream.subscribe(data => {
      res.sse(`data:${data}\n\n`)
    })

    //prevent memory leaks
    res.on('close', () => subscription.unsubscribe())
  }
}
 
import { Injectable, Inject } from '@nestjs/common';
import { BotsService } from '../bots.service';
import { Credentials } from '../createBot';
import { ConfigService } from '../../config/config.service'

@Injectable()
export class DevService {
  constructor(
    @Inject(BotsService)
    private readonly botsService: BotsService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ){}

  id: string

  private getCredentialsFromConfig(){
    return {
      login: this.configService.get('LOGIN'),
      password: this.configService.get('PASSWORD')
    }
  }

  public async getBotId(credentials: Credentials = this.getCredentialsFromConfig()){    
    if(this.id === undefined){
      const { id } = await this.botsService.createBot(credentials)
      this.id = id
      return { id }
    }

    return { 
      id: this.id 
    }
  }
}

import { NestFactory } from '@nestjs/core'
import cors from 'cors'
import { AppModule } from './app.module'

(async () => {
  const app = await NestFactory.create(AppModule)
  app.use(cors())
  await app.listen(process.env.PORT || 8080)
   
  console.log(`Server listening on port: ${process.env.PORT || 8080}`)
})()

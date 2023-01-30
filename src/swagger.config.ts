import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Car Api')
  .setDescription(
    'The car api is constructed to communicate with the services of the car-brands ' +
      'which help to estimate prices for cars.',
  )
  .setVersion('1.0')
  .setLicense('MIT', 'http://mit.org')
  .addTag('car')
  .setBasePath('http://localhost:3000')
  .build();

import { HttpModule, HttpService } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AudioConsumer } from './audio.consumer';
import { FileConsumer } from './file.consumer';
import { FileProducerService } from './file.producer.service';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { RedisNamespace } from './redis-namespace.enum';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue(
      { name: RedisNamespace.AUDIO_QUEUE },
      { name: 'file-operation' },
    ),
    HttpModule
  ],
  controllers: [QueueController],
  providers: [
    QueueService,
    AudioConsumer,
    FileProducerService,
    FileConsumer,
  ],
})
export class QueueModule {}

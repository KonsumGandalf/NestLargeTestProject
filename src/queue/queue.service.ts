import { InjectQueue } from '@nestjs/bull';
import { Injectable, Scope } from '@nestjs/common';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { devEnvironment } from './dev.environment';

import { googleRequestDto } from './googleRequest.dto';
import { RedisNamespace } from './redis-namespace.enum';

@Injectable({ scope: Scope.REQUEST })
export class QueueService {
  constructor(
    private readonly _httpService: HttpService,
    @InjectQueue(RedisNamespace.AUDIO_QUEUE) private readonly _jobQueue: Queue,
  ) {}

  async sendAudioToAll(audio: string) {
    return await this._jobQueue.add(
      RedisNamespace.AUDIO_FILE,
      {
        name: audio,
        interpreter: 'david',
        date: new Date(),
      },
      {
        delay: 10000,
      },
    );
  }



  async getRequest(request: googleRequestDto) {
    const jobId = `page_speed_${request.url}`;
    const savedEle = await this._jobQueue.getJob(jobId);
    if (savedEle != undefined) {
      console.log('FOUND');
      return savedEle;
    } else {
      console.log('NOT FOUND');
      const { data } = await firstValueFrom(
        this._httpService.get(devEnvironment.GOOGLE_URL, {
          params: {
            ...request,
          },
        }),
      );
      return await this._jobQueue.add(jobId, data, {
        lifo: false,
        stackTraceLimit: 30_000,
      });
      // return data;
    }
  }
}

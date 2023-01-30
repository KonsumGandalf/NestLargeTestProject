import { OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Scope } from '@nestjs/common';
import { Job } from 'bull';
import { RedisNamespace } from './redis-namespace.enum';

@Processor({ name: RedisNamespace.AUDIO_QUEUE })
export class AudioConsumer {
  @Process(RedisNamespace.AUDIO_FILE)
  async transcode(job: Job<unknown>) {
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      progress += 1;
      await job.progress(progress);
    }
    return {};
  }

  @OnQueueFailed()
  onFail(job: Job<unknown>) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class FileProducerService {
  constructor(@InjectQueue('file-operation') private readonly _queue: Queue) {}

  async deleteFile(fileName: string) {
    const filePath = `/Users/davidschmidt/WebstormProjects/Nestjs/car-api/src/images/${fileName}.png`;
    return await this._queue.add(
      'delete-file',
      {
        path: filePath,
      },
      { delay: 10_000 },
    );
  }
}

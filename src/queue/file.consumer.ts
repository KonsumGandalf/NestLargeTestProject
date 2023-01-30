import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as fs from 'fs';
import { IFile } from './file.interface';

@Processor('file-operation')
export class FileConsumer {
  @Process('delete-file')
  async deleteFile(job: Job<IFile>) {
    await fs.unlinkSync(job.data.path);
  }
}

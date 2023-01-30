import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { FileProducerService } from './file.producer.service';
import { googleRequestDto } from './googleRequest.dto';
import { QueueService } from './queue.service';


@Controller('queue')
export class QueueController {
  constructor(
    private readonly _queueService: QueueService,
    private readonly _fileService: FileProducerService,
  ) {}

  @Post()
  async sendAllAudios(@Body() audio: string) {
    return await this._queueService.sendAudioToAll(audio);
  }

  @Delete()
  async deleteFile(@Body() fileName: string) {
    await this._fileService.deleteFile(fileName);
    return fileName;
  }

  @Get('pageSpeed')
  async getElement(@Body() requestToGoogle: googleRequestDto){
    return await this._queueService.getRequest(requestToGoogle);
  }
}

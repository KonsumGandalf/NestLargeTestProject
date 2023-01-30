import { Processor } from '@nestjs/bull';
import { RedisNamespace } from './redis-namespace.enum';

@Processor({ name: RedisNamespace.AUDIO_QUEUE })
export class GoogleResultConsumer{

}

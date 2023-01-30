import { Injectable } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  Interval,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';
import { NamespaceCron, nameSpaceMap } from './namespace.enum';

@Injectable()
export class CronService {
  constructor(private readonly _schedulerRegistry: SchedulerRegistry) {}

  @Cron('*/2 * * * * 5', {
    name: NamespaceCron.CRON_2,
  })
  handleCron() {
    console.log('cron1 ', new Date().getSeconds());
  }

  @Cron('*/30 * * * * 5', {
    name: NamespaceCron.CRON_30,
  })
  stopOtherCrons() {
    console.log('cron2 ', new Date().getSeconds());
  }

  @Cron(CronExpression.EVERY_YEAR, {
    name: NamespaceCron.CRON_KILL,
  })
  handleCron3() {
    Object.values(NamespaceCron).forEach((item: string) => {
      try {
        this._schedulerRegistry.deleteCronJob(item);
      } catch (e) {
        this._schedulerRegistry.deleteInterval(item);
      }
    });
  }

  @Interval(NamespaceCron.INTERVAL_1, 1_000_000)
  handleInterval() {
    console.log('interval ', new Date().getSeconds());
  }

  /*@Timeout(NamespaceCron.TIMEOUT_50, 50_000)
  handleITimeout() {
    console.log('timeout ', new Date().getSeconds());
  }*/
}

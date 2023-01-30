export enum NamespaceCron {
  CRON_30 = 'cron_30',
  CRON_2 = 'cron_2',
  INTERVAL_1 = 'interval_1',
  TIMEOUT_50 = 'timeout_50',
  CRON_KILL = 'cron_kill',
}

export const nameSpaceMap: Record<NamespaceCron, number> = {
  [NamespaceCron.CRON_30]: 1,
  [NamespaceCron.CRON_2]: 2,
  [NamespaceCron.INTERVAL_1]: 3,
  [NamespaceCron.TIMEOUT_50]: 4,
  [NamespaceCron.CRON_KILL]: 5,
};

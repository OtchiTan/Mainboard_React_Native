export enum AppStatus {
  OFFLINE = 'OFFLINE',
  PENDING = 'PENDING',
  ONLINE = 'ONLINE',
}

export type Application = {
  id: number;
  name: string;
  image: string;
  status: AppStatus;
  startLog: string;
  startTime: Date;
  containerId?: string;
  containerArgs?: JSON;
  stopCommand?: string;
  stopLog: string;
};

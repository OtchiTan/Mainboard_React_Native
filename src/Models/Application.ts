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
  startTime: Date;
  isContainer: boolean;
};

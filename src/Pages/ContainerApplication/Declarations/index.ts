import {Application} from '../../../Models/Application';

export type StartAppResponse = {
  updatedApp: Application;
  apps: Application[];
};

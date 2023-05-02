import {Application} from '../Models/Application';

export type RoutesList = {
  ContainerApplication: {app: Application};
  CustomApplication: {app: Application};
  CheckServer: undefined;
  Dashboard: undefined;
  StartServer: undefined;
  Login: undefined;
  Register: undefined;
};

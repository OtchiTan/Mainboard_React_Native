import {createContext, useContext, useEffect} from 'react';
import {View} from 'react-native';
import CheckServer from './Pages/CheckServer';

type RouterContextType = {
  page: JSX.Element;
  setPage: (newPage: JSX.Element) => void;
};

export const RouterContext = createContext<RouterContextType>({
  page: <CheckServer />,
  setPage(newPage) {
    this.page = newPage;
  },
});

export default (): JSX.Element => {
  const {page} = useContext(RouterContext);
  return page;
};

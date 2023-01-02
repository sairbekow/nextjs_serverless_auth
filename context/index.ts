import React, {Dispatch, SetStateAction} from 'react';

interface IAppContext {
  isUserLogged: boolean
  setIsUserLogged: Dispatch<SetStateAction<boolean>>
}

// @ts-ignore
const AppContext = React.createContext<IAppContext>({});

export default AppContext;

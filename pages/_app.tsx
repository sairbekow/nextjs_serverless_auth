import '../styles/globals.css'
import type {AppProps} from 'next/app'
import AppContext from '../context'
import {useState} from "react";

export default function App({Component, pageProps}: AppProps) {
  const [isUserLogged, setIsUserLogged] = useState(false)

  return (
    <AppContext.Provider value={{
      isUserLogged,
      setIsUserLogged
    }}>
      <Component {...pageProps} />
    </AppContext.Provider>

  )
}

import React from 'react'
import Link from "next/link"
import styles from "../styles/Home.module.css"
import AppContext from "../context"

const Navigation = () => {
  const {isUserLogged} = React.useContext(AppContext)

  return (
    <>
      {
        isUserLogged ?
          <Link href="/private" className={styles.link}>
            Get personal Info
          </Link>
          : <>
            <Link href="/login" className={styles.link}>
              Login
            </Link>
            <Link href="/signup" className={styles.link}>
              Sign up
            </Link>
          </>
      }
    </>
  )
}

export default Navigation

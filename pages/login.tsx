import styles from "../styles/Auth.module.scss"
import Link from "next/link"
import MainLayout from "../components/MainLayout"
import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react"
import {onLogin} from "../api/request"
import AppContext from "../context"
import {useRouter} from "next/router"
import Loader from "../components/Loader"

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const {isUserLogged, setIsUserLogged} = React.useContext(AppContext)

  const onChangeField = (e: ChangeEvent, dispatch: Dispatch<SetStateAction<string>>) => {
    const input = e.target as HTMLInputElement
    dispatch(input.value)
  }

  const validateInput = (): boolean => {
    return true
  }

  const resetFields = () => {
    setEmail('')
    setPassword('')
  }

  const submitForm = (e: SubmitEvent) => {
    e.preventDefault()
    if (validateInput()) {
      setIsLoading(true)
      onLogin({
        url: 'login',
        body: {email, password}
      })
        .then((res) => {
          if (res.statusCode < 300) {
            alert("You have been successfully logged!")
            setIsUserLogged(true)
          } else {
            alert("Something went wrong please try again")
            resetFields()
          }
        })
        .catch(e => console.log(e))
        .finally(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    if (isUserLogged) {
      router.push('/')
    }
  }, [isUserLogged])

  return (
    <MainLayout>
      <>
        {isLoading && <Loader/>}
        {/*@ts-ignore*/}
        <form className={styles.form} onSubmit={submitForm}>
          <input
            value={email}
            onChange={(e) => onChangeField(e, setEmail)}
            className={`${styles.input} ${styles['input--email']}`}
            type="email"
            placeholder="Email *"/>
          <input
            value={password}
            onChange={(e) => onChangeField(e, setPassword)}
            className={`${styles.input} ${styles['input--password']}`}
            type="password"
            placeholder="Password *"/>
          <Link
            className={styles.link}
            href="/signup">
            I'am new user
          </Link>
          <button
            className={styles.btn}
            type="submit"
            disabled={isLoading}>
            Login
          </button>
        </form>
      </>
    </MainLayout>
  )
}

export default Login

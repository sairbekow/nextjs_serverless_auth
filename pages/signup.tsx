import MainLayout from "../components/MainLayout"
import styles from "../styles/Auth.module.scss"
import Link from "next/link"
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react"
import {onSignup} from "../api/request"
import Loader from "../components/Loader"
import {useRouter} from "next/router"

const Signup = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSignupSuccess, setIsSignupSuccess] = useState<boolean>(false)

  const router = useRouter()

  const onChangeField = (e: ChangeEvent, dispatch: Dispatch<SetStateAction<string>>) => {
    const input = e.target as HTMLInputElement
    dispatch(input.value)
  }

  const resetFields = () => {
    setName('')
    setEmail('')
    setPassword('')
  }

  const validateInput = (): boolean => {
    return true
  }

  const submitForm = (e: SubmitEvent) => {
    e.preventDefault()
    if (validateInput()) {
      setIsLoading(true)
    }
    onSignup({
      url: 'signup',
      body: {name, email, password}
    })
      .then((res) => {
        if (res.statusCode < 300) {
          alert("You have been successfully signed up!")
        } else {
          alert("Something went wrong please try again")
          resetFields()
        }
      })
      .then(() => setIsSignupSuccess(true))
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (isSignupSuccess) {
      router.push('/')
    }
  }, [isSignupSuccess])

  return (
    <MainLayout>
      <>
        {isLoading && <Loader/>}
        <form className={styles.form} onSubmit={submitForm}>
          <input
            value={name}
            onChange={(e) => onChangeField(e, setName)}
            className={`${styles.input} ${styles['input--name']}`}
            type="text"
            placeholder="Name *"/>
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
            href="/login">I have an account</Link>
          <button
            className={styles.btn}
            type="submit">Sign up
          </button>
        </form>
      </>
    </MainLayout>
  )
}

export default Signup

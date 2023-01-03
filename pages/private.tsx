import React, {useEffect, useState} from 'react'
import MainLayout from "../components/MainLayout"
import {onRequestPrivateInfo} from "../api/request"
import Loader from "../components/Loader"
import styles from "../styles/Private.module.scss"

interface IFetchedData {
  name: string,
  email: string
  balance: number
}

const PrivateInfo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fetchedData, setFetchedData] = useState<IFetchedData>({name: '', email: '', balance: 0})

  useEffect(() => {
    onRequestPrivateInfo({url: 'private'})
      .then(res => setFetchedData(res))
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <MainLayout>
      <>
        {isLoading && <Loader/>}
        <div>
          <h4>Personal Info</h4>
          <p>
            name:
            <span className={styles['user-data']}>
              {isLoading ? '...' : fetchedData.name}
            </span>
          </p>
          <p>
            email:
            <span className={styles['user-data']}>
              {isLoading ? '...' : fetchedData.email}
            </span>
          </p>
          <p>
            balance:
            <span className={styles['user-data']}>
              {isLoading ? 0 : fetchedData.balance}
            </span>
          </p>
        </div>
      </>
    </MainLayout>
  )
}

export default PrivateInfo

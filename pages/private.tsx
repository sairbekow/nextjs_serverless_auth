import React, {useEffect, useState} from 'react'
import MainLayout from "../components/MainLayout"
import {onRequestPrivateInfo} from "../api/request"
import Loader from "../components/Loader"

interface IFetchedData {
  name: string,
  email: string
  // balance: 0
}

const PrivateInfo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fetchedData, setFetchedData] = useState<IFetchedData>({name: '', email: ''})

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
          <p>name: <span>{isLoading ? '...' : fetchedData && fetchedData.name}</span></p>
          <p>email: <span>{isLoading ? '...' : fetchedData && fetchedData.email}</span></p>
          <p>balance: <span>{0}</span></p>
        </div>
      </>
    </MainLayout>
  )
}

export default PrivateInfo

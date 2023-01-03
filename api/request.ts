const BASE_URL = ' https://sak6ozy6t7.execute-api.us-east-1.amazonaws.com/dev/user'

interface ILogin {
  url: string
  body: {
    email: string
    password: string
  }
}

interface ISignup {
  url: string
  body: {
    name: string
    email: string
    password: string
  }
}

interface IRequestPrivateInfo {
  url: string
}

const onLogin = async ({url, body}: ILogin) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      body: JSON.stringify(body)
    })

    const data = await response.json()
    localStorage.setItem("serverless_token", JSON.stringify(data.token))
    localStorage.setItem("serverless_email", JSON.stringify(body.email))

    return {...data, statusCode: response.status}
  } catch (e) {
    console.log(e)
  }
}

const onSignup = async ({url, body}: ISignup) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(body)
    })
    const data = await response.json()

    return {...data, statusCode: response.status}
  } catch (e) {
    console.log(e)
  }
}

const onRequestPrivateInfo = async ({url}: IRequestPrivateInfo) => {
  try {
    const token = JSON.parse(<string>localStorage.getItem("serverless_token")) || ''
    const email = JSON.parse(<string>localStorage.getItem("serverless_email")) || ''

    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({email, name: "Argen"})
    })
    const {data} = await response.json()

    return {...data, statusCode: response.status}
  } catch (e) {
    console.log(e)
  }
}

export {onLogin, onSignup, onRequestPrivateInfo}
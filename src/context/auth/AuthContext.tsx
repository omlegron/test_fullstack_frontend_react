// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ForgotParams, ErrCallbackType, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const urlBackend = process.env.BACKEND_URL
const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(`${urlBackend}/`+authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)

            setUser({ ...response.data.data.user })

          })
          .catch(() => {
            console.log('catch error')

            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')

            setUser(null)
            setLoading(false)

            // if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            // }
            router.push('/login')


          })
      } else {
        console.log('else store tokken')
        setLoading(false)

      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(`${urlBackend}/auth/login`, params)
      .then(async response => {
        console.log('response', response)
        console.log('response.data.data.token', response.data.data.token)
        console.log('authConfig.storageTokenKeyName', authConfig.storageTokenKeyName)
        console.log('router.query.returnUrl', router.query.returnUrl)
        const returnUrl = '/dashboards/analytics/'
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data.token.access)
        window.localStorage.setItem('userData', JSON.stringify(response.data.data.user))
        setUser(response.data.data.user)

        const redirectURL = returnUrl ? returnUrl : '/ampas'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  useEffect(() => {
    console.log('user', user)
  }, [setUser, user])

  const handleForgotPassword = (params: ForgotParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.forgotPassword, params)
      .then(async response => {
        console.log('response', response)
        // params.rememberMe
        //   ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data.token)
        //   : null
        // const returnUrl = router.query.returnUrl

        // setUser({ ...response.data.data.user })
        // params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.data.user)) : null

        // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        // router.replace(redirectURL as string)
      }).catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    forgotPassword: handleForgotPassword,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

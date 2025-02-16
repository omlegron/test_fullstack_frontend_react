export default {
  meEndpoint: 'auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: 'auth/signup',
  forgotPassword: 'auth/forgot',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'superadmin' || role === 'superadmin') return '/dashboards/analytics'
  else return '/login'
}

export default getHomeRoute

// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import type { ACLObj, AppAbility } from 'src/configs/acl'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import Spinner from 'src/@core/components/spinner'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Util Import

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children } = props

  // ** Hooks
  const router = useRouter()

  // ** Vars
  let ability: AppAbility

  useEffect(() => {
    console.log('useEffect')
    if (router.route === '/') {
      router.replace('/dashboards/analytics')
    }
  }, [router])

  // User is logged in, build ability for the user based on his role
  if (!ability) {
    ability = buildAbilityFor('superadmin', aclAbilities.subject)
    if (router.route === '/') {
      return <Spinner />
    }
  }

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>

}

export default AclGuard

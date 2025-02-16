// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UsersType = {
  id: string
  authRole_id: number
  auth_group: boolean
  deleted_by: string
  email: string
  is_active: boolean
  is_deleted: boolean
  is_facebook: boolean
  is_google: boolean
  is_panel: boolean
  is_staff: boolean
  password: string
  avatar?: string | null
  authRole: AuthRole | null;
}

export type AuthRole = {
  id: string;
  name: string;
  alias_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  created_by: null;
  updated_by: null;
  deleted_by: null;
  is_deleted: boolean;
}

export type UsersCreateType = {
  email: string,
  is_active: boolean,
  is_panel: boolean,
  is_staff: boolean,
  password: string,
  authRole_id: string
}

export const defaultValues = {
  email: '',
  is_active: false,
  is_panel: false,
  is_staff: false,
  password: '',
  authRole_id: ''
}

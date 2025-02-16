export type ErrCallbackType = (err: { [key: string]: string }) => void

// export type LoginParams = {
//   email: string
//   password: string
//   rememberMe?: boolean
// }

export type ForgotParams = {
  email: string
}

const defaultForgotValues: ForgotParams = {
  email: '',
};




export type UserDataType = {
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

export { defaultForgotValues };

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  forgotPassword: (params: ForgotParams, errorCallback?: ErrCallbackType) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}

// Login
export type LoginParams = {
  email: string,
  password: string
}

export const defaultLoginValues: LoginParams = {
  password: '',
  email: ''
}

// export { defaultLoginValues};

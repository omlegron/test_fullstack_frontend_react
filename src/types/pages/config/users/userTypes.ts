// ** Types
// import { ThemeColor } from 'src/@core/layouts/types'



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

// export type UsersType = {
//   id: number
//   role: string
//   email: string
//   status: string
//   avatar: string
//   billing: string
//   company: string
//   country: string
//   contact: string
//   fullName: string
//   username: string
//   currentPlan: string
//   avatarColor?: ThemeColor
// }

// export type ProjectListDataType = {
//   id: number
//   img: string
//   hours: string
//   totalTask: string
//   projectType: string
//   projectTitle: string
//   progressValue: number
//   progressColor: ThemeColor
// }

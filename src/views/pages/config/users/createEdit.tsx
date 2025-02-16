// ** React Imports
import { useState, ChangeEvent, useEffect} from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addUser, detailUser } from 'src/store/pages/config/users'

import { fetchDataRoles } from 'src/store/pages/config/roles'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import { UsersCreateType, UsersType, defaultValues } from 'src/types/apps/userTypes'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';

interface CreateUserType {
  idUser?:string | number | null
  open: boolean
  toggle: () => void
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}


const schema = yup.object().shape({
  is_active: yup.boolean().required(),
  is_panel: yup.boolean().required(),
  is_staff: yup.boolean().required(),
  email: yup.string().email().required(),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
})

const CreateEditUser = (props: CreateUserType) => {
  // ** Props
  const { idUser, open, toggle } = props

  // ** UseState
  const [isActive, setActive] = useState<boolean>(false)
  const [isPanel, setPanel] = useState<boolean>(false)
  const [isStaff, setStaff] = useState<boolean>(false)

  const [isRole, setRole] = useState<string>('')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  const store = useSelector((state: RootState) => state.users)
  const dataRole = useSelector((state: RootState) => state.roles)
  const dataDetailUser = useSelector((state: RootState) => state.users.detailData)
  console.log('detailUser', dataDetailUser)

  useEffect(() => {
    console.log('idUser', idUser)
    if(idUser){
      dispatch(detailUser(idUser))
    }

    // console.log('dataDetailUser', dataDetailUser)
    // if (dataDetailUser) {
    //   // Set form values when dataDetailUser is available
    //   setValue('email', dataDetailUser.email);
    //   setValue('is_active', dataDetailUser.is_active);
    //   setValue('is_panel', dataDetailUser.is_panel);
    //   setValue('is_staff', dataDetailUser.is_staff);
    //   setValue('authRole_id', dataDetailUser.authRole_id);
      
    //   // Reset password field for security reasons
    //   setValue('password', '');
    //   setActive(dataDetailUser.is_active);
    //   setPanel(dataDetailUser.is_panel);
    //   setStaff(dataDetailUser.is_staff);
    //   setRole(dataDetailUser.authRole_id);
    // }
  },[idUser, dispatch])

  useEffect(() => {
    dispatch(
      fetchDataRoles({
        name: '',
      })
    )
  }, [dispatch])

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  console.log('errors', errors)

  // useEffect(() => {
  //   console.log('dataDetailUser', dataDetailUser)
  //   if (dataDetailUser) {
  //     // Set form values when dataDetailUser is available
  //     setValue('email', dataDetailUser.email);
  //     setValue('is_active', dataDetailUser.is_active);
  //     setValue('is_panel', dataDetailUser.is_panel);
  //     setValue('is_staff', dataDetailUser.is_staff);
  //     setValue('authRole_id', dataDetailUser.authRole_id);
      
  //     // Reset password field for security reasons
  //     setValue('password', '');
  //     setActive(dataDetailUser.is_active);
  //     setPanel(dataDetailUser.is_panel);
  //     setStaff(dataDetailUser.is_staff);
  //     setRole(dataDetailUser.authRole_id);
  //   }
  // }, [dataDetailUser, setValue]);

  const onSubmit = (data: UsersCreateType) => {
    console.log('data', data)

    if (store.data.some((u: UsersType) => u.email === data.email)) {

      store.data.forEach((u: UsersType) => {
        if (u.email === data.email) {
          setError('email', {
            message: 'Email already exists!'
          })
        }
      })

    } else {

      dispatch(
        addUser(data)
      )

      toggle()
      reset()
    }
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const handleIsActive = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked)
  }

  const handleIsPanel = (event: ChangeEvent<HTMLInputElement>) => {
    setPanel(event.target.checked)
  }

  const handleIsStaff = (event: ChangeEvent<HTMLInputElement>) => {
    setStaff(event.target.checked)
  }

  const handleIsRole = (event: any) => {
    setValue('authRole_id', event.target.value)
    setRole(event.target.value)
  }

  return (
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          component='div'
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h3'>{'User'}</Typography>
          <Typography color='text.secondary'>Add New User {idUser}</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >

          <Grid container spacing={5}>

            <Grid item xs={4} sm={4}>
              <Typography variant="body1" color="initial">Email</Typography>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type='email'
                    value={value}
                    sx={{ mb: 4 }}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='johndoe@email.com'
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <Typography variant="body1" color="initial">Role</Typography>
              <Controller
                name='authRole_id'
                control={control}
                rules={{ required: true }}
                render={({ field: {} }) => (
                  <CustomTextField
                    select
                    name='authRole_id'
                    placeholder='Role'
                    fullWidth
                    id='select-multiple-placeholder'
                    SelectProps={{
                      name:'authRole_id',
                      displayEmpty: true,
                      inputProps: { 'aria-label': 'Without label' },
                      value: {isRole},
                      onChange: e => handleIsRole(e),
                      renderValue: (selected:any) => {
                        if (dataRole.data.length > 0) {
                          const selectedRole = dataRole.data.find((vRole: any) => vRole.id === selected?.isRole) as { name: string } | undefined;

                          return selectedRole?.name ?? ''

                        }

                        return '';
                      }
                    }}
                  >
                    <MenuItem disabled value=''>
                      <em>Choose Role</em>
                    </MenuItem>
                    { dataRole.data.length > 0 ?
                        dataRole.data.map((vRole:any) => (
                          <MenuItem key={vRole?.id} value={vRole?.id}>
                            {vRole?.name}
                          </MenuItem>
                        ))
                      : ''
                    }
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <Typography variant="body1" color="initial">Password</Typography>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type='password'
                    value={value}
                    sx={{ mb: 4 }}
                    onChange={onChange}
                    error={Boolean(errors.password)}
                    placeholder='password'
                    {...(errors.password && { helperText: errors.password.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <Typography variant="body1" color="initial">Is Active</Typography>
              <Controller
                name='is_active'
                control={control}
                rules={{ required: true }}
                render={({ field: {  } }) => (
                  <FormControlLabel
                    control={<Switch checked={isActive} onChange={handleIsActive} />}
                    label='Active'
                  />
                )}
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <Typography variant="body1" color="initial">Is Panel</Typography>
              <Controller
                name='is_panel'
                control={control}
                rules={{ required: true }}
                render={({ field: {  } }) => (
                  <FormControlLabel
                    control={<Switch checked={isPanel} onChange={handleIsPanel} />}
                    label='Is Panel For Admin?'
                  />
                )}
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <Typography variant="body1" color="initial">Is Staff</Typography>
              <Controller
                name='is_staff'
                control={control}
                rules={{ required: true }}
                render={({ field: {  } }) => (
                  <FormControlLabel
                    control={<Switch checked={isStaff} onChange={handleIsStaff} />}
                    label='Is Staff Or Client/Customer?'
                  />
                )}
              />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions
          sx={{
            alignItems: 'center',
            display: 'flex',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            <Button type='submit' variant='contained'>
              Submit
            </Button>
            <Button color='secondary' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateEditUser

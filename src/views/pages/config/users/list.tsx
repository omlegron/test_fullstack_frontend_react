// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'

import DialogAlertDelete from 'src/views/components/dialog'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/list/TableHeader'

// ** Config Users Components Imports
import CreateEditUser from 'src/views/pages/config/users/createEdit'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/pages/config/users'

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/pages/config/users/userTypes'


interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: UsersType
}

// ** renders client column
const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'warning'
}

const RowOptions = ({ id, setIdUser, onDeleteClick }: 
  { 
    id: number | string; 
    setIdUser: (userId: number | string) => void;
    onDeleteClick: (userId: number | string) => void; 
  }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href='/apps/user/view/account'
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={() => {
            setIdUser(id)
            handleRowOptionsClose()
          }} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          onDeleteClick(id)
          handleRowOptionsClose()
        }} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}


const UserList = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [idUser, setIdUser] = useState<number | string | null>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const [dataId, setDataId] = useState<number | string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.users)
  useEffect(() => {
    dispatch(
      fetchData({
        email: value,
      })
    )
  }, [dispatch, role, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleCreateUser = () => setAddUserOpen(!addUserOpen)
  
  const handleSetIdUser = (id: number | string | null) => {
    console.log('id', id)
    setIdUser(id)
    setAddUserOpen(!addUserOpen)
  }

  useEffect(() => {
    console.log('idUser', idUser)
  }, [idUser])

  let uniqueIdCounter = 0;

  const generateUniqueId = () => {
    return `temp-id-${uniqueIdCounter++}`;
  };

  const handleDeleteClick = (id: number | string | null) => {
    setDataId(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (dataId) {
      dispatch(deleteUser(dataId))
    }

    setDeleteDialogOpen(false)
    setDataId(null)
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
    setDataId(null)
  }

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>

              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                {row.email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'is_staff',
      minWidth: 170,
      headerName: 'Staff',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={row.is_staff ? 'Staff' : 'Not Staff'}
            color={userStatusObj[row.is_staff ? 'active' : 'inactive']}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Panel',
      field: 'is_panel',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={row.is_panel ? 'Panel' : 'Not Panel'}
            color={userStatusObj[row.is_panel ? 'active' : 'inactive']}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 190,
      field: 'is_active',
      headerName: 'Active Account',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={row.is_active ? 'Active' : 'Not Active'}
            color={userStatusObj[row.is_active ? 'active' : 'inactive']}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'role',
      headerName: 'Role',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={row?.authRole?.name}
            color={userStatusObj['active']}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions id={row.id} setIdUser={handleSetIdUser} onDeleteClick={handleDeleteClick}/>
    }
  ]

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  fullWidth
                  placeholder='Email'
                  label='Email'
                  onChange={e => handleFilter(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />

          <TableHeader toggle={toggleCreateUser} />

          <DataGrid
            autoHeight
            rowHeight={62}
            getRowId={(row) => row?.id ?? generateUniqueId()}
            rows={store.data}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <CreateEditUser idUser={idUser} open={addUserOpen} toggle={toggleCreateUser} />

      <DialogAlertDelete
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onDelete={handleDeleteConfirm}
      />
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData: CardStatsType = res.data

  return {
    props: {
      apiData
    }
  }
}

export default UserList

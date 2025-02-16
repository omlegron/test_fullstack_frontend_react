// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

interface DialogAlertDeleteProps {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

const DialogAlertDelete = ({ open, onClose, onDelete }: DialogAlertDeleteProps) => {
  // ** State
  return (
    <Fragment>
      
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <Alert severity='error'>
            <AlertTitle>Are you sure want to delete this data?</AlertTitle>
            If you want to delete this data just click delete data, if no click cancle button.
          </Alert>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant='outlined' onClick={onClose}>Cancel</Button>
          <Button variant='outlined' onClick={onDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogAlertDelete

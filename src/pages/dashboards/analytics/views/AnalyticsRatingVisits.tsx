// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const AnalyticsRatingVisits = ({dataAnalytics} : any) => {

  return (
    <Card>
      <CardContent sx={{ p: theme => `${theme.spacing(5)} !important` }}>
        
        <Box sx={{ gap: 2, mb: 5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              Rating Overview
            </Typography>
            
          </div>
        </Box>

        <Box sx={{ mb: 3.5, gap: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ py: 2.25, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 1.5, height: 24, width: 24 }}>
                <Icon icon='tabler:access-point' fontSize='1.125rem' />
              </CustomAvatar>
              <Typography sx={{ color: 'text.secondary' }}>
                { dataAnalytics?.arrayAnalytic?.[0]?.vendor_id ?? ''}
              </Typography>
            </Box>
            <Typography variant='h5'>{ dataAnalytics?.arrayAnalytic?.[0]?.rating.toFixed(2) ?? ''} Rate</Typography>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              { dataAnalytics?.arrayAnalytic?.[0]?.total_data ?? ''} Total Data
            </Typography>
          </Box>
        
          <Divider flexItem sx={{ m: 0 }} orientation='vertical'>
            <CustomAvatar
              skin='light'
              color='secondary'
              sx={{ height: 24, width: 24, fontSize: '0.6875rem', color: 'text.secondary' }}
            >
              VS
            </CustomAvatar>
          </Divider>
        
          <Box sx={{ py: 2.25, display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 1.5, color: 'text.secondary' }}>
              { dataAnalytics?.arrayAnalytic?.[1]?.vendor_id ?? ''}
              </Typography>
              <CustomAvatar skin='light' variant='rounded' sx={{ height: 24, width: 24 }}>
                <Icon icon='tabler:access-point' fontSize='1.125rem' />
              </CustomAvatar>
            </Box>
            <Typography variant='h5'>{ dataAnalytics?.arrayAnalytic?.[1]?.rating.toFixed(2) ?? ''} Rate</Typography>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            { dataAnalytics?.arrayAnalytic?.[1]?.total_data ?? ''} Total Data
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Rating Progress From 100%
            </Typography>
            <LinearProgress
              value={ dataAnalytics?.arrayAnalytic?.[0]?.rating ?? ''}
              color='info'
              variant='determinate'
              sx={{
                height: 10,
                '&.MuiLinearProgress-colorInfo': { backgroundColor: 'primary.main' },
                '& .MuiLinearProgress-bar': {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' sx={{ mb: 2 }}>
            Rating Progress From 100%
            </Typography>
            <LinearProgress
              value={ dataAnalytics?.arrayAnalytic?.[1]?.rating ?? ''}
              color='info'
              variant='determinate'
              sx={{
                height: 10,
                '&.MuiLinearProgress-colorInfo': { backgroundColor: 'primary.main' },
                '& .MuiLinearProgress-bar': {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AnalyticsRatingVisits

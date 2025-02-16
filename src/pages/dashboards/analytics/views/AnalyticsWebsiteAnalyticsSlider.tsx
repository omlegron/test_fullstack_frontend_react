// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'


const dataImage: Array = ['/images/cards/graphic-illustration-1.png', '/images/cards/graphic-illustration-2.png']

const AnalyticsWebsiteAnalyticsSlider = ({dataAnalytics}: any) => {
  // ** States

  // ** Hook
  const theme = useTheme()

  return (
    <Card sx={{ position: 'relative', backgroundColor: 'primary.main' }}>
      
      <>
      {
      dataAnalytics ? 
        dataAnalytics.arrayAnalytic?.map((value: any, index: number) => {
          return (
            <Box
              key={'badge-'+index}
              className='keen-slider__slide'
              sx={{ p: 6, '& .MuiTypography-root': { color: 'common.white' } }}
            >
              <Typography variant='h5' sx={{ mb: 0.5 }}>
                {value.vendor_id}
              </Typography>
              <Typography variant='body2' sx={{ mb: 4.5 }}>
                Total data {value.total_data}
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={8} sx={{ order: [2, 1] }}>
                  <Typography variant='h6' sx={{ mb: 4.5 }}>
                    {value.vendor_id}
                  </Typography>
                  <Grid container spacing={4.5}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar
                          color='primary'
                          variant='rounded'
                          sx={{
                            mr: 2,
                            width: 150,
                            height: 30,
                            fontWeight: 500,
                            color: 'common.white',
                            backgroundColor: 'primary.dark'
                          }}
                        >
                          {value.tip_amount.toFixed(2)}
                        </CustomAvatar>
                        <Typography noWrap>{'Total Tip Amount'}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar
                          color='primary'
                          variant='rounded'
                          sx={{
                            mr: 2,
                            width: 150,
                            height: 30,
                            fontWeight: 500,
                            color: 'common.white',
                            backgroundColor: 'primary.dark'
                          }}
                        >
                          {value.passenger_count.toFixed(2)}
                        </CustomAvatar>
                        <Typography noWrap>{'Total Passenger'}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar
                          color='primary'
                          variant='rounded'
                          sx={{
                            mr: 2,
                            width: 150,
                            height: 30,
                            fontWeight: 500,
                            color: 'common.white',
                            backgroundColor: 'primary.dark'
                          }}
                        >
                          {value.total_amount.toFixed(2)}
                        </CustomAvatar>
                        <Typography noWrap>{'Total Amount'}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar
                          color='primary'
                          variant='rounded'
                          sx={{
                            mr: 2,
                            width: 150,
                            height: 30,
                            fontWeight: 500,
                            color: 'common.white',
                            backgroundColor: 'primary.dark'
                          }}
                        >
                          {value.trip_distance.toFixed(2)}
                        </CustomAvatar>
                        <Typography noWrap>{'Distance (Miles)'}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    order: [1, 2],
                    textAlign: 'center',
                    '& img': {
                      height: '160px !important',
                      maxWidth: 'none !important',
                      [theme.breakpoints.up('sm')]: {
                        top: '50%',
                        position: 'absolute',
                        right: theme.spacing(6),
                        transform: 'translateY(-50%)'
                      }
                    }
                  }}
                >
                  <img src={dataImage[index]} alt={value.vendor_id} />
                </Grid>
              </Grid>
            </Box>
          )
        })
      : ''
      }</>
    </Card>
  )
}

export default AnalyticsWebsiteAnalyticsSlider

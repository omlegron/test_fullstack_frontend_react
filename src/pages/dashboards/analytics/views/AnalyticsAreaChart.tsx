// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'


const AnalyticsAreaChart = ({dataAnalytics} : any) => {
  console.log('dataAnalytics', dataAnalytics)

  const series = [
    {
      name: dataAnalytics?.arrDate?.[0]?.name ?? '-',
      data: dataAnalytics?.arrDate?.[0]?.label.map((item:any, key: number) => {
        const parts = item.split('/');
        const day = parts[0];
        const month = parts[1] === '0' ? '1' : parts[1];
        const year = parts[2];
        const date = new Date(year, month - 1, day);
        const isoDate = date.toISOString().split('T')[0];

        return {
          x: isoDate,
          y: dataAnalytics?.arrDate?.[0]?.trip_distance[key],
        };
      }),
    },
    {
      name: dataAnalytics?.arrDate?.[1]?.name ?? '-',
      data: dataAnalytics?.arrDate?.[1]?.label.map((item:any, key: number) => {
      const parts = item.split('/');
      const day = parts[0] + 1;
      const month = parts[1] === '0' ? '1' : parts[1];
      const year = parts[2];
      const date = new Date(year, month - 1, day);
      const isoDate = date.toISOString().split('T')[0];

      return {
        x: isoDate,
        y: dataAnalytics?.arrDate?.[1]?.trip_distance[key],
      };
    }),
    }
  ]

  // ** Hook

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: true },
    },
    series: series,
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'dd MMM yyyy',
      },
    },
    yaxis: {
      title: {
        text: 'Trip Distance',
      },
    },
    title: {
      text: 'Trip Distance by Day',
    },
  };

  return (
    <Card>
      <CardHeader
        title='Line Chart'
        subheader='For Trip Distances (Miles)'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <ReactApexcharts type='line' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default AnalyticsAreaChart

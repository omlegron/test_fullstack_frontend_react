// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'



const AnalyticsRatingWithRadarChart = ({dataAnalytics} : any) => {
  // ** Hook
  const theme = useTheme()

  const series = [
    { name: dataAnalytics?.arrayAnalytic?.[0]?.vendor_id ?? '', data: [
      dataAnalytics?.arrayAnalytic?.[0]?.passenger_count ?? 0,
      dataAnalytics?.arrayAnalytic?.[0]?.total_amount ?? 0,
      dataAnalytics?.arrayAnalytic?.[0]?.tip_amount ?? 0,
      dataAnalytics?.arrayAnalytic?.[0]?.total_data ?? 0,
      dataAnalytics?.arrayAnalytic?.[0]?.trip_distance ?? 0,
    ] },
    { name: dataAnalytics?.arrayAnalytic?.[1]?.vendor_id ?? '', data: [
      dataAnalytics?.arrayAnalytic?.[1]?.passenger_count ?? 0,
      dataAnalytics?.arrayAnalytic?.[1]?.total_amount ?? 0,
      dataAnalytics?.arrayAnalytic?.[1]?.tip_amount ?? 0,
      dataAnalytics?.arrayAnalytic?.[1]?.total_data ?? 0,
      dataAnalytics?.arrayAnalytic?.[1]?.trip_distance ?? 0,
    ] }
  ]

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: [theme.palette.primary.main, theme.palette.info.main],
    plotOptions: {
      radar: {
        size: 110,
        polygons: {
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider
        }
      }
    },
    stroke: { width: 0 },
    fill: {
      opacity: [1, 0.85]
    },
    labels: ['Passenger', 'Amount', 'Tip Amount', 'Total Data', 'Trip Distance (Miles)'],
    markers: { size: 0 },
    legend: {
      fontSize: '13px',
      fontFamily: theme.typography.fontFamily,
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 4,
        horizontal: 10
      },
      markers: {
        width: 12,
        height: 12,
        radius: 10,
        offsetY: 1,
        offsetX: theme.direction === 'ltr' ? -4 : 5
      }
    },
    grid: {
      show: false,
      padding: {
        top: 10
      }
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: theme.typography.body2.fontSize as string,
          colors: [
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled
          ]
        }
      }
    },
    yaxis: { show: false },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 337 }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Total Cases'
      />
      <CardContent>
        <ReactApexcharts type='radar' height={357} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default AnalyticsRatingWithRadarChart

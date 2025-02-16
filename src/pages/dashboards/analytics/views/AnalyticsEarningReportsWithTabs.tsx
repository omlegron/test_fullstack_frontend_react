// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import TabContext from '@mui/lab/TabContext'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Theme, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

type ApexChartSeries = NonNullable<ApexOptions['series']>

type TabCategory = 'TotalAmount' | 'passenger' | 'Trip' | 'Distance'

type TabType = {
  type: TabCategory
  avatarIcon: string
  series: ApexChartSeries
}

const renderTabs = (value: TabCategory, theme: Theme, tabData: any) => {
  return tabData.map((item: any, index: number) => {
    const RenderAvatar = item.type === value ? CustomAvatar : Avatar

    return (
      <Tab
        key={index}
        value={item.type}
        label={
          <Box
            sx={{
              width: 110,
              height: 94,
              borderWidth: 1,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '10px',
              flexDirection: 'column',
              justifyContent: 'center',
              borderStyle: item.type === value ? 'solid' : 'dashed',
              borderColor: item.type === value ? theme.palette.primary.main : theme.palette.divider
            }}
          >
            <RenderAvatar
              variant='rounded'
              {...(item.type === value && { skin: 'light' })}
              sx={{ mb: 2, width: 34, height: 34, ...(item.type !== value && { backgroundColor: 'action.selected' }) }}
            >
              <Icon icon={item.avatarIcon} />
            </RenderAvatar>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
              {item.type}
            </Typography>
          </Box>
        }
      />
    )
  })
}

const renderTabPanels = (value: string, theme: Theme, options: ApexOptions, tabData: any) => {
  return tabData.map((item:any, index: number) => {
    return (
      <TabPanel key={index} value={item.type}>
        <ReactApexcharts type='bar' height={263} options={{ ...options }} series={item.series} />
      </TabPanel>
    )
  })
}

const AnalyticsEarningReportsWithTabs = ({dataAnalytics} : any) => {
  const tabData: TabType[] = [
    {
      type: 'TotalAmount',
      avatarIcon: 'tabler:shopping-cart',
      series: [
        {
          name: dataAnalytics?.arrayMonthly?.[0]?.name ?? '-',
          data: dataAnalytics?.arrayMonthly?.[0]?.total_amount ?? [],
        },
        {
          name: dataAnalytics?.arrayMonthly?.[1]?.name ?? '-',
          data: dataAnalytics?.arrayMonthly?.[1]?.total_amount ?? [],
        }
      ]
    },
    {
      type: 'passenger',
      avatarIcon: 'tabler:chart-bar',
      series: [
        {
          name: dataAnalytics?.arrayMonthly?.[0]?.name ?? '-',
          data: dataAnalytics?.arrayMonthly?.[0]?.passenger ?? [],
        },
        {
          name: dataAnalytics?.arrayMonthly?.[1]?.name ?? '-',
          data: dataAnalytics?.arrayMonthly?.[1]?.passenger ?? [],
        }
      ]
    },
    {
      type: 'Trip',
      avatarIcon: 'tabler:currency-dollar',
      series: [
        {
          name: dataAnalytics?.arrayMonthly?.[0]?.name ?? '-',
          data: dataAnalytics?.arrayMonthly?.[0]?.total_data ?? [],
        },
        {
          name: dataAnalytics?.arrayMonthly?.[1]?.name ?? '-',
          data: dataAnalytics?.arrayMonthly?.[1]?.total_data ?? [],
        }
      ]
    },
    {
      type: 'Distance',
      avatarIcon: 'tabler:chart-pie-2',
      series: [
        {
          name: dataAnalytics?.arrayMonthly?.[0]?.name ?? '-',
          data: dataAnalytics?.arrayMonthly?.[0]?.distance ?? [],
        },
        {
          name: dataAnalytics?.arrayMonthly?.[1]?.name ?? '-',
          data: dataAnalytics?.arrayMonthly?.[1]?.distance ?? [],
        }
      ]
    }
  ]

  // ** State
  const [value, setValue] = useState<TabCategory>('TotalAmount')

  // ** Hook
  const theme = useTheme()

  const handleChange = (_event: SyntheticEvent, newValue: TabCategory) => {
    setValue(newValue)
  }

  const columnColors = {
    bg: '#f8d3ff',
    series1: '#826af9',
    series2: '#d2b0ff'
  }
  
  const options: ApexOptions = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    colors: [columnColors.series1, columnColors.series2],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
    plotOptions: {
      bar: {
        columnWidth: '15%',
        colors: {
          backgroundBarRadius: 10,
          backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg]
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Earning & Distances Reports'
        subheader='Yearly Overview'
      />
      <CardContent sx={{ '& .MuiTabPanel-root': { p: 0 } }}>
        <TabContext value={value}>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='earning report tabs'
            sx={{
              border: '0 !important',
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTab-root': { p: 0, minWidth: 0, borderRadius: '10px', '&:not(:last-child)': { mr: 4 } }
            }}
          >
            {renderTabs(value, theme, tabData)}
            
          </TabList>
          {renderTabPanels(value, theme, options, tabData)}
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default AnalyticsEarningReportsWithTabs

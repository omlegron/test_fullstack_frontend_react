// ** MUI Import
import Grid from '@mui/material/Grid'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Component Imports
import AnalyticsRatingVisits from './views/AnalyticsRatingVisits'
import AnalyticsWebsiteAnalyticsSlider from './views/AnalyticsWebsiteAnalyticsSlider'
import AnalyticsMaps from './views/AnalyticsMaps'
import AnalyticsFilters from './views/AnalyticsFilters'
import AnalyticsRatingWithRadarChart from './views/AnalyticsRatingWithRadarChart'
import AnalyticsEarningReportsWithTabs from './views/AnalyticsEarningReportsWithTabs'
import AnalyticsAreaChart from './views/AnalyticsAreaChart'

import React, { useEffect, useState } from 'react';

// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { fetchData } from 'src/store/analytics'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'


const defaultValues = {
  pickup_datetime: null,
  dropoff_datetime: null,
  trip_distance: '',
  fare_amount: '',
  payment_type: '',
  $limit: '50',
}

const defaultValueAnal: { arrayAnalytic: any[]; arrayMonthly: any[]; arrDate: any[] } = {
  arrayAnalytic: [],
  arrayMonthly: [],
  arrDate: []
}

const AnalyticsDashboard = () => {
  const [filters, setFilters] = useState(defaultValues);
  const [dataAnaly, setDataAnaly] = useState(defaultValueAnal);
  const [locations, setLocations] = useState([]);

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.analytics )

  
  useEffect(() => {
    console.log('filters', filters)
    dispatch(
      fetchData(filters)
    )
  }, [setFilters]);

  const handleFilterChange = (filterType: any, value: any) => {
      console.log('filterType', filterType)
      setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
      dispatch(
        fetchData(filterType)
      )
  };

  

  useEffect(() => {
    console.log('store', store)
    setDataAnaly(store.dataAnalytics)
    setLocations(store.data)
  }, [store, setLocations, setDataAnaly])
  
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <DatePickerWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={12}>
            <Card>
              <CardContent>
                  <AnalyticsFilters onFilterChange={handleFilterChange} />
              </CardContent>
            </Card>
            </Grid>
            <Grid item xs={12} lg={12}>
              <AnalyticsMaps locations={locations} />
            </Grid>
            <Grid item xs={12} lg={8}>
              <AnalyticsWebsiteAnalyticsSlider dataAnalytics={dataAnaly} />
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              <AnalyticsRatingVisits dataAnalytics={dataAnaly}/>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <AnalyticsRatingWithRadarChart dataAnalytics={dataAnaly}/>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <AnalyticsEarningReportsWithTabs dataAnalytics={dataAnaly}/>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <AnalyticsAreaChart dataAnalytics={dataAnaly}/>
            </Grid>

            
          </Grid>
        </DatePickerWrapper>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard

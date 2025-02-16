// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

const urlBackend = process.env.BACKEND_URL

interface DataParams {
    pickup_datetime: Date | null | undefined
    dropoff_datetime: Date | null | undefined
    trip_distance: string
    fare_amount: string
    payment_type: string
    $limit: string
}


// ** Fetch Users
export const fetchData = createAsyncThunk('appAnalytics/fetchData', async (params: DataParams) => {
  console.log('urlBackend', urlBackend)
  const response = await axios.get(`${urlBackend}/api/analytics`, {
    params
  })

  return response.data
})


export const appAnalyticsSlice = createSlice({
    name: 'appAnalytics',
    initialState: {
      data: [],
      dataAnalytics: {
        arrayAnalytic: [],
        arrayMonthly: [],
        arrDate: []
      },
      total: 1,
      params: {},
    },
    reducers: {},
    extraReducers: builder => {
      builder.addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.dataAnalytics = action.payload.dataAnalytics
        state.total = action.payload.data.length
        state.params = action.payload.params
      })
    }
  })
  
  export default appAnalyticsSlice.reducer
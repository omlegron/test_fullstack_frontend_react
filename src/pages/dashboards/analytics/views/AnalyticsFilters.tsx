import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import Grid from '@mui/material/Grid'
import Box, {  } from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'


import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from './PickersCustomInput'

interface filterData {
    pickup_datetime: Date | null | undefined
    dropoff_datetime: Date | null | undefined
    trip_distance: string
    fare_amount: string
    payment_type: string
    $limit: string
}

const defaultValues = {
    pickup_datetime: null,
    dropoff_datetime: null,
    trip_distance: '',
    fare_amount: '',
    payment_type: '',
    $limit: '50'
}

const AnalyticsFilters = ({ onFilterChange }) => {
    const theme = useTheme()
    const { direction } = theme
    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
    })

    useEffect(() => {
        console.log('errors', errors)
    },[errors])

    const onSubmit = (data: filterData) => {
        onFilterChange(data)
    }

    const handleClear = () => {
        reset(defaultValues);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
                <Grid item xs={12} lg={2}>
                    <Controller
                        name='pickup_datetime'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <DatePicker
                                showTimeSelect
                                timeFormat='HH:mm:ss'
                                timeIntervals={15}
                                selected={value}
                                id='pickup_datetime'
                                dateFormat='MM/dd/yyyy HH:mm:ss'
                                popperPlacement={popperPlacement}
                                onChange={(date: Date) => onChange(date)}
                                customInput={<CustomInput label='Date & Time' />}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} lg={2}>
                    <Controller
                        name='dropoff_datetime'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <DatePicker
                                showTimeSelect
                                timeFormat='HH:mm:ss'
                                timeIntervals={15}
                                selected={value}
                                id='dropoff_datetime'
                                dateFormat='MM/dd/yyyy HH:mm:ss'
                                popperPlacement={popperPlacement}
                                onChange={(date: Date) => onChange(date)}
                                customInput={<CustomInput label='Date & Time' />}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Controller
                        name='trip_distance'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                        <CustomTextField
                            fullWidth
                            value={value}
                            sx={{ mb: 4 }}
                            label='Trip Distance'
                            onChange={onChange}
                            placeholder='Filter Trip Distance'
                        />
                        )}
                    />
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Controller
                        name='fare_amount'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                        <CustomTextField
                            fullWidth
                            value={value}
                            sx={{ mb: 4 }}
                            label='Fare Amount'
                            onChange={onChange}
                            placeholder='Filter Fare Amount'
                        />
                        )}
                    />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Controller
                        name='payment_type'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                        <CustomTextField
                            fullWidth
                            value={value}
                            sx={{ mb: 4 }}
                            label='Payment Type'
                            onChange={onChange}
                            placeholder='Filter Payment Type'
                        />
                        )}
                    />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Controller
                        name='$limit'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <CustomTextField
                                select
                                fullWidth
                                sx={{ mb: 4 }}
                                label='Limit / Total Data Showing'
                                SelectProps={{ value: value, onChange: e => onChange(e) }}
                            >
                                <MenuItem value=''>Select Filter Limit Data</MenuItem>
                                <MenuItem value='10'>10</MenuItem>
                                <MenuItem value='50'>50</MenuItem>
                                <MenuItem value='100'>100</MenuItem>
                                <MenuItem value='200'>200</MenuItem>
                                <MenuItem value='1000'>1000</MenuItem>
                                <MenuItem value=''>All</MenuItem>
                            </CustomTextField>
                        )}
                    />
                </Grid>

                <Grid item xs={12} lg={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button type='submit' variant='contained' sx={{ mr: 3 }}>
                            Search
                        </Button>
                        <Button variant='tonal' color='secondary' onClick={handleClear}>
                            Clear
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default AnalyticsFilters;
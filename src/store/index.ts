// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
// import chat from 'src/store/apps/chat'
// import email from 'src/store/apps/email'
// import invoice from 'src/store/apps/invoice'
// import calendar from 'src/store/apps/calendar'
// import permissions from 'src/store/apps/permissions'

import analytics from 'src/store/analytics'

export const store = configureStore({
  reducer: {
    analytics,
   
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

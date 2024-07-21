import { configureStore } from '@reduxjs/toolkit';
import {userReducer,appStateReducer} from './userSlice'; // Example reducer, replace with your own

const store = configureStore({
  reducer: {
    user: userReducer,
    appState: appStateReducer// Add your reducers here
    // Other reducers can be added here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from '@reduxjs/toolkit';
import {userReducer,valueTestReducer} from './userSlice'; // Example reducer, replace with your own

const store = configureStore({
  reducer: {
    user: userReducer,
    value: valueTestReducer// Add your reducers here
    // Other reducers can be added here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

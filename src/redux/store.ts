import { configureStore } from '@reduxjs/toolkit';
import {userReducer,appStateReducer,storyStateReducer} from './userSlice'; // Example reducer, replace with your own
import {roomReducer} from './roomSlice'; // Example reducer, replace with your own

const store = configureStore({
  reducer: {
    user: userReducer,
    appState: appStateReducer,
    room: roomReducer,
    story: storyStateReducer// Add your reducers here
    // Other reducers can be added here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

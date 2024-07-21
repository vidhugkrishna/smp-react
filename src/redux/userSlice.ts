import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id:string;
  name: string;
  login:boolean;
  token:string;
}



const initialState: UserState = {
    id:"",
    name: "",
    login:false,
    token:""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
  },
}
);

const appStateSlice = createSlice({
  name: 'appState',
  initialState:"login",
  reducers: {
    updateSta(state, action: PayloadAction<string>) {
      return state = action.payload;

    },
  },
}
);

export const { addUser } = userSlice.actions;
export const { updateSta } = appStateSlice.actions;

export const userReducer=  userSlice.reducer;
export  const appStateReducer = appStateSlice.reducer;

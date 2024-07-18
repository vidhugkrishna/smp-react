import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  login:boolean;
  token:string;
}



const initialState: UserState = {
    name: "",
    login:false,
    token:""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
  },
}
);

const valueTestSlice = createSlice({
  name: 'val',
  initialState:"",
  reducers: {
    updteVal(state, action: PayloadAction<string>) {
      return state = action.payload;

    },
  },
}
);

export const { addUser } = userSlice.actions;
export const { updteVal } = valueTestSlice.actions;

export const userReducer=  userSlice.reducer;
export  const valueTestReducer = valueTestSlice.reducer;

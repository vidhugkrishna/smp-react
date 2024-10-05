import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  Id:string;
  username: string;
  login:boolean;
  token:string;
  password:string;
  email:string;
}

interface StoryState {
  storyDetail:string;
  votes: string[];
  finalVote:string;
  voted:boolean;
}
interface StoryPayloadState {
  storyDetail:string;
  vote: string[];
}

const intialStoryState:StoryState = {
  storyDetail:"",
  votes: [],
  finalVote:"",
  voted:false
}



const initialState: UserState = {
    Id:"",
    username: "",
    login:false,
    password:"",
    token:"",
    email:""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserState>) {
      state.Id = action.payload.Id
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.password = action.payload.password;
      state.email = action.payload.email;
      state.login = action.payload.login;
    },
    signOutUser(state) {
          state.Id = ""
          state.username = "";
          state.token = "";
          state.password = "";
          state.email = "";
          state.login = false;

        }
  },
}
);

const appStateSlice = createSlice({
  name: 'appState',
  initialState:"login",
  reducers: {
    updateSta:(state, action: PayloadAction<string>)=> {
        return state = action.payload;

    },
  },
}
);

const storySlice = createSlice({
  name: 'storyState',
  initialState:intialStoryState,
  reducers: {
    updateStoryVote:(state, action: PayloadAction<StoryPayloadState>)=> {
      state.storyDetail = action.payload.storyDetail;
      console.log("votes here",action.payload.vote)
      state.votes = action.payload.vote;

    },
    updateStoryFinalVote:(state, action: PayloadAction<string>)=> {
          state.finalVote = action.payload;
    },
    updateStoryVotetatus:(state, action: PayloadAction<boolean>)=> {
          state.voted = action.payload;
    },
    updateStorySta:(state, action: PayloadAction<string>)=> {
              state.storyDetail = action.payload;
        },
  },
}
);

export const { addUser,signOutUser } = userSlice.actions;
export const { updateSta } = appStateSlice.actions;
export const { updateStoryVote,updateStorySta } = storySlice.actions;

export const userReducer=  userSlice.reducer;
export  const appStateReducer = appStateSlice.reducer;
export  const storyStateReducer = storySlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomState {
  id:string;
  roomName: string;
  userStories:userStories;
  roomType:string;
  cards:string[];
  accessToAddStory: boolean;
  votingStatus: boolean;
  voteRevealedAtEnd: boolean;
  users:string[];
  currentStory:string;

}


export  interface UserStory {
  roomID:string;
  storyDetail: string;
  vote:string[];

}
interface userStories extends Array<UserStory>{}
interface users extends Array<string>{}



const initialState: RoomState = {
    id:"",
    roomName: "",
    userStories:[],
    roomType:"",
    cards:[],
    accessToAddStory: true,
    votingStatus: true,
    voteRevealedAtEnd: true,
    users:[],
    currentStory:"",
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    joinRoom(state, action: PayloadAction<RoomState>) {
      state.id = action.payload.id
      state.roomName = action.payload.roomName;
      state.userStories = action.payload.userStories;
      state.roomType = action.payload.roomType;
      state.cards = action.payload.cards;
      state.accessToAddStory = action.payload.accessToAddStory;
      state.votingStatus = action.payload.votingStatus;
      state.voteRevealedAtEnd = action.payload.voteRevealedAtEnd;
      state.users = action.payload.users;
      state.currentStory = action.payload.currentStory
    },
    addUsers(state, action:   PayloadAction<users>){
        state.users = action.payload
    },
    addStories(state, action:  PayloadAction<userStories>){
        state.userStories = action.payload
    },
    updateCurrentStory(state, action:  PayloadAction<string>){
        state.currentStory = action.payload
    }
  },
}
);


export const { joinRoom,addStories,addUsers,updateCurrentStory } = roomSlice.actions;


export const roomReducer=  roomSlice.reducer;


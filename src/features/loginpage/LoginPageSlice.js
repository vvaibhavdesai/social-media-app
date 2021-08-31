import { createSlice } from "@reduxjs/toolkit";

const initialState =
  {
    success:false,
    decodedUserData:null,
    token:null

  };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    signinUserDetail: (state, action) => {
      state.success = action.payload.data.success
      state.decodedUserData = action.payload.data.decodedUserData
      state.token = action.payload.data.token
    },
    loginUserDetail: (state, action) => {
      
      state.success = action.payload.data.success
      state.decodedUserData = action.payload.data.user.decodedUserData
      state.token = action.payload.data.user.token
    },
    signupUserDetail: (state, action) => {
      console.log(action.payload.data, "from reducer bholte signup");
      return {  ...action.payload.data }
    },
    followedUser:(state,action)=>{

       state.decodedUserData.following.includes(action.payload.id) ? state.decodedUserData.following.pop(action.payload.id):state.decodedUserData.following.push(action.payload.id)

    },
    updatedProfilePicture:(state,action)=>{
      
      if(state.decodedUserData.pictureUrl !== action.payload.url){
        state.success = true
        state.decodedUserData.pictureUrl=action.payload.url
      }

    },
    userLoggedOut:(state,action)=>{
      state.decodedUserData = {}
      state.token = null
    }
  },
  extraReducers: {},
});
export const { loginUserDetail, signupUserDetail, followedUser, updatedProfilePicture, userLoggedOut, signinUserDetail} = usersSlice.actions;

export default usersSlice.reducer;

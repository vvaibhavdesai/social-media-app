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
    loginUserDetail: (state, action) => {
      console.log(action.payload.data, "from reducer bholte login");
      state.success = action.payload.data.success
      state.decodedUserData = action.payload.data.decodedUserData
      state.token = action.payload.data.token
      // return {  ...action.payload.data }
    },
    signupUserDetail: (state, action) => {
      console.log(action.payload.data, "from reducer bholte signup");
      return {  ...action.payload.data }
    },
    followedUser:(state,action)=>{

       state.decodedUserData.following.includes(action.payload.id) ? state.decodedUserData.following.pop(action.payload.id):state.decodedUserData.following.push(action.payload.id)

    },
    updatedProfilePicture:(state,action)=>{
      console.log(action.payload.url,"yeh dekh payload vala ")
      if(state.decodedUserData.pictureUrl !== action.payload.url){
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
export const { loginUserDetail, signupUserDetail, followedUser, updatedProfilePicture, userLoggedOut } = usersSlice.actions;

export default usersSlice.reducer;

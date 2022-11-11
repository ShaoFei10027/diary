import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    setLogin(state) {
      state.isLogin = true;
    },
    setUserInfo(state, { payload }) {
      state.userInfo = {
        ...state.userInfo,
        ...payload,
      };
    },
  },
});

export const { setLogin, setUserInfo } = rootSlice.actions;

export default rootSlice.reducer;

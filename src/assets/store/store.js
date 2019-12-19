import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isLogin: undefined,
    isCheckLogin: false,
    usN: '',
    rol: '',
    ava: '',
    dbUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1' : 'https://sharing-server.herokuapp.com/api/v1'
  },
  mutations:{
    checkLogin(state){
      if(state.isLogin === undefined && !state.isCheckLogin){
        try{          
          axios.post(state.dbUrl + '/user', {}, {
            withCredentials: true
          }).then( res => {            
            if( res.data && res.data.status === 'success' && res.data.data){
              state.isLogin = true;
              state.usN = res.data.data.name;
              state.rol = res.data.data.rol;
              state.ava = res.data.data.avatar;            
            }
            else {
              state.isLogin = false;
            }
          }).catch( err => {
            console.log(err)
          })
        }
        finally{
          state.isCheckLogin = true;
        }
      }
    },
    userLogin(state, userData){
      if( userData != null && userData != undefined ){
        state.isLogin = true;
        state.usN = userData.name;
        state.rol = userData.rol;
        state.ava = userData.avatar;   
      }
    },
    userLogout(state){
      state.isLogin = false;
      state.usN = '';
      state.rol = '';
      state.ava = '';
    }
  }
})